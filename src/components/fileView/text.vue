<template>
  <div class="w-video">
    <w-modal class="w-file-modal" title="文本内容" v-model:visible="isView" @cancel="cancel">
      <template #body>
        <span>{{ href }}</span>
      </template>
    </w-modal>
  </div>
</template>

<script>
import { ref, watchEffect } from 'vue'
export default {
  props: { fileItem: { type: Object, default: () => ({}) } },
  setup(props, { emit }) {
    const href = ref('')
    const isView = ref(false)
    watchEffect(() => {
      let reader = new FileReader()
      reader.onload = function (ev) {
        href.value = ev.target.result
        isView.value = true
      }
      reader.readAsText(props.fileItem)
    })
    const cancel = () => {
      isView.value = false
      emit('change', '')
    }
    return {
      href, isView, cancel
    }
  }
}
</script>

<style lang="scss" scoped>
.w-file-modal {
  ::v-deep(.w-modal-banner) {
    width: auto;
  }
}
</style>