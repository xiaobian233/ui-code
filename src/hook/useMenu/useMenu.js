import { defineComponent, inject, provide, toRef } from 'vue';

// menu
const useMenuKey = Symbol('useMenuProvide')
const useMenuProvide = (value) => { provide(useMenuKey, value) }
const useMenuInject = (value) => { inject(useMenuKey, value) }

// menuSub 
const useMenuSubKey = Symbol('useMenuSubProvide')
const useMenuSubProvide = (value) => { provide(useMenuSubKey, value) }
const useMenuSubInject = (value) => { inject(useMenuSubKey, value) }

// menuItem
const useMenuItemKey = Symbol('useMenuItemProvide')
const useMenuItemProvide = (value) => { provide(useMenuItemKey, value) }
const useMenuItemInject = (value) => { inject(useMenuItemKey, value) }

export {
    useMenuProvide,
    useMenuInject,
    useMenuSubProvide,
    useMenuSubInject,
    useMenuItemProvide,
    useMenuItemInject,
}