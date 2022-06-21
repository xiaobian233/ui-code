import { defineComponent } from 'vue'
export default defineComponent({
    name: '1231',
    setup(prop, { attr }) {
        console.error(attr, 'xxxxxxxxxxxx')
        return (
            <div>
                123456798
            </div>
        )
    },
    renderP(){
        return (
            <div>199999</div>
        )
    }
})