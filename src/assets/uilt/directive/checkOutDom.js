export default {
    mounted(el, binding) {
        let key = binding.arg || 'click', trgO = {
            click, hover
        }
        trgO[key](el, binding)
    }
}
let index = 0
function cd(el, binding) {
    return function (e) {
        if (!el.contains(e.target)) {
            typeof binding.value === 'function' && binding.value()
            return false
        }
        return true
    }
}

function click(el, binding) {
    document.addEventListener('click', cd(el, binding))
}
function hover(el, binding) {
    document.addEventListener('mouseleave', cd(el, binding), true)
}