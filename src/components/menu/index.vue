<template>
  <div class="w-menu" :style="{ 'background-color': backgroundColors }">
    <slot @menuItem="change"></slot>
  </div>
</template>

<script>
import emitter from '@/assets/uilt/event'
import { Ev } from '@/assets/uilt/event'
export default {
  props: {
    'backgroundColor': { type: String, default: "#000000d9" },
  },
  name: 'w-menu',
  data: () => ({
    backgroundColors: ""
  }),
  methods: {
    change(val) {
      this.$emit('change', val)
      this.$parent['dropdown-close'] && this.$parent['dropdown-close']()
    },
    checkItem() {
      // 判断是否为 dropdown 组件
      if (typeof this.$parent['dropdown-close'] == 'function') {
        this.backgroundColors = '#ffffff'
        emitter.emit('menuParent', {
          style: {
            color: '#000000'
          },
          class: ['color'],
          el: this.$el
        })
      }

      Ev.$emit('sss',456)
    }
  },
  mounted() {
    emitter.on('menuItem', obj => {
      if (obj.parent === this) {
        this.change(obj.value)
      }
    })
    this.backgroundColors = this.backgroundColor
    this.checkItem()
  },
}
</script>

<style lang="scss" scoped>
.w-menu {
  width: 100%;
  padding: 6px;
}
</style>