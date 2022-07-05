import checkout from "./directive/checkout"
import money from "./directive/money"

const directives = { checkout, money }
export default {
    install(app) {
        Object.entries(directives).map(x => {
            let [key, val] = x
            app.directive(key, val)
        })
    }
}

