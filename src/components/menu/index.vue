<template>
  <div class="w-menu" :style="{ 'background-color': backgroundColors }">
    <slot @menuItem="change"></slot>
  </div>
</template>

<script>
export default {
  props: {
    backgroundColor: { type: String, default: "#000000d9" },
    openKey: { type: Array, default: [] },
    checkKey: { type: Array, default: [] },
  },
  name: 'w-menu',
  provide() {
    return {
      _el: this
    }
  },
  inject: ['_drop'],
  data: () => ({
    backgroundColors: "",
    dropdownBol: false
  }),
  methods: {
    setValue({ openKey = [], checkKey = [] }, cb) {
      this.$emit('change', {
        openKey,
        checkKey
      })
      this.$emit('update:openKey', openKey)
      this.$emit('update:checkKey', checkKey)
      this.$nextTick(cb)
    },
    change(val) {
      this.$emit('change', val)
      this._drop && this._drop.checkOut()
    },
  },
  created() {
    this.dropdownBol = this._drop ? true : false
  },
  mounted() {
    this.backgroundColors = this.backgroundColor
    if (this.dropdownBol) this.backgroundColors = "#fff"
  },
}
</script>

<style lang="scss" scoped>
.w-menu {
  width: 100%;
  padding: 6px;
}
</style>