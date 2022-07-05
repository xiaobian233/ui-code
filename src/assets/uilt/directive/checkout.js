export default {
    mounted(el, binding) {
        let key = binding.arg || 'click', trgO = {
            click, hover
        }
        function click(el, binding) {
            document.addEventListener('click', cd(el, binding))
        }
        function hover(el, binding) {
            document.addEventListener('mouseleave', cd(el, binding), true)
        }
        removeFn(el, binding)
        trgO[key](el, binding)
    },
    beforeUnmount(el, binding) {
        removeFn(el, binding)
    }
}
function removeFn(el, binding) {
    document.removeEventListener('click', cd(el, binding))
    document.removeEventListener('mouseleave', cd(el, binding))
}
function cd(el, binding) {
    return function (e) {
        if (!el.contains(e.target)) {
            typeof binding.value === 'function' && binding.value()
            return false
        }
        return true
    }
}


