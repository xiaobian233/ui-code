<template>
  <div class="w-pagination">
    <div class="w-pagination-title" v-html="getTotalTitle"></div>
    <div class="w-pagination-button">
      <span @click="clickTop(--pageCurrent)" class="w-pagination-item">&lt;</span>
      <span v-if="pageCurrent >=constNumber && pageTotal !=constNumber" @click="clickTop(1)" class="w-pagination-item">1</span>
      <span v-if="pageCurrent >= constNumber && pageTotal != constNumber" @click="clickTop(pageCurrent-constNumber)" class="w-pagination-item">•••</span>
      <template v-for="index in pageTotal" :key="index">
        <span @click="clickTop(index)" :class="[pageCurrent === index ? 'w-pagination-item-active':'']" v-if="getItem(index)" class="w-pagination-item">{{index}}</span>
      </template>
      <span v-if="pageCurrent+constNumber <= pageTotal" @click="clickTop(pageCurrent+constNumber)" class="w-pagination-item">•••</span>
      <span v-if="pageCurrent+constNumber <= pageTotal" @click="clickTop(pageTotal)" class="w-pagination-item">{{ pageTotal }}</span>
      <span @click="clickTop(++pageCurrent)" class="w-pagination-item">></span>
    </div>
    <div class="w-pagination-select">
      <w-dropdown :disabled="disabled" trigger="hover">
        <template #content>
          <w-menu @change="num=>menuChange(num)">
            <w-menu-item :disabled="disabled" v-for="page  of wPageSizeOptions" :key="page" :value="page">{{ page }}条</w-menu-item>
          </w-menu>
        </template>
        <w-button type="primary" :disabled="disabled" style="width:120px">{{ pageSize }}条/页</w-button>
      </w-dropdown>
    </div>
  </div>
</template>

<script>
import { computed, reactive, toRefs, watch } from 'vue'
import dropdown from '@/components/dropdown/index.vue'
import menu from '@/components/menu/index.vue'
import button from '@/components/button/index.vue'
import menuItem from '@/components/menuItem/index.vue'
export default {
  components: { [dropdown.name]: dropdown, [menu.name]: menu, [menuItem.name]: menuItem, [button.name]: button, },
  name: 'w-pagination',
  props: {
    total: { type: [String, Number], default: 100 },
    current: { type: [String, Number], default: 1 },
    pageSize: { type: [String, Number], default: 10 },
    pageSizeOptions: { type: Array, default: () => [10, 20, 30, 40, 50] },
    disabled: { type: [String, Boolean], default: false },
    totalTitle: { type: [String, Function], default: '' }
  },
  setup(props, { emit }) {
    const data = reactive({ pages: [], pageTotal: 0, pageQuota: 6, pagMaxTotal: 0, pageSizeOptions: [], constNumber: 5 })
    const init = (obj) => {
      Object.assign(data, { pageCurrent: obj.current, pageSize: obj.pageSize, total: obj.total, wPageSizeOptions: obj.pageSizeOptions })
      data.pageTotal = Math.ceil(data.total / data.pageSize);
      data.pagMaxTotal = data.pageTotal - data.constNumber
    }
    const getItem = (index) => {
      let rels = ''
      if (data.pageCurrent >= 1 && data.pageCurrent < 4) {
        rels = index < data.pageQuota
      }
      else if (data.pageCurrent == 4 && (data.pageCurrent + 2) <= data.pagMaxTotal) {
        rels = index < data.pageQuota + 1
      }
      else if ((data.pageCurrent > 4 && (data.pageCurrent + 2) <= data.pagMaxTotal) || (data.pageCurrent + 2 > data.pagMaxTotal && data.pageCurrent <= data.pagMaxTotal)) {
        rels = index >= data.pageCurrent - 2 && index < data.pageCurrent + 2
      }
      else if (data.pageCurrent + 2 > data.pagMaxTotal) {
        rels = index > data.pagMaxTotal
      }
      return rels
    }

    const clickTop = index => {
      if (index < 1) index = 1
      if (index >= data.pageTotal) index = data.pageTotal
      data.pageCurrent = index;
      emitFn('pageCurrent')
    }

    const menuChange = size => {
      init({ ...props, pageSize: size, current: 1 })
      emitFn('pageCurrent')
      emitFn('pageSize')
    }

    const emitFn = (key) => {
      const em = () => emit('change', {
        pageSize: data.pageSize,
        pageCurrent: data.pageCurrent,
        total: data.total,
      })
      switch (key) {
        case 'pageCurrent':
          emit('update:current', data.pageCurrent)
          break;
        case 'pageSize':
          emit('update:pageSize', data.pageSize)
          break;
        default:
          em()
          break
      }
      em()
    }
    watch(() => props, () => init(props), { deep: true, immediate: true })
    const getTotalTitle = computed(() => {
      let res = `总共为: ${props.total} 条数据`
      typeof props.totalTitle === 'string' ? res = props.totalTitle : null
      typeof props.totalTitle === 'function' ? res = props.totalTitle() : null
      return res
    })
    return { ...toRefs(data), getItem, clickTop, menuChange, getTotalTitle }
  }
}
</script>

<style lang="scss" scoped>
.w-pagination {
  display: flex;
  justify-content: start;
  align-items: center;
}
.w-pagination-item {
  display: inline-block;
  min-width: 32px;
  height: 32px;
  margin-right: 8px;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
    Helvetica Neue, Arial, Noto Sans, sans-serif, 'Apple Color Emoji',
    'Segoe UI Emoji', Segoe UI Symbol, 'Noto Color Emoji';
  line-height: 30px;
  text-align: center;
  vertical-align: middle;
  list-style: none;
  background-color: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  outline: 0;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}
.w-pagination-item-active,
.w-pagination-item:hover {
  font-weight: 500;
  background: #fff;
  border-color: $wang-primary-color;
  color: $wang-primary-color;
}
.w-pagination-title {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: #000000d9;
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5715;
  list-style: none;
  font-feature-settings: 'tnum';
  margin-right: 8px;
}
</style>