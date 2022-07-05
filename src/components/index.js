import emitter from "@/assets/uilt/event";
import button from './button/index.vue'
import row from './row/index.vue'
import dropdown from './dropdown/index.vue'
import menu from './menu/index.vue'
import menuItem from './menu/menuItem/index.vue'
import menuSubItem from './menu/menuSubItem/index.vue'
import pagination from './pagination/index.vue'
import upload from './upload/index.vue'
import fileView from './fileView/index.vue'
import modal from './modal/index.vue'
import Jmenu from './menu/menu.jsx'
import JmenuSub from './menu/menuSubItem.jsx'
import JmenuItem from './menu/menuItem.jsx'

let components = [
    button,
    row,
    dropdown,
    menu,
    menuItem,
    pagination,
    upload,
    fileView,
    modal,
    menuSubItem,
    Jmenu,
    JmenuSub,
    JmenuItem
]

export default {
    install(app) {
        components.map(x => app.component(x.name, x))
    }
}
