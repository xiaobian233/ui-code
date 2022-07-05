<template>
    <div class="w-input-wrapper">
        <span>
            <slot name="before">{{ before }}</slot>
        </span>
        <input v-money="{ money, moneyInit, valueClick, values, flot }" v-model="values" @input="inputChange"
            @keydown="inputKeyDown" class="w-input" type="text">
        <span>
            <slot name="after">{{ after }}</slot>
        </span>
    </div>
</template>

<script>
import { reactive, toRefs, watchEffect } from 'vue'
export default {
    name: 'w-input',
    props: {
        value: { type: [String, Number], default: '' },
        before: { type: [String, Number], default: '' },
        after: { type: [String, Number], default: '' },
        max: { type: [String, Number], default: '' },
        min: { type: [String, Number], default: '' },
        money: { type: Boolean, default: false },
        moneyInit: { type: Boolean, default: true },
        flot: { type: Number, default: 2 }
    },
    setup(props, { emit }) {
        const data = reactive({
            values: ''
        })
        const inputChange = el => {
            maxMin(el.target.value, 'T')
            emit('update:value', data.values)
            emit('change', data.values)
        }
        const inputKeyDown = el => {
            if (el.keyCode == 13) emit('Search', data.values)
        }
        const valueClick = value => data.values = value
        const maxMin = (val, key) => {
            val = key == 'T' ? val : props.value
            if (props.money) {
                let values = val,
                    max = props.max + '',
                    min = props.min + '',
                    valuesBol = `${values}`.indexOf('.') != -1,
                    valuesStr = `${values}`
                let { flot } = props
                // 处理浮点数
                if (flot == 0) values = valuesStr.split('.')[0]
                else if (valuesBol) {
                    let flotValue = valuesStr.split('.')[1].slice(0, props.flot)
                    values = `${valuesStr.split('.')[0]}.${flotValue}`
                }
                // 处理大于max值
                if (max && Number(values) > max) values = max
                // 处理小于min值
                if (min && Number(values) < min) values = min
                // 异常处理 - 等于NAN时 返回旧值
                if (!$U.isN(values) && values != '' && values != '-') values = props.value
                // 返回值
                data.values = values
            }
            else data.values = val
        }
        watchEffect(() => {
            maxMin()
        })
        return { ...toRefs(data), inputChange, inputKeyDown, valueClick }
    }
}
</script>

<style lang="scss" scoped>
.w-input-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    margin: 0;
    font-variant: tabular-nums;
    list-style: none;
    font-feature-settings: "tnum";
    position: relative;
    // width: 100%;
    min-width: 0;
    color: #000000d9;
    font-size: 14px;
    line-height: 1.5715;
    background-color: #fff;
    background-image: none;
    border: 1px solid #d9d9d9;
    border-radius: 2px;
    transition: all .3s;
    padding: 0 8px;

    &:hover {
        border-color: $wang-primary-5;
        border-right-width: 1px !important;
    }

    .w-input {
        box-sizing: border-box;
        margin: 0;
        font-variant: tabular-nums;
        list-style: none;
        font-feature-settings: "tnum";
        position: relative;
        display: inline-block;
        min-width: 0;
        color: #000000d9;
        font-size: 14px;
        line-height: 1.5715;
        background-color: #fff;
        background-image: none;
        border: none;
        transition: all .3s;
        padding: 0;


    }

    &:focus,
    .w-input-focused {
        border-color: $wang-primary-color-hover;
        box-shadow: 0 0 0 2px $wang-primary-color-outline;
        border-right-width: 1px !important;
        outline: 0;
    }

    .w-input:focus {
        border-color: transparent;
        box-shadow: 0 0 0 2px transparent;
        border-right-width: 1px !important;
        outline: 0;
    }


    input[type=text],
    input[type=password],
    input[type=number],
    textarea {
        -webkit-appearance: none;
    }

    a,
    area,
    button,
    [role=button],
    input:not([type="range"]),
    label,
    select,
    summary,
    textarea {
        touch-action: manipulation;
    }

    .w-input:placeholder-shown {
        text-overflow: ellipsis;
    }
}
</style>