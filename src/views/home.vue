<template>
  <div class="home">
    <w-row span="24">
      <w-button type="primary" @change="change(1)">
        <template #before>
          <span>left</span>
        </template>
        <span style="margin: 0 8px">按钮button</span>
        <template #after>
          <span>right</span>
        </template>
      </w-button>
      <w-button :disabled="true" @change="change(0)">按钮button2</w-button>
      <w-input money="true" :max="999999999999" v-model:value="inpuValue" before="￥" after="RMB" />{{ inpuValue }}
    </w-row>
    <hr />
    <w-row>
      <w-dropdown>
        <template #content>
          <w-menu @change="(num) => change('menu', num)">
            <w-menu-item v-for="num of 5" :key="num" :value="num">{{ num }}</w-menu-item>
          </w-menu>
        </template>
        <span>Click Dropdown</span>
      </w-dropdown>
      <div style="width:300px;margin-left:16px;">
        openKey: {{ openKey }} ============ checkKey: {{ checkKey }}
        <w-menu v-model:openKey="openKey" v-model:checkKey="checkKey" @change="(num) => change('menu', num)">
          <w-menu-sub-item :value="1">
            <template #title> #1下拉 </template>
            <w-menu-item v-for="num of 5" :key="num" :value="num">{{ num }}</w-menu-item>
          </w-menu-sub-item>
          <w-menu-sub-item :value="2">
            <template #title> #2下拉 </template>
            <w-menu-item v-for="num of [6, 7, 8, 9, 10]" :key="num" :value="num">{{ num }}</w-menu-item>
          </w-menu-sub-item>
          <w-menu-sub-item :value="3">
            <template #title> #3下拉 </template>
            <w-menu-item v-for="num of [11, 12, 13, 14, 15]" :key="num" :value="num">{{ num }}</w-menu-item>
          </w-menu-sub-item>
        </w-menu>
      </div>
    </w-row>
    <hr />
    <w-pagination :total="total" v-model:current="current" v-model:pageSize="pageSize" />
    <p>值变化: --- {{ current }} --- {{ pageSize }} --- {{ total }} ---</p>
    <hr />
    <w-row>
      <w-upload v-model:fileList="files" :change="(file, list) => change(file, list)">
        <w-button>click to Upload</w-button>
        <template #fileList="{ fileList, file }">
          <w-fileView :data="fileList" />
        </template>
      </w-upload>
      <w-upload :drag="true" v-model:fileList="files2" :change="(file, list) => change(file, list)">
        <template #fileList="{ fileList: fileListss, file }">
          <w-fileView :data="files2" />
        </template>
      </w-upload>
    </w-row>
    <hr />
    <w-row>
      <w-button @change="visibles = true">click to modal</w-button>
      <w-button @change="changeModal">hooks to modal</w-button>
      <w-modal v-model:visible="visibles" title="click to modal" @cancel="(sty) => change(sty)"
        @ok="(sty) => change(sty)">
        click modal
      </w-modal>
    </w-row>
    <hr />
  </div>

</template>

<script>
import { getCurrentInstance } from "vue";
export default {
  name: "HomeView",
  components: {},
  setup() {
    let { $hooks } = getCurrentInstance().proxy;
    return {
      changeModal() {
        $hooks.useModal({
          title: "useHook",
          content: "这是使用hook创建弹框",
          cancel() { },
          ok() {
            return false;
          },
          footer: false
        });
      },
    };
  },
  data() {
    return {
      carl: [1, 2, 3, 4, 5],
      total: 237,
      current: 19,
      pageSize: 10,
      files: [],
      files2: [],
      visibles: false,
      openKey: [2],
      checkKey: [8],
      inpuValue: 91123.1,

    };
  },
  methods: {
    change(val, num) {
      console.error(val, "emit 触发=====", num);
    },
  },
};
</script>
