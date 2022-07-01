<template>
  <div class="w-menu">
    <slot @menuItem="change"></slot>
  </div>
</template>

<script>
import emitter from "@/assets/uilt/event";
export default {
  name: "w-menu",
  methods: {
    change(val) {
      this.$emit("change", val);
      this.$parent["dropdown-close"] && this.$parent["dropdown-close"]();
    },
  },
  mounted() {
    emitter.on("menuItem", (obj) => {
      if (obj.parent === this) {
        this.change(obj.value);
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.w-menu {
  width: 100%;
}
</style>
