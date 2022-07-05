import checkOutDom from "./checkOutDom"
import money from "./money"

const directives = { checkOutDom, money }
export default {
    install(app) {
        Object.entries(directives).map(x => {
            let [key, val] = x
            app.directive(key, val)
        })
    }
}

