import button from './button/index.vue'
import row from './row/index.vue'
import dropdown from './dropdown/index.vue'
import menu from './menu/index.vue'
import menuItem from './menuItem/index.vue'
import pagination from './pagination/index.vue'
import upload from './upload/index.vue'
import fileView from './fileView/index.vue'
let components = [
    button,
    row,
    dropdown,
    menu,
    menuItem,
    pagination,
    upload,
    fileView
]

export default {
    install(app) {
        components.map(x => app.component(x.name, x))
    }
}