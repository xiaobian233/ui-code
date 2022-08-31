<script>
import { computed, defineComponent, ref, onMounted, reactive, watchEffect } from "vue";
export default defineComponent({
    name: 'w-tree',
    props: {
        data: { type: Array, default: [] }
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
            keyBol: true
        })
        const opt = {
            child: false,
            tier: 2,
        }

        const clickTreeItem = (index, item) => {
            let b = false;
            if (index == 1 && item.children && item.children.length > 0) {
                b = !item.childShow
                item.childShow = b
                const f = (arr, b) => {
                    arr.forEach(x => {
                        x.isShow = b
                        if (!item.childShow)
                            if (x.children && x.children.length > 0) {
                                f(x.children, b)
                            }
                    })
                }
                f(item.children, b)
            }
        }

        const getters = (index, item) => {
            if (index == 1 && item.children && item.children.length > 0) return 'K'
            else return ''
        }
        const getDatas = computed(() => {
            let floatArr = []
            let arrFn = (arr, index, parent = null) => (
                arr.forEach(x => {
                    x.isShow = datas.keyBol
                    x.childShow = datas.keyBol
                    if (index == 0) x.index = index
                    if (parent) x.parent = parent
                    if (parent && parent.tier) x.tier = parent.tier + 1
                    else x.tier = 2
                    if (x.children && x.children.length > 0) {
                        arrFn(x.children, index++, x)
                    }
                    floatArr.push(x)
                })
            )
            arrFn(datas.data, 0)
            floatArr = floatArr.reverse()
            console.error(floatArr, 'floatArr floatArr floatArr');
            return floatArr
        })
        return {
            datas,
            clickTreeItem,
            getters,
            getDatas
        }
    }
})
</script>

<template>
    <div class="w-tree">
        <template v-for="item, index in getDatas" :key="index">
            <div class="w-tree-item" v-if="item.isShow">
                <span :class="{ 'w-tree-item-open': i == 1 && item.children && item.children.length > 0 }"
                    v-for="i in item.tier" :key="i" @click="() => clickTreeItem(i, item)" class="w-tree-tier">{{  i == 1
                    ? getters(i, item) : ''








                    }}</span>
                <span>{{  item.title  }}</span>
            </div>
        </template>
    </div>
</template>

<style lang="scss" scoped>
.w-tree {
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

        .w-tree-item-open {
            background-color: pink;
        }
    }

}
</style>