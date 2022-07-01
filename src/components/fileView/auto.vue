<template>
  <div class="w-video">
    <w-modal
      class="w-file-modal"
      title="暂未识别"
      v-model:visible="isView"
      @cancel="cancel"
      :footer="false"
    >
      暂未识别该文件, 小W在努力学习中...
    </w-modal>
  </div>
</template>

<script>
import { ref, watchEffect } from "vue";
export default {
  props: { fileItem: { type: Object, default: () => ({}) } },
  setup(props, { emit }) {
    const href = ref("");
    const isView = ref(false);
    watchEffect(() => {
      isView.value = true;
    });
    const cancel = () => {
      isView.value = false;
      emit("change", "");
    };
    return {
      href,
      isView,
      cancel,
    };
  },
};
</script>

<style lang="scss" scoped>
// audio::-webkit-media-controls-play-button,
// video::-webkit-media-controls-play-button,
// audio::-webkit-media-controls-mute-button,
// video::-webkit-media-controls-mute-button {
//   width: 26px;
//   height: 26px;
// }
</style>
