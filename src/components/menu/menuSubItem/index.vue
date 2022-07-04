<template>
  <div class="w-menu-sub-item" :class="disabled ? 'disabled' : ''" :disabled="disabled">
    <div class="w-menu-sub-title" @click="clickHeight">
      <slot name="title"></slot>
      <slot name="icon">{{ isHeight }}</slot>
    </div>
    <div class="w-menu-sub-content" :style="{ height: heightPx + 'px' }" ref="wMenuSubContent">
      <div v-if="isHeight">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import emitter from "@/assets/uilt/event";
export default {
  name: "w-menu-sub-item",
  props: ["value", "disabled"],
  data: () => ({
    isHeight: false,
    heightPx: 0
  }),
  methods: {
    menuItemFn(value) {
      if (this.disabled) return false;
      emitter.emit("menuItem", { value: value, ev: this.$el, parent: this.$parent });
    },
    clickHeight() {
      this.isHeight = !this.isHeight
      if (!this.isHeight) this.heightPx = 0
      else {
        this.$nextTick(() => {
          this.heightPx = this.$refs.wMenuSubContent.children.length * this.$refs.wMenuSubContent.children[0].offsetHeight
        })
      }
    },
  },
  mounted() {
    emitter.on("menuItem", (obj) => {
      if (obj.parent === this) {
        this.menuItemFn(obj.value);
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.w-menu-sub-item {
  cursor: pointer;
  height: auto;
  padding: 0 6px;
  background-color: #fff;
  overflow: hidden;

  .w-menu-sub-title {
    height: 36px;
    line-height: 36px;

    &:hover {
      background-color: #f0f0f0;
    }
  }

  .w-menu-sub-content {
    height: 0;
    transition: all 0.6s;
    padding: 0 8px;
    overflow: hidden;
  }

  .disabled {
    color: #00000040;
    text-shadow: none;
    box-shadow: none;
    cursor: no-drop;
  }
}
</style>
