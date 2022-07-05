import { defineComponent, reactive, toRefs } from "vue";
import { useMenuProvide } from "@/hook/useMenu/useMenu"
export default defineComponent({
    name: 'j-menuItem',
    props: {
        key: '',
    },
    setup(props, { emit, attrs, slots }) {
        const data = reactive({})
        const slotsDefalut = slots.default()
        // useMenuProvide({ props, data })
        return () => {
            return (
                <div>{slotsDefalut}</div>
            )
        }
    }
})

