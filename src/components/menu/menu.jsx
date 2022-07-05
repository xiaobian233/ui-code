import { defineComponent, reactive, toRefs } from "vue";
import { useMenuProvide } from "@/hook/useMenu/useMenu"
export default defineComponent({
    name: 'j-menu',
    props: {
        backgroundColor: { type: String, default: "#000000d9" },
        openKey: { type: Array, default: [] },
        checkKey: { type: Array, default: [] },
    },
    setup(props, { emit, attrs, slots }) {
        const data = reactive({})
        const slotsDefalut = slots.default()
        useMenuProvide({ props, data })
        return () => {
            return (
                <div>{slotsDefalut}</div>
            )
        }
    }
})