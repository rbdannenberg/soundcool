class ScModule {
  constructor(context) {
    this.context = context;
    this.inputs = [];
    this.outputs = [];
  }

  connectTo(destination, sourceOutIndex = 0, destInIndex = 0) {
    if (!!!sourceOutIndex) {
      sourceOutIndex = 0;
    }
    if (!!!destInIndex) {
      destInIndex = 0;
    }
    let sourceAudioNode = this.outputs[sourceOutIndex];
    let destAudioNode = destination.inputs[destInIndex];
    sourceAudioNode.connect(destAudioNode);
  }

  connectAsync(destination) {
    this.connPromise
      .then(
        function () {
          if (destination instanceof ScModule) {
            this.outNode.connect(destination.inNode);
            this.outputs.push(destination);
            destination.inputs.push(this);
            destination.connPromise.resolve();
          } else {
            console.error("Argument for connect has to be ScModule instance");
            destination.connPromise.reject();
          }
        }.bind(this)
      )
      .catch(
        function () {
          console.error(
            "Failed to connect: " +
            this.constructor.name +
            " --> " +
            destination.constructor.name
          );
          destination.connPromise.reject();
        }.bind(this)
      );
  }

  disconnect(destination, sourceOutIndex = 0, destInIndex = 0) {
    let sourceAudioNode = this.outputs[sourceOutIndex];
    let destAudioNode = destination.inputs[destInIndex];
    sourceAudioNode.disconnect(destAudioNode);
    // let outStr =
    //   "Successful disconnect: " +
    //   this.constructor.name +
    //   "[" +
    //   sourceOutIndex +
    //   "] --> " +
    //   destination.constructor.name +
    //   "[" +
    //   destInIndex +
    //   "]";
    // console.log(outStr);
  }

  applyWithSmoothing(audioParam, value, timeConstant = 50e-3) {
    let currentTime = this.context.currentTime;
    audioParam.setTargetAtTime(value, currentTime,
      timeConstant);
  }

  linearToExp(value) {
    return Math.pow(value, 4);
  }

  set volume(value) {
    value = parseFloat(value / 100);
    value = this.linearToExp(value);
    this.applyWithSmoothing(this.outNode.gain, value);
  }

  destroy() {}

}

export default ScModule;