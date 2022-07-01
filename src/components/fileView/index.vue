<template>
  <div class="w-fileView">
    <template v-for="(v, index) in dataMap" :key="index">
      <div class="w-list-item" @click="targetClick(v, index)">
        <slot name="before"></slot>
        <div class="w-list-item-file-font">
          <span class="iconfont" :class="v.class"></span>
        </div>
        <div class="w-list-item-file-name">{{ v.name }}</div>
        <slot name="after"></slot>
      </div>
    </template>
    <w-text
      v-if="fileItem.cmpType === 'text'"
      :fileItem="fileItem"
      @change="fileItem = ''"
    />
    <w-video
      v-if="
        fileItem.cmpType === 'video' ||
        fileItem.cmpType === 'audio' ||
        fileItem.cmpType === 'image'
      "
      :fileItem="fileItem"
      @change="fileItem = ''"
    />
    <w-pdf
      v-if="fileItem.cmpType === 'pdf'"
      :fileItem="fileItem"
      @change="fileItem = ''"
    />
    <w-word
      v-if="fileItem.cmpType === 'word'"
      :fileItem="fileItem"
      @change="fileItem = ''"
    />
    <w-auto
      v-if="fileItem.cmpType === 'auto'"
      :fileItem="fileItem"
      @change="fileItem = ''"
    />
  </div>
</template>

<script>
import { reactive, toRefs, defineAsyncComponent, watchEffect } from "vue";
export default {
  components: {
    "w-text": defineAsyncComponent({ loader: () => import("./text.vue") }),
    "w-video": defineAsyncComponent({ loader: () => import("./video.vue") }),
    "w-pdf": defineAsyncComponent({ loader: () => import("./pdf.vue") }),
    "w-word": defineAsyncComponent({ loader: () => import("./word.vue") }),
    "w-auto": defineAsyncComponent({ loader: () => import("./auto.vue") }),
  },
  name: "w-fileView",
  props: ["data"],
  setup(props) {
    const data = reactive({
      dataMap: [],
      fileItem: {},
    });
    const isAudio = (path) =>
      /\.(opus|flac|webm|weba|wav|ogg|m4a|mp3|oga|mid|amr|aiff|wma|au|aac)/.test(path);
    const isVideo = (path) => /\.(mp4|avi|wmv|mpg|mpeg|mov|rm|ram|swf|flv)/.test(path);
    const isImage = (path) =>
      /\.(xbm|tif|pjp|svgz|jpg|jpeg|ico|tiff|gif|svg|jfif|webp|png|bmp|pjpeg|avif)/.test(
        path
      );
    const isPDF = (path) => /\.(pdf|PDF)/.test(path);
    const isWord = (path) => /\.(doc|docx|xls|xlsx|xlsm|ppt|pptx)/.test(path);
    const isFile = (path) => /\.(txt)/.test(path);
    watchEffect(() => {
      data.dataMap = props.data.map((x) => {
        x.cmpType = isFile(x.name)
          ? "text"
          : isPDF(x.name)
          ? "pdf"
          : isWord(x.name)
          ? "word"
          : isAudio(x.name)
          ? "audio"
          : isVideo(x.name)
          ? "video"
          : isImage(x.name)
          ? "image"
          : "auto";
        x.class = isFile(x.name)
          ? "icon-wj-wj"
          : isPDF(x.name)
          ? "icon-pdf"
          : isWord(x.name)
          ? "icon-Word1"
          : isAudio(x.name)
          ? "icon-audio"
          : isVideo(x.name)
          ? "icon-VIDEO"
          : isImage(x.name)
          ? "icon-i-img"
          : "icon-unknow";
        return x;
      });
    });
    const targetClick = (item) => {
      data.fileItem = item;
    };
    return { ...toRefs(data), targetClick };
  },
};
</script>

<style lang="scss" scoped>
.w-fileView {
  display: flex;
  align-items: flex-start;
  max-width: 100%;
  width: 100%;
  flex-wrap: wrap;
  justify-content: flex-start;
  min-width: 350px;
  width: 100%;
  flex-flow: wrap;
  .w-list-item {
    cursor: pointer;
    border-bottom: 1px solid #f0f0f0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 6px;
    color: #000000d9;
    width: 100%;
    background-color: #fff;
    &:hover {
      background-color: #fafafa;
    }
  }
}
</style>
