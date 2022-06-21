<template>
  <div class="w-upload">
    <div class="w-upload-file">
      <input type="file" />
      <slot />
    </div>
    <div class="w-upload-files">

    </div>
  </div>
</template>

<script>
import { nextTick, onMounted, reactive, toRefs, watchEffect } from 'vue'
export default {
  name: 'w-upload',
  props: {
    fileList: { type: Array, default: () => ([]) },
    maxCount: { type: [Number, String], default: 1 },
    beforeUpload: { type: Function, default: () => { } }
  },
  setup(props, { emit }) {
    const data = reactive({
      fileList: []
    })
    const emitFn = key => {
      switch (key) {
        case 'change':
          emit('change', data.fileList.slice(-1))
          break;
        case 'model':
          emit('update:fileList', data.fileList)
          break;
      }
    }
    // 模拟点击
    const uploadFile = () => {
      document.querySelector('.w-upload-file').addEventListener('click', function (event) {
        this.querySelector('[type="file"]').click()
      })
      document.querySelector('.w-upload-file').querySelector('[type="file"]').addEventListener('change', function (e) {
        e.stopPropagation()
        e.preventDefault()
        let file = e.target.files[0]
        // 数组最多上传几个
        data.fileList = [...data.fileList, file]
        
        // 初始化 - 上传前
        const bol = props.beforeUpload(file)
        if (bol === false) return false
        // 
        console.error(data.fileList, ' data.fileList')
        //
        nextTick(() => { this.value = '' })
      })
      watchEffect(() => {
        data.fileList = props.fileList
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
</style>