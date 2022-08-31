<script>
import { computed, defineComponent, ref, onMounted, reactive, watchEffect } from "vue";
export default defineComponent({
    name: 'w-tree',
    props: {
        data: { type: Array, default: [] },
        isOpen: { type: Boolean, default: false }
    },
    setup(props, { emit }) {
        const datas = reactive({
            data: [
                {
                    title: 'parent 1',
                    key: '0-0',
                    children: [
                        {
                            title: 'parent 1-0',
                            key: '0-0-0',
                            disabled: true,
                            children: [
                                { title: 'leaf', key: '0-0-0-0', disableCheckbox: true },
                                { title: 'leaf', key: '0-0-0-1' },
                            ],
                        },
                        {
                            title: 'parent 1-1',
                            key: '0-0-1',
                            children: [{ key: '0-0-1-0', title: 'sss' }],
                        },
                    ],
                },
            ],
            treeData: [],
            childData: [],
            keyBol: props.isOpen,
            floatArr: []
        })
        const clickTreeItem = (index, item) => {
            if (index == 1 && item.children && item.children.length > 0) {
                const isK = k => k == 'K'
                const areE = _ => 'E'
                isK(item.open) ? (item.open = 'E') : (item.open = 'K')
                let b = isK(item.open)
                const f = (arr, b) => {
                    arr.forEach(x => {
                        if (x.open && isK(x.open)) {
                            x.isShow = b
                            x.open = areE()
                        }
                        else x.isShow = b
                        if (x.children && x.children.length > 0) {
                            f(x.children, b ? !x.isShow : b)
                        }
                    })
                }
                f(item.children, b)
            }
            if (index == 2) {
                item.check = !item.check
            }
        }

        const init = () => {
            let arrFn = (arr, index, parent = null) => (
                arr.forEach(x => {
                    x.isShow = datas.keyBol
                    x.index = index
                    parent && (x.parent = parent)
                    if (parent && parent.tier) x.tier = parent.tier + 1
                    else x.tier = 2
                    if (x.children && x.children.length > 0) {
                        // 统一走状态为 开启
                        x.isShow ? x.open = 'E' : x.open = 'K'
                        arrFn(x.children, ++index, x)
                    }
                    // 判断第一条数据
                    if (x.index == 0 && !x.isShow && !datas.keyBol) x.isShow = true, x.open = 'E'
                    datas.floatArr.push(x)
                })
            )
            arrFn(datas.data, 0)
            datas.floatArr = datas.floatArr.reverse()
            // console.error(datas.floatArr, 'datas.floatArr');
        }
        init()
        return {
            datas,
            clickTreeItem,
        }
    }
})
</script>

<template>
    <div class="w-tree">
        <template v-for="item, index in datas.floatArr" :key="index">
            <div class="w-tree-item" v-if="item.isShow">
                <span class="w-tree-tier" :class="{
                    'w-tree-item-open': i == 1 && item.children && item.children.length > 0,
                    'w-tree-isCheck': i == 2,
                    'w-tree-selected': item.check
                }" v-for="i in item.tier" :key="i" @click="() => clickTreeItem(i, item)">
                    <span v-if="i == 1">{{  item.open  }}</span>
                </span>
                <span>{{  item.title  }}</span>
            </div>
        </template>
    </div>
</template>

<style lang="scss" scoped>
.w-tree {
    margin: 36px;

    .w-tree-item {
        display: flex;
        align-items: flex-start;
        padding: 0 0 4px;
        outline: none;
        align-items: center;
        cursor: pointer;

        .w-tree-tier {
            width: 24px;
            height: 24px;
            display: inline-block;
            line-height: 24px;
            text-align: center;
        }

        .w-tree-isCheck {
            background-color: #eaf362;
        }

        .w-tree-isCheck.w-tree-selected {
            &::before {
                content: '';
                width: 8px;
                height: 8px;
                display: inline-block;
                border-radius: 50%;
                background-color: red;
            }
        }

        .w-tree-item-open {
            background-color: pink;
        }

    }

}
</style>