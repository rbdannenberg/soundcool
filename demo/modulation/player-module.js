import scContext from '../../src/audio/sc-context.js';
import ScDirectIn from '../../src/audio/sc-directin.js';
import ScDelay from '../../src/audio/sc-delay.js';
import ScSpeakers from '../../src/audio/sc-speakers.js';
import ScPlayer from '../../src/audio/sc-player.js';
import ScSignalGen from '../../src/audio/sc-signalgen.js';
import ScPan from '../../src/audio/sc-pan.js';

function playerDemo(){
    let bass = new ScPlayer(scContext,
                    {'path':'demo/audio/bass.mp3', 
                     'loop':true});
    let guitar = new ScPlayer(scContext,
                    {'path':'demo/audio/guitar.mp3',
                     'loop':true,
                     'reverse':false});
    let delay = new ScDelay(scContext);
    let speakers = new ScSpeakers(scContext);

    guitar.connPromise.then(function(){
        guitar.connectTo(delay);
        delay.connectTo(speakers);
        guitar.start();
    });

    bass.connPromise.then(function(){
        bass.connectTo(speakers);
        bass.start();
    });

    window.guitar = guitar;

    // UI and Events
    $('.slidecontainer').css('visibility', 'visible');

    $("#feedbackIn").on('change', function(){
        let feedVal = $(this).val();
        $("#feedVal").val(feedVal);
        delay.delayFeedback = parseFloat(feedVal);
    });

    $("#timeIn").on('change', function(){
        let timeVal = $(this).val();
        $("#timeVal").val(timeVal);
        delay.delayTime = parseFloat(timeVal) / 1000;
    });

    $("#guitarIn").on('change', function(){
        let feedVal = $(this).val();
        $("#guitarVal").val(feedVal);
        guitar.outVol = parseFloat(feedVal);
    });

    $("#guitarSpIn").on('change', function(){
        let feedVal = $(this).val();
        $("#guitarSpeedVal").val(feedVal);
        guitar.speed = parseFloat(feedVal);
    });

    $("#bassIn").on('change', function(){
        let feedVal = $(this).val();
        $("#bassVal").val(feedVal);
        bass.outVol = parseFloat(feedVal);
    });
};

function oscDemo(modConfig, carrConfig){
    // modulator
    let signal1 = new ScSignalGen(scContext, modConfig);
    // carrier
    let signal2 = new ScSignalGen(scContext, carrConfig);
    let speakers = new ScSpeakers(scContext);

    window.signal1 = signal1;
    window.signal2 = signal2;
    signal1.connectTo(signal2)
    signal2.connectTo(speakers);
    signal1.start();
    signal2.start();

};

let conf1, conf2, conf3, conf4, conf5;

conf1 = {
    mod : {
        'mod' : 'None',
        'waveType' : 'sawtooth',
        'freq' : 7
    },
    carr : {
        'mod' : 'AM',
        'waveType' : 'sine',
        'freq' : 505
    }
};

conf2 = {
    mod : {
        'mod' : 'None',
        'waveType' : 'square',
        'freq' : 41
    },
    carr : {
        'mod' : 'AM',
        'waveType' : 'sawtooth',
        'freq' : 83,
        'mi':0.5
    }
};

conf3 = {
    mod : {
        'mod' : 'None',
        'waveType' : 'square',
        'freq' : 2
    },
    carr : {
        'mod' : 'AM',
        'waveType' : 'triangle',
        'freq' : 115,
        'mi':1
    }
};

conf4 = {
    mod : {
        'mod' : 'None',
        'waveType' : 'sine',
        'freq' : 2
    },
    carr : {
        'mod' : 'FM',
        'waveType' : 'sine',
        'freq' : 400,
        'mi' : 300
    }
};

conf5 = {
    mod : {
        'mod' : 'None',
        'waveType' : 'sine',
        'freq' : 75
    },
    carr : {
        'mod' : 'FM',
        'waveType' : 'sine',
        'freq' : 300,
        'mi' : 100
    }
};

document.querySelector("#conf1")
    .addEventListener('click', function(){
        oscDemo(conf1.mod, conf1.carr);
});
document.querySelector("#conf2")
    .addEventListener('click', function(){
        oscDemo(conf2.mod, conf2.carr);
});
document.querySelector("#conf3")
    .addEventListener('click', function(){
        oscDemo(conf3.mod, conf3.carr);
});
document.querySelector("#conf4")
    .addEventListener('click', function(){
        oscDemo(conf4.mod, conf4.carr);
});
document.querySelector("#conf5")
    .addEventListener('click', function(){
        oscDemo(conf5.mod, conf5.carr);
});
