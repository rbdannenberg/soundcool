import ScModule from "./sc-module.js";
import ScPlayer from "./sc-player.js";

class ScSamplePlayer extends ScModule {
  constructor(context, options = {}) {
    super(context);
    let defOpts = {
      path0: "",
      path1: "",
      path2: "",
      path3: "",
      path4: "",
      path5: "",
      path6: "",
      path7: "",
      path8: "",
      path9: "",
      reversed: false,
      looped: false,
      speed: 1.0,
      random: false
    };
    this.options = Object.assign(defOpts, options);
    this.players = [];
    this.loadedSampleIndex = [];
    this.playRandomSample = this.playRandomSample.bind(this);
    this.setupNodes();
  }

  setupNodes() {
    this.outNode = this.context.createGain();
    this.outputs.push(this.outNode);
    for (let i = 0; i <= 9; i++) {
      let player = new ScPlayer(this.context);
      player.outNode.connect(this.outNode);
      this.players.push(player);
    }
  }

  destroy() {
    for (let i = 0; i <= 9; i++) {
      this.players[i].outNode.disconnect(this.outNode);
    }
  }

  load(playerIndex, path) {
    let res, rej;
    let loadPromise = new Promise(function(resolve, reject) {
      res = resolve;
      rej = reject;
    });
    loadPromise.resolve = res;
    loadPromise.reject = rej;
    let playerProm = this.players[playerIndex].load(path);
    playerProm.then(
      function() {
        let pathKey = "path" + playerIndex.toString();
        this.options[pathKey] = path;
        if (this.loadedSampleIndex.indexOf(playerIndex) < 0) {
          this.loadedSampleIndex.push(playerIndex);
        }
        loadPromise.resolve();
      }.bind(this)
    );
    playerProm.catch(function() {
      loadPromise.reject();
    });
    return loadPromise;
  }

  anySamplePlaying() {
    let found = false;
    for (let i = 0; i <= 9; i++) {
      found = found || this.players[i].isPlaying;
      if (found) break;
    }
    return found;
  }

  playRandomSample() {
    let arr = this.loadedSampleIndex;
    if (arr.length > 0) {
      let playerIndex = arr[Math.floor(Math.random() * arr.length)];
      // console.log(playerIndex);
      this.play(playerIndex);
    }
  }

  onPlayBackEnd() {
    if (
      !this.options.looped &&
      this.options.random &&
      !this.anySamplePlaying()
    ) {
      this.playRandomSample();
    }
  }

  play(playerIndex) {
    playerIndex = parseInt(playerIndex);
    this.players[playerIndex].play(this.onPlayBackEnd.bind(this));
  }

  pause(playerIndex) {
    playerIndex = parseInt(playerIndex);
    this.players[playerIndex].pause();
  }

  stop(playerIndex) {
    playerIndex = parseInt(playerIndex);
    this.players[playerIndex].stop();
  }

  reverse() {
    for (let i = 0; i <= 9; i++) {
      this.players[i].reverse();
    }
  }

  loopPlayers(toLoop) {
    for (let i = 0; i <= 9; i++) {
      this.players[i].loop = toLoop;
    }
    this.options.looped = toLoop;
  }

  set loop(value) {
    if (value && !this.options.looped) {
      this.loopPlayers(true);
    } else if (!value && this.options.looped) {
      this.loopPlayers(false);
    }
  }

  set speed(value) {
    this.players.forEach(player => {
      player.speed = value;
    });
  }

  set reversed(value) {
    this.reverse();
  }

  set random(value) {
    this.options.random = value;
  }

  set masterVolume(value) {
    this.players.forEach(player => {
      player.volume = value;
    });
  }
}

export default ScSamplePlayer;
