import checkOutDom from "./checkOutDom"

const directives = { checkOutDom }
export default {
    install(app) {
        Object.entries(directives).map(x => {
            let [key, val] = x
            app.directive(key, val)
        })
    }
}

