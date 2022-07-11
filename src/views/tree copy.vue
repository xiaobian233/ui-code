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
                                // { title: 'leaf', key: '0-0-0-1' },
                            ],
                        },
                        // {
                        //     title: 'parent 1-1',
                        //     key: '0-0-1',
                        //     children: [{ key: '0-0-1-0', title: 'sss' }],
                        // },
                    ],
                },
            ],
            treeData: []
        })
        let opt = {
            child: false,
            ml: 24,
            magnification: 2,
        }
        const clickTreeItem = (item) => {
            item.children && (datas.data = item.children)
            console.error(datas.data);
        }
        const isChild = computed(() => {
            console.error(datas.data, item, 'childs', item);
            // if (datas.data == []) return strue
        })
        const treeFn = (arr, opt) => {
            if (arr.length > 0) {
                arr.map((item, index) => {
                    let { ml, child } = opt
                    datas.treeData.push(
                        <div onClick={() => clickTreeItem(item)} class={['w-tree-item']} style={{ 'margin-left': child ? ml + 'px' : '' }}>
                            <span>{item.title}</span>
                        </div >)
                    item.children && item.children.length > 0 && treeFn(item.children, {
                        ...opt,
                        child: true,
                        ml: opt.ml * opt.magnification,
                    })
                })
            } else return ''
        }
        onMounted(() => {
            treeFn(datas.data, opt)
        })
        return () => {
            return (
                <div class="w-tree">
                    {datas.treeData}
                </div>)
        }
    }
})


</script>

<style lang="scss" scoped>
.w-tree {}
</style>