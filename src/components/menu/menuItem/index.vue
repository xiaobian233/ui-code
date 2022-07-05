<template>
  <div class="w-menu-item" ref="wMenuItem" :class="[disabled ? 'disabled' : '', valueBol ? 'check' : '']"
    @click="menuItemFn">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "w-menu-item",
  props: {
    disabled: { type: Boolean },
    value: '',
  },
  inject: ['_el', '_elSub'],
  data: () => ({
    valueBol: false
  }),
  methods: {
    menuItemFn() {
      if (this._el.dropdownBol) this._el.change(this.value)
      else {
        let checkKey = this._el.checkKey
        checkKey = [this.value]
        this._el.setValue({ checkKey, openKey: this._el.openKey }, () => {
          this._elSub.init(true)
          this.init()
        })
      }
    },
    init() {
      this.$nextTick(() => {
        this._el.dropdownBol && (this.$refs.wMenuItem.className = `${this.$refs.wMenuItem.className} colorCheck color`)
        this._elSub && this._elSub.bol && (this.valueBol = this._el.checkKey.some(key => (key == this.value)))
      })
    }
  },
  mounted() {
    this.init()
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

  &.colorCheck {
    color: #000;
  }

  &.check {
    background-color: #1890ff;
  }
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
