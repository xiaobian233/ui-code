import mitt from "mitt";
const emitter = mitt();
window.EV = emitter
export default emitter;