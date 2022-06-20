<template>
  <span class="wbutton">
    <button v-bind="$attrs" :disabled="disabled" :class="[$style.wbutonButton,typeStyle]" @click="change">
      <slot name="before"></slot>
      <slot></slot>
      <slot name="after"></slot>
    </button>
  </span>
</template>

<script>
import { computed, getCurrentInstance, reactive, toRefs, useCssModule } from 'vue'
export default {
  name: 'w-button',
  props: {
    type: { type: String, default: '' },
    disabled: { type: [String, Boolean], default: false }
  },
  emits: ['change'],
  setup(props, { emit }) {
    const data = reactive({})
    const wButton = useCssModule()
    const isDisable = computed(() => props.disabled === false ? '' : wButton.disable)
    const typeStyle = computed(() => {
      // 获取type类型
      const styleCss = wButton[props.type] || wButton.default
      // 获取是否禁用
      const disabledStyle = isDisable.value
      return `${styleCss} ${disabledStyle}`
    })
    const change = () => {
      if (isDisable) emit('change')
    }
    return { ...toRefs(data), typeStyle, ...toRefs(props), change }
  }
}
</script>

<style lang="scss" scoped module>
@import './index.scss';
</style>