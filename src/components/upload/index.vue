<template>
  <div class="w-upload">
    <div v-if="!drag" class="w-upload-file" @click="clickFile(1)">
      <input
        ref="fileRef"
        type="file"
        :accept="accept"
        :multiple="multiple"
        :disabled="disabled"
        @change="uploadChange"
      />
      <!-- // 用户放入标签 -->
      <slot />
    </div>
    <div
      ref="dragRef"
      :style="{
        'border-color': draghover ? '#008effeb' : '#d9d9d9',
        'box-shadow': draghover ? '0 0 5px 0px #008effeb' : 'none',
      }"
      class="w-upload-drag"
      v-if="drag"
      @click="clickFile(2)"
    >
      <input
        ref="fileRef2"
        type="file"
        :accept="accept"
        :multiple="multiple"
        :disabled="disabled"
        @change="uploadChange"
      />
      <slot name="dragContent">
        <p class="w-upload-drag-title">Click or drag file to this area to upload</p>
        <p class="w-upload-drag-hint">
          Support for a single or bulk upload. Strictly prohibit from uploading company
          data or other band files
        </p>
      </slot>
    </div>
    <div class="w-upload-list">
      <slot name="fileList" :fileList="fileLists" :file="file" />
    </div>
  </div>
</template>

<script>
import { nextTick, onMounted, reactive, ref, toRefs, watchEffect } from "vue";
export default {
  name: "w-upload",
  props: {
    fileList: { type: Array, default: () => [] },
    maxCount: { type: [Number, String], default: null },
    disabled: { type: Boolean, default: false },
    beforeUpload: { type: Function, default: () => {} },
    change: { type: Function, default: () => {} },
    accept: { type: String, default: "" },
    multiple: { type: Boolean, default: false },
    drag: { type: Boolean, default: false },
  },
  setup(props, { emit, expose }) {
    const data = reactive({
      fileLists: [],
      draghover: false,
      file: {},
    });
    const fileRef = ref(null);
    const fileRef2 = ref(null);
    const dragRef = ref(null);
    const emitFn = (key) => {
      switch (key) {
        case "model":
          emit("update:fileList", data.fileLists);
          break;
      }
    };
    // 上传逻辑处理
    const uploadChange = (e, keyName = "") => {
      let file = {};
      if (props.drag && keyName == "drag") {
        file = e;
      } else {
        file = e.target.files[0];
        e.stopPropagation();
        e.preventDefault();
      }
      data.file = file;
      // 最多上传几个
      data.fileLists = props.maxCount
        ? [...data.fileLists, file].slice(Number(`-${props.maxCount}`))
        : [...data.fileLists, file];
      emitFn("model");
      // change 事件触发
      props.change({ file, status: "done" }, data.fileLists);
      // 初始化 - 上传前 为false, 终止上传
      const bol = props.beforeUpload(file);
      if (bol === false) {
        // 失败时
        data.fileLists = data.fileLists.slice(0, -1);
        props.change({ file, status: "error" }, data.fileLists);
        return false;
      }
      // 成功后
      props.change({ file, status: "succeed" }, data.fileLists);
      // 调用成功后 初始化value值
      nextTick(() => {
        fileRef.value && (fileRef.value.value = "");
        fileRef2.value && (fileRef2.value.value = "");
      });
    };
    // 用户 click 时
    const clickFile = (num = 1) => {
      if (num == 1) return fileRef.value.click();
      else return fileRef2.value.click();
    };
    // 用户 拖拽时
    const dropFile = () => {
      if (!dragRef.value) return false;
      dragRef.value.addEventListener("dragover", (e) => {
        e.preventDefault();
        data.draghover = true;
      });
      dragRef.value.addEventListener("dragleave", (e) => {
        e.preventDefault();
        data.draghover = false;
      });
      dragRef.value.addEventListener("drop", (e) => {
        e.preventDefault();
        data.draghover = false;
        uploadChange(e.dataTransfer.files[0], "drag");
      });
    };
    // 外部触发click
    expose({ clickFile });
    // 监听值的变化
    watchEffect(() => {
      data.fileLists = props.fileList;
    });
    onMounted(() => nextTick(dropFile));
    return {
      ...toRefs(data),
      fileRef,
      fileRef2,
      uploadChange,
      clickFile,
      dropFile,
      dragRef,
    };
  },
};
</script>

<style lang="scss" scoped>
.w-upload {
  width: auto;
  display: inline-block;
  .w-upload-file {
    cursor: pointer;
    input {
      display: none;
    }
  }
  .w-upload-drag {
    box-sizing: border-box;
    padding: 32px;
    cursor: pointer;
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    background: #fafafa;
    border: 1px dashed #d9d9d9;
    border-radius: 2px;
    cursor: pointer;
    transition: border-color 0.3s;
    input {
      display: none;
    }
    .w-upload-drag-title {
      margin: 0 0 4px;
      color: #000000d9;
      font-size: 16px;
    }
    .w-upload-drag-hint {
      color: #00000073;
      font-size: 14px;
    }
  }
  .w-upload-list {
    width: 100%;
  }
}
</style>
