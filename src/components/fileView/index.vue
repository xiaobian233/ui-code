<template>
  <div class="w-fileView">
    暂未开发
  </div>
</template>

<script>
import { reactive } from 'vue'
export default {
  name: 'w-fileView',
  props: ['data'],
  setup(props) {
    const data = reactive({})
    const isAudio = (path) => /\.(opus|flac|webm|weba|wav|ogg|m4a|mp3|oga|mid|amr|aiff|wma|au|aac)/.test(path);
    const isVideo = (path) => /\.(mp4|avi|wmv|mpg|mpeg|mov|rm|ram|swf|flv)/.test(path);
    const isImage = (path) => /\.(xbm|tif|pjp|svgz|jpg|jpeg|ico|tiff|gif|svg|jfif|webp|png|bmp|pjpeg|avif)/.test(path);


  }
}
</script>

<style lang="scss">
</style>