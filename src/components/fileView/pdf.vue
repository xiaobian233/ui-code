<template>
  <div class="w-video">
    <w-modal class="w-file-modal" title="视频播放" v-model:visible="isView" @cancel="cancel">
      <template #body>
        <!-- {{ href }} -->
        <iframe :src="`http://e.anyoupin.cn/eh3/word/show_docx.php?url=${href}`"></iframe>
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
        console.error(ev);
        href.value = ev.target.result
        isView.value = true
      }
      reader.readAsArrayBuffer(props.fileItem)
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
// audio::-webkit-media-controls-play-button,
// video::-webkit-media-controls-play-button,
// audio::-webkit-media-controls-mute-button,
// video::-webkit-media-controls-mute-button {
//   width: 26px;
//   height: 26px;
// }
.w-file-modal {
  ::v-deep(.w-modal-banner) {
    width: auto;
  }
}
</style>