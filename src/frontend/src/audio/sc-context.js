const AudioContext = window.AudioContext;
const scContext = new AudioContext();

// register audioworklet processor
scContext.audioWorklet
  .addModule("./transposer-worklet-processor.js")
  .then(() => {
    console.log("registered 0");
  })
  .catch(e => console.log(e));

// scContext.audioWorklet
//   .addModule("./WeirdPhaser-processor.js")
//   .then(() => {
//     console.log("registered 1");
//   })
//   .catch(e => console.log(e));

export default scContext;
