import mitt from "mitt";
const emitter = mitt();
window.Ev = emitter
window.$U = {
    isN(val){
        return !isNaN(val)
    }
}
export default emitter;