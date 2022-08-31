<template>
    <p style="color:red;">数据量: {{  data.demo.length  }} 条</p>
    <div @scroll="scrollEl" ref="el" style="overflow: auto;" :style="{ height: data.elH + 'px' }">
        <div class="dv" v-for="v, i in data.arr" :key="i"
            :style="{ height: data.uinH + 'px', lineHeight: data.uinH + 'px' }">
            <slot :data="v">
                <span>{{  v.name  }}</span>
                <span>__</span>
                <span>{{  v.index  }}</span>
            </slot>
        </div>
    </div>
</template>

<script setup>
import { nextTick, reactive, ref, defineProps } from 'vue';
import demo from '@/assets/uilt/demo/demo.json'
const el = ref(null)
const props = defineProps({
    datas: {
        type: Array,
        default: _ => []
    },
    rowH: {
        type: [Number | String],
        defalut: 60
    },
    overFiftyPercent: { // 默认为 底部最后一条加载数据, 为true时  一屏滚动到一半时加载数据
        type: Boolean,
        default: false
    }
})
const data = reactive({
    arr: [],
    uinH: props.rowH || 60,
    count: 0,
    startIndex: 0,
    demo: props.datas && props.datas.length > 0 && props.datas || demo,
    elH: 0,
    top: 0
})
const init = () => {
    nextTick(() => {
        let h = window.innerHeight;
        let { top, bottom } = el.value.getBoundingClientRect()
        let elH = h - top
        data.elH = elH
        data.count = (elH / data.uinH) + 1;
        data.arr = data.demo.slice(data.startIndex, data.count)
        data.top = el.value.scrollTop
    })
}
init()
const scrollEl = (e) => {
    let top = el.value.scrollTop
    let n = props.overFiftyPercent ? 1 : 0
    const f = () => {
        data.top = top
        data.startIndex++
        let counts = data.startIndex * data.count
        data.arr.push(...data.demo.slice(counts, counts + data.count))
    }
    if (data.startIndex == 0 && top >= data.uinH) f()
    else if (top >= (data.startIndex * (data.count - n) * data.uinH)) f()
    else {
        console.error(top, 'ttttt', data.startIndex * (data.count - n) * data.uinH);
        // alert('触底时...')
    }
}
</script>

<style>
</style>