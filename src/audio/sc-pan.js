import ScModule from './sc-module.js';

class ScPan extends ScModule {

    constructor(context, options={}) {
        super(context);
        let defOpts = {'panVal':0};
        this.options = Object.assign(defOpts, options);
        this.setupNodes();
    }

    setupNodes() {
        this.inNode = this.outNode = this.context.createStereoPanner();
        this.pan = this.options.panVal;
    }

    set pan(value){
        value = parseFloat(value);
        this.options.panVal = value;
        this.inNode.pan.value = value;
    }

}

export default ScPan;
