<template>
  <div class="w-row" :style="styles">
    <slot />
  </div>
</template>


<script >
import { computed } from '@vue/runtime-core';
export default {
  name: 'w-row',
  props: { span: { type: String, default: '24' } },
  setup(props, { slots }) {
    const styles = computed(() => {
      const num = 100 / 24 * props.span
      if (num > 100) throw new Error('The width is beyond 100%, Share the most 24 ')
      return {
        width: num + '%'
      }
    })

    return { styles }
  }
}
</script>

<style lang="scss" scoped>
.w-row {
  display: flex;
  justify-content: start;
  align-self: start;
}
</style>