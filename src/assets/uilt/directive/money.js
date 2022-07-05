import { nextTick } from "vue";

const elFocus = (el, binding) => {
    return function () {
        this.value = binding.value.values
        binding.value.valueClick(this.value)
    }
}

const elBlur = (el, binding) => {
    return function () {
        binding.value.valueClick(numberToStr(binding.value.values, binding.value.flot))
    }
}

const elMousedown = (el, binding) => {
    return function () {
        binding.value.values = this.value
    }
}

export default {
    mounted(el, binding) {
        let { isTarget } = binding.value
        if (isTarget) {
            nextTick(() => {
                el.value = numberToStr(el.value, binding.value.flot)
                el.addEventListener('focus', elFocus(el, binding))
                el.addEventListener('blur', elBlur(el, binding))
                el.addEventListener('keyup', elMousedown(el, binding))
            })
        }
    },
    beforeUnmount(el, binding) {
        el.removeEventListener('focus', elFocus(el, binding))
        el.removeEventListener('blur', elBlur(el, binding))
        el.removeEventListener('keyup', elMousedown(el, binding))
    }
}

const numberToStr = function (number, places, symbol, thousand, decimal) {
    if (number == undefined || number === "") {
        return "";
    }
    number = number || 0;
    places = !isNaN((places = Math.abs(places))) ? places : 2;
    symbol = symbol !== undefined ? symbol : "";
    thousand = thousand || ",";
    decimal = decimal || ".";
    var negative = number < 0 ? "-" : "";
    var i =
        parseInt((number = Math.abs(+number || 0).toFixed(places)), 10) + "";
    var j = (j = i.length) > 3 ? j % 3 : 0;
    return (
        symbol +
        negative +
        (j ? i.substr(0, j) + thousand : "") +
        i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) +
        (places
            ? decimal +
            Math.abs(number - i)
                .toFixed(places)
                .slice(2)
            : "")
    );
}