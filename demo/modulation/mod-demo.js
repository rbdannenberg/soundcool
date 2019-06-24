import scContext from '../../src/audio/sc-context.js';
import ScDirectIn from '../../src/audio/sc-directin.js';
import ScDelay from '../../src/audio/sc-delay.js';
import ScSpeakers from '../../src/audio/sc-speakers.js';
import ScPlayer from '../../src/audio/sc-player.js';
import ScSignalGen from '../../src/audio/sc-signalgen.js';
import ScPan from '../../src/audio/sc-pan.js';

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

    //signal1.start();
    //signal2.start();


};

let conf1, conf2, conf3, conf4, conf5;

conf1 = {
    mod : {
        'mod' : 'No Mod',
        'waveType' : 'Sine Wave',
        'freq' : 2
    },
    carr : {
        'mod' : 'AM',
        'waveType' : 'Sine Wave',
        'freq' : 505
    }
};

conf2 = {
    mod : {
        'mod' : 'No Mod',
        'waveType' : 'Square',
        'freq' : 41
    },
    carr : {
        'mod' : 'AM',
        'waveType' : 'Sawtooth',
        'freq' : 83,
        'modParam':0.5
    }
};

conf3 = {
    mod : {
        'mod' : 'No Mod',
        'waveType' : 'Square',
        'freq' : 2
    },
    carr : {
        'mod' : 'AM',
        'waveType' : 'Triangle',
        'freq' : 115,
        'modParam':1
    }
};

conf4 = {
    mod : {
        'mod' : 'No Mod',
        'waveType' : 'Sine Wave',
        'freq' : 2
    },
    carr : {
        'mod' : 'FM',
        'waveType' : 'Sine Wave',
        'freq' : 400,
        'modParam' : 300
    }
};

conf5 = {
    mod : {
        'mod' : 'No Mod',
        'waveType' : 'Sine Wave',
        'freq' : 75
    },
    carr : {
        'mod' : 'FM',
        'waveType' : 'Sine Wave',
        'freq' : 300,
        'modParam' : 100
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
