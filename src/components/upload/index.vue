<template>
  <div class="w-upload">
    <div class="w-upload-file">
      <input type="file" :accept="accept" :multiple="multiple" :disabled="disabled" />
      <slot />
    </div>
    <div class="w-upload-files">
      <slot name="fileList" :fileList="fileLists" />
    </div>
  </div>
</template>

<script>
import { nextTick, onMounted, reactive, toRefs, watchEffect } from 'vue'
export default {
  name: 'w-upload',
  props: {
    fileList: { type: Array, default: () => ([]) },
    maxCount: { type: [Number, String], default: null },
    disabled: { type: Boolean, default: false },
    beforeUpload: { type: Function, default: () => { } },
    change: { type: Function, default: () => { } },
    accept: { type: String, default: '' },
    multiple: { type: Boolean, default: false }
  },
  setup(props, { emit }) {
    const data = reactive({
      fileLists: []
    })
    const emitFn = key => {
      switch (key) {
        case 'model':
          emit('update:fileList', data.fileLists)
          break;
      }
    }
    // 模拟点击
    const uploadFile = () => {
      document.querySelector('.w-upload-file').addEventListener('click', function (event) {
        // 传入 true 为禁用
        if (props.disabled) return false
        this.querySelector('[type="file"]').click()
      })
      document.querySelector('.w-upload-file').querySelector('[type="file"]').addEventListener('change', function (e) {
        e.stopPropagation()
        e.preventDefault()
        let file = e.target.files[0]
        // 最多上传几个
        data.fileLists = props.maxCount ? [...data.fileLists, file].slice(Number(`-${props.maxCount}`)) : [...data.fileLists, file]
        emitFn('model')
        // change 事件触发
        props.change({ file, status: 'done' }, data.fileLists)
        // 初始化 - 上传前 为false, 终止上传
        const bol = props.beforeUpload(file)
        if (bol === false) {
          // 失败时
          props.change({ file, status: 'error' }, data.fileLists)
          return false
        }
        // 成功后
        props.change({ file, status: 'succeed' }, data.fileLists)
        // 调用成功后 初始化value值
        nextTick(() => { this.value = '' })
      })
      watchEffect(() => {
        data.fileLists = props.fileList
      })
    }
    onMounted(() => { uploadFile() })
    return { ...toRefs(data), uploadFile }
  }
}
</script>

<style lang="scss" scoped>
.w-upload-file input {
  display: none;
}
.w-upload-file {
  cursor: pointer;
}
.w-upload {
  display: inline-block;
}
</style>