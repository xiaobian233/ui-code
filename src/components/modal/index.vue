<template>
  <div class="w-modal" v-if="visibles">
    <div class="w-modal-mask" @click="removeChange('cancel')"></div>
    <div class="w-modal-banner" :class="[visibles?'animate__animated animate__zoomIn' : '']">
      <!-- body -->
      <slot name="body">
        <!-- tou -->
        <slot name="header">
          <div class="w-modal-header">
            <span class="w-modal-title">{{ title }}</span>
            <span class="w-modal-close" @click="removeChange('cancel')">x</span>
          </div>
        </slot>
        <!-- banner -->
        <div class="w-modal-body">
          <slot>
            {{ $attrs.content }}
          </slot>
        </div>
        <!-- footer -->
        <slot name="footer">
          <div class="w-modal-footer">
            <w-button class="w-btn" @change="removeChange('cancel')">取消</w-button>
            <w-button class="w-btn" type="primary" @change="removeChange('ok')">保存</w-button>
          </div>
        </slot>
      </slot>
    </div>
  </div>
</template>

<script>
import { computed, nextTick, reactive, toRefs, watchEffect, defineComponent } from 'vue'
export default defineComponent({
  name: 'w-modal',
  props: {
    title: { type: String, default: '' },
    visible: { type: Boolean, default: false }
  },
  setup(props, { emit, expose, attrs }) {
    const data = reactive({ visibles: false })
    const addStyle = el => {
      el.style.overflow = 'hidden'
      el.style.width = 'calc(100% - 17px)'
    }
    const removeStyle = el => {
      el.style.overflow = ''
      el.style.width = ''
    }
    const removeChange = (key) => {
      if (attrs.ok && attrs.ok() == false && key == 'ok') return false
      emit(key, false)
      emit('update:visible', false)
      attrs.removeMsg && attrs.removeMsg()
    }
    const checkTarget = computed(() => data.visibles ? 'click' : '')
    watchEffect(() => {
      data.visibles = props.visible
      nextTick(() => {
        const body = document.querySelector('body')
        if (data.visibles) addStyle(body)
        else removeStyle(body)
      })
    })
    expose({
      data,
    })
    return {
      ...toRefs(data),
      removeChange,
      checkTarget
    }
  }
})
</script>

<style lang="scss" scoped>
.w-modal-mask {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 911;
  height: 100%;
  background-color: #00000073;
}
.w-modal-banner {
  position: absolute;
  background-color: #fff;
  background-clip: padding-box;
  border: 0;
  border-radius: 2px;
  box-shadow: 0 3px 6px -4px rgb(0 0 0 / 12%), 0 6px 16px rgb(0 0 0 / 8%),
    0 9px 28px 8px rgb(0 0 0 / 5%);
  pointer-events: auto;
  z-index: 999;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 520px;
}
.w-modal-header {
  padding: 16px 24px;
  color: #000000d9;
  background: #fff;
  border-bottom: 1px solid #f0f0f0;
  border-radius: 2px 2px 0 0;
  position: relative;
  .w-modal-title {
    margin: 0;
    color: #000000d9;
    font-weight: 500;
    font-size: 16px;
    line-height: 22px;
    word-wrap: break-word;
  }
  .w-modal-close {
    display: inline-block;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 10;
    padding: 0;
    color: #00000073;
    font-weight: 700;
    line-height: 1;
    text-decoration: none;
    background: transparent;
    border: 0;
    outline: 0;
    cursor: pointer;
    transition: color 0.3s;
    width: 56px;
    height: 56px;
    font-size: 16px;
    font-style: normal;
    line-height: 56px;
    text-align: center;
    text-transform: none;
    text-rendering: auto;
  }
}
.w-modal-footer {
  padding: 10px 16px;
  text-align: right;
  background: transparent;
  border-top: 1px solid #f0f0f0;
  border-radius: 0 0 2px 2px;
  .w-btn:nth-child(1) {
    margin-bottom: 0;
    margin-right: 8px;
  }
}
.w-modal-body {
  padding: 24px;
  font-size: 14px;
  line-height: 1.5715;
  word-wrap: break-word;
}
</style>