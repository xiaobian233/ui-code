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
            childData: []
        })
        const opt = {
            child: false,
            tier: 2,
        }

        const treeFn = (arr, parent, opt) => {
            if (arr.length > 0) {
                arr.map((item, index) => {
                    item.isShow = false
                    let { tier } = opt
                    tier++
                    // 判断是否有子级
                    if (!parent) item.keys = []
                    else {
                        !parent.keys && (parent.keys = [])
                        parent.keys.push(item.key)
                        parent.isShow = true
                        item.parent = parent
                    }
                    Object.assign(item, opt)
                    datas.treeData.push(item)
                    item.children && item.children.length > 0 && treeFn(item.children, item, {
                        ...opt,
                        tier,
                    })
                })
            }
        }
        onMounted(() => {
            treeFn(datas.data, null, opt)
            console.error(datas.data, 'datas.data');
        })
        const clickTreeItem = (index, item) => {
            const arrf = ((arr, item, bols) => {
                arr.forEach(x => {
                    if (item.keys.includes(x.key)) {
                        x.isShow = bols
                        x.children && arrf(x.children, x, bol)
                    }
                })
                console.error(arr, 'arr');
            })
            if (index == 1) {
                if (item.children && item.children.length > 0) {
                    arrf(datas.data, item, !item.isShow)
                    console.error(datas.data);
                    return item.isShow
                }
            }
        }
        const isChild = (item) => {
            if (datas.childData && datas.childData.length && datas.childData.length > 0) {
                isView(datas.childData, item.isShow)
                return item.isShow
            }
            return true
        }
        const getters = (index, item) => {
            if (index == 1 && item.children && item.children.length > 0) return 'K'
            else return ''
        }
        return {
            datas,
            clickTreeItem,
            isChild,
            getters
        }
    }
})
</script>

<template>
    <div class="w-tree">
        <template v-for="item, index in datas.treeData" :key="index">
            <div class="w-tree-item" v-if="isChild(item)">
                <span :class="{ 'w-tree-item-open': i == 1 }" v-for="i in item.tier" :key="i"
                    @click="() => clickTreeItem(i, item)" class="w-tree-tier">{{ i == 1 ? getters(i, item) : ''
                    }}</span>
                <span>{{ item.title }}</span>
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