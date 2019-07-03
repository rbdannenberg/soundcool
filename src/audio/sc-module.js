class ScModule {

    constructor(context) {
        this.context = context;
        this.inputs = [];
        this.outputs = [];
        // this.inNode;
        // this.outNode;
        var connReady, connFailed;
        this.connPromise = new Promise((resolve, reject) => {
            connReady = resolve;
            connFailed = reject;
        });
        this.connPromise.resolve = connReady;
        this.connPromise.reject = connFailed;
    }

    connectTo(outScModule) {
        this.outNode.connect(outScModule.inNode);
        this.outputs.push(outScModule);
        outScModule.inputs.push(this);
        let outStr = 'Connection successful: '+
            this.constructor.name+ ' --> '+
            outScModule.constructor.name;
        console.log(outStr);
    }

    connectAsync(outScModule) {
        this.connPromise
            .then(function(){
                if (outScModule instanceof ScModule){
                    this.outNode.connect(outScModule.inNode);
                    let outStr = 'Connection successful: '+
                        this.constructor.name+ ' --> '+
                        outScModule.constructor.name;
                    console.log(outStr);

                    this.outputs.push(outScModule);
                    outScModule.inputs.push(this);
                    outScModule.connPromise.resolve()
                } else {
                    console.error('Argument for connect has to be' +
                        ' ScModule instance');
                    outScModule.connPromise.reject()
                }
            }.bind(this))
            .catch(function(){
                console.error('Failed to connect: '+
                    this.constructor.name+' --> '+
                    outScModule.constructor.name);
                outScModule.connPromise.reject()
            }.bind(this));
    }

    disconnect(outScModule) {
        let outputId = this.outputs.indexOf(outScModule);
        let inputId = outScModule.inputs.indexOf(this);
        if (outputId === -1 || inputId === -1){
            console.log('No connection to disconnect');
        } else {
            this.outNode.disconnect(outScModule.inNode);
            this.outputs.splice(outputId, 1);
            outScModule.inputs.splice(inputId, 1);
        }
    }

    set volume(value) {
        this.outNode.gain.value = parseFloat(value);
    }

    destroy() {

    }
}

export default ScModule;
