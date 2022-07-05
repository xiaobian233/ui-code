<template>
  <div class="w-menu-sub-item" :class="disabled ? 'disabled' : ''">
    <div class="w-menu-sub-title" @click="clickHeight()">
      <span class="title-before-icon">
        <slot name="beforeIcon"> <i class="iconfont icon-mulu"></i> </slot>
      </span>
      <slot name="title" />
      <span class="title-after-icon">
        <slot name="afterIcon"><i class="iconfont icon-xiala" :class="{ 'checked': isHeight }"></i></slot>
      </span>
    </div>
    <div class="w-menu-sub-content" :style="{ height: heightPx + 'px' }" ref="wMenuSubContent">
      <slot v-if="isHeight"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "w-menu-sub-item",
  props: ["value", "disabled"],
  data: () => ({
    isHeight: false,
    heightPx: 0,
    parentObj: {},
    bol: false
  }),
  inject: ['_el'],
  provide() {
    return {
      _elSub: this,
    }
  },
  watch: {
    '_el'() {
      console.error(this);
    }
  },
  methods: {
    clickHeight(bols = false) {
      let openKey = this._el.openKey
      this.isHeight = !this.isHeight
      if (!this.isHeight) {
        this.heightPx = 0
        let index = openKey.findIndex(x => (this.value == x))
        index != -1 ? openKey.splice(index, 1) : null
      }
      else {
        openKey = [...openKey, this.value]
        this.$nextTick(() => {
          this.heightPx = this.$refs.wMenuSubContent.children.length * this.$refs.wMenuSubContent.children[0].offsetHeight
          Ev.emit("subOpenCheck", this.parentObj)
        })
      }
      if (!bols) this._el.setValue({ openKey: [...new Set(openKey)], checkKey: this._el.checkKey })
    },
    init(bols = false) {
      let { _el } = this
      this.bol = _el.openKey.some(key => (key == this.value))
      if (this.bol && !bols) this.clickHeight(true)
    }
  },
  created() {
    this.init()
  },
};
</script>

<style lang="scss" scoped>
.w-menu-sub-item {
  cursor: pointer;
  height: auto;
  overflow: hidden;

  .w-menu-sub-title {
    height: 36px;
    line-height: 36px;
    padding: 0 6px;
    vertical-align: middle;
    color: #fff;

    &:hover {
      text-shadow: 0 0 3px #cfe2f3;
    }

    .title-before-icon {
      margin-right: 8px;
    }

    .title-after-icon {
      float: right;
      position: relative;

      i {
        transform: rotate(0);
        position: absolute;
        top: 0;
        left: -16px;
        transition: all 0.3s;

        &.checked {
          transform: rotate(180deg);
        }
      }
    }
  }

  .w-menu-sub-content {
    height: 0;
    transition: all 0.3s;
    padding: 0 6px;
    overflow: hidden;
    width: 100%;
    box-sizing: border-box;
  }

  .disabled {
    color: #00000040;
    text-shadow: none;
    box-shadow: none;
    cursor: no-drop;
  }
}
</style>
