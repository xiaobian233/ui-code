<template>
  <div class="w-dropdown" v-checkout:[trigger]="checkOut" @click="clickOrHover('click')"
    @mouseenter="clickOrHover('hover')">
    <div class="w-dropdown-title" ref="wDropdownTitle">
      <slot />
    </div>
    <div ref="dropdownContent" class="w-dropdown-content"
      :class="isCont ? 'animate__fadeInDown' : 'animate__animated animate__fadeOut'" :style="styleContent"
      v-if="isCont">
      <slot name="content" />
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, computed, ref } from "@vue/reactivity";
export default {
  name: "w-dropdown",
  props: {
    trigger: { type: String, default: "click" },
    disabled: { type: [String, Boolean], default: false },
  },
  provide() {
    return {
      _drop: this
    }
  },
  setup(props, { expose }) {
    const wDropdownTitle = ref(null);
    const data = reactive({
      isCont: false,
    });
    const clicks = () => {
      data.isCont = true;
    };
    const hovers = () => {
      data.isCont = true;
    };
    const clickOrHover = (key) => {
      if (key !== props.trigger) return false;
      let obj = {
        hover: hovers,
        click: clicks,
      };
      obj[props.trigger]();
    };
    const styleContent = computed(() => {
      if (!wDropdownTitle.value) return 0;
      return {
        top: wDropdownTitle.value.offsetHeight + "px",
        width: wDropdownTitle.value.offsetWidth + "px",
      };
    });
    const close = () => (data.isCont = false);
    const dropdownContent = ref(null);
    expose({ "dropdown-close": close });
    return {
      ...toRefs(data),
      clickOrHover,
      styleContent,
      wDropdownTitle,
      checkOut: close,
      dropdownContent,
    };
  },
};
</script>

<style lang="scss" scoped>
.w-dropdown {
  position: relative;
}

.w-dropdown-content::before {
  content: "";
  display: inline-block;
  width: 100%;
  height: 4px;
  position: absolute;
  top: -4px;
  left: 0;
  background: transparent;
}

.w-dropdown-content {
  z-index: 99;
  margin-top: 4px;
  position: absolute;
  background-color: #fff;
  background-clip: padding-box;
  border-radius: 2px;
  box-shadow: 0 3px 6px -4px #0000001f, 0 6px 16px #00000014, 0 9px 28px 8px #0000000d;
  box-sizing: border-box;
}

.w-dropdown-title {
  display: inline-block;
  width: auto;
  cursor: pointer;
  color: $wang-primary-color;
}

.animate__fadeInDown {
  animation-name: fadeInDown;
  animation-duration: 1s;
  animation-duration: var(--animate-duration);
  animation-fill-mode: both;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translate3d(0, -20px, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}
</style>
