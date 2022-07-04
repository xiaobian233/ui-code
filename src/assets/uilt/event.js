import mitt from "mitt";
const emitter = mitt();
window.Ev = emitter
export default emitter;