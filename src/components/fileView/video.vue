<template>
  <div class="w-video">
    <w-modal class="w-file-modal" title="视频播放" v-model:visible="isView" @cancel="cancel">
      <template #body>
        <video v-if="fileItem.cmpType === 'video'" :src="href" controls autoplay muted disablePictureInPicture controlsList="nodownload noremoteplayback noplaybackrate">您的浏览器不支持 video 标签</video>
        <audio v-if="fileItem.cmpType === 'audio'" :src="href" controls autoplay muted disablePictureInPicture controlsList="nodownload noremoteplayback noplaybackrate">您的浏览器不支持 audio 标签</audio>
        <img v-if="fileItem.cmpType === 'image'" :src="href" alt="您的浏览器不支持 img 标签">
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
      reader.readAsDataURL(props.fileItem)
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