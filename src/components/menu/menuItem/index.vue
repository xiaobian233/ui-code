<template>
  <div
    class="w-menu-item"
    :class="disabled ? 'disabled' : ''"
    :disabled="disabled"
    @click="menuItemFn"
  >
    <slot></slot>
  </div>
</template>

<script>
import emitter from "@/assets/uilt/event";
export default {
  name: "w-menu-item",
  props: ["value", "disabled"],
  methods: {
    menuItemFn() {
      if (this.disabled) return false;
      emitter.emit("menuItem", { value: this.value, ev: this.$el, parent: this.$parent });
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.w-menu-item {
  cursor: pointer;
  height: 36px;
  line-height: 36px;
  padding: 0 6px;
  background-color: #fff;
  transition: background 0.3s;
}
.w-menu-item:hover {
  background-color: #f0f0f0;
}
.disabled {
  color: #00000040;
  text-shadow: none;
  box-shadow: none;
  cursor: no-drop;
}
</style>
