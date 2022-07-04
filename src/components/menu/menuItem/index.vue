<template>
  <div class="w-menu-item" ref="wMenuItem" :class="disabled ? 'disabled' : ''" @click="menuItemFn">
    <slot></slot>
  </div>
</template>

<script>
import emitter from "@/assets/uilt/event";
export default {
  name: "w-menu-item",
  props: {
    disabled: { type: Boolean },
    value: '',
  },
  methods: {
    menuItemFn() {
      if (this.disabled) return false;
      emitter.emit("menuItem", { value: this.value, ev: this.$el, parent: this.$parent });
    },
  },
  created() {
    emitter.on('menuParent', obj => {
      if (obj.el.contains(this.$el)) {
        this.$nextTick(() => {
          if ('style' in obj) {
            Object.assign(this.$refs.wMenuItem.style, obj.style)
          }
          if ('class' in obj) {
            obj.class.map(x => {
              this.$refs.wMenuItem.className = `${this.$refs.wMenuItem.className} ${x}`
            })
          }
        })
      }
    })
  },
};
</script>

<style lang="scss" scoped>
.w-menu-item {
  cursor: pointer;
  height: 36px;
  line-height: 36px;
  padding: 0 6px;
  transition: background 0.3s;
  color: #fff;
}

.w-menu-item:hover {
  background-color: #1890ff;

  &.color:hover {
    background-color: #f0f0f0;
  }
}

.disabled {
  color: #00000040;
  text-shadow: none;
  box-shadow: none;
  cursor: no-drop;
}
</style>
