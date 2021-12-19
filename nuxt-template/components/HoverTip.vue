<template>
  <span ref="shower" @mouseover="loadTip()" @click="loadTip()">
    <slot></slot>
  </span>
  <span style="display: none">
    <span ref="tooltip">
      <slot name="tip"></slot>
    </span>
  </span>
</template>

<script>
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css'; // optional for styling
import 'tippy.js/themes/light.css';
import 'tippy.js/animations/shift-away.css';

export default {
  data(){
    return {
      needLoad: true
    }
  },
  props: {
    interactive:{
      default:false
    }
  },
  mounted() {

  },
  watch: {
  },
  methods: {
    loadTip() {
      if(!this.needLoad) return
      let tippyOption = {
        content: this.$refs.tooltip.cloneNode(true),
        theme: 'light',
        animation: 'shift-away',
      }
      if(this.interactive){
        tippyOption.interactive = true
        tippyOption.appendTo = document.body
      }
      tippy(this.$refs.shower, tippyOption)
      this.needLoad = false
    }
  }
};
</script>

<style lang="sass" scoped>

</style>