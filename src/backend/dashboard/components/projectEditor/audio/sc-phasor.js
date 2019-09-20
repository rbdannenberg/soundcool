class ScPhasor {
    constructor(context, options={}) {
        this.context = context;
        let defOpts = {
            buffLen : context.sampleRate,
            rampStart : 0.
        };
        this.options = Object.assign(defOpts, options);
        this.outNode = this.node = context.createBufferSource();
        let nodeBuff = context.createBuffer(1, this.options.buffLen,
                                context.sampleRate);
        let buffer = nodeBuff.getChannelData(0);
        let value = this.options.rampStart;
        let step = 1 / this.options.buffLen;
        for (let i=0; i < this.options.buffLen; i++) {
            buffer[i] = (value % 1);
            value += step;
        }
        this.node.buffer = nodeBuff;
        this.node.loop = true;
        console.log(buffer[this.options.buffLen - 1]);
    }

}

export default ScPhasor
