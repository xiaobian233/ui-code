<template>
  <div class="home">
    <w-row span="24" @click="change(9)">
      <w-button type="primary" @change="change(1)">s
        <template #before>
          <span>left</span>
        </template>
        <span style=" margin: 0 8px;">按钮button</span>
        <template #after>
          <span>right</span>
        </template>
      </w-button>
      <w-button :disabled="true" @change="change(0)">按钮button2</w-button>
    </w-row>
    <br>
    <hr>
    <br>
    <w-dropdown>
      <template #content>
        <w-menu @change="num=>change('menu',num)">
          <w-menu-item v-for="num  of 5" :key="num" :value="num">{{ num }}</w-menu-item>
        </w-menu>
      </template>
      <span>Click Me</span>
    </w-dropdown>
    <br>
    <hr>
    <br>
    <w-pagination :total="total" v-model:current="current" v-model:pageSize="pageSize" />
    <p>值变化: --- {{ current  }} --- {{ pageSize }} --- {{ total }} ---</p>
    <br>
    <hr>
    <br>
    <w-upload v-model:fileList="files" :change="(file,list)=>change(file,list)">
      <w-button>click to Upload</w-button>
      <template #fileList="{fileList}">
        <div v-for="v,i in fileList" :key="i">
          {{ v.name }}
        </div>
      </template>
    </w-upload>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'HomeView',
  components: {
  },
  data() {
    return {
      carl: [1, 2, 3, 4, 5],
      total: 237,
      current: 19,
      pageSize: 10,
      files: []
    }
  },
  methods: {
    change(val, num) {
      console.error(val, 'emit 触发=====', num)
    }
  },
}
</script>
