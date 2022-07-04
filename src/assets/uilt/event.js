import mitt from "mitt";
const emitter = mitt();
window.EV = emitter
export const Ev = {
    // $on: function (key, cb) {
    //     emitter.on(key, function (obj) {
    //         if ('el' in obj && obj.el.contains(this.$el)) {
    //             cb && cb(obj)
    //         }
    //     })
    // },
    // $emit: function (key, obj) {
    //     console.error(this);
    //     emitter.emit(key, { ...obj, el: this.$el || '' })
    // }
}
Object.defineProperty(Ev, '$on', {
    get() {
        return function (key, cb) {
            emitter.on(key, function (obj) {
                if ('el' in obj && obj.el.contains(this.$el)) {
                    cb && cb(obj)
                }
            })
        }
    }
})
Object.defineProperty(Ev, '$emit', {
    get() {
        return function (key, obj) {
            console.error(this);
            emitter.emit(key, { ...obj, el: this.$el || '' })
        }
    }
})
export default emitter;