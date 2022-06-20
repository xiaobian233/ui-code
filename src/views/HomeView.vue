<template>
  <div class="home">
    <w-row span="24" @click="change(9)">
      <w-button type="primary" @change="change(1)">
        <template #before>
          <span>这是左边slot</span>
        </template>
        <span style=" margin: 0 20px;">按钮button</span>
        <template #after>
          <span>这是右边slot</span>
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
    <p>值变化:  --- {{ current  }} --- {{ pageSize }} --- {{ total }} ---</p>
    <br>
    <hr>
    <br>
  </div>
</template>

<script>
// @ is an alias to /src
import button from '@/components/button/index.vue'
import row from '@/components/row/index.vue'
import dropdown from '@/components/dropdown/index.vue'
import menu from '@/components/menu/index.vue'
import menuItem from '@/components/menuItem/index.vue'
import pagination from '@/components/pagination/index.vue'
export default {
  name: 'HomeView',
  components: {
    [button.name]: button,
    [row.name]: row,
    [dropdown.name]: dropdown,
    [menu.name]: menu,
    [menuItem.name]: menuItem,
    [pagination.name]: pagination,
  },
  data() {
    return {
      carl: [1, 2, 3, 4, 5],
      total: 237,
      current: 19,
      pageSize: 10
    }
  },
  methods: {
    change(val, num) {
      console.error(val, 'emit 触发=====', num)
    }
  },
}
</script>
