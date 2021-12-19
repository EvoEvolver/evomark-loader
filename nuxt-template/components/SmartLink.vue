<template>
  <span @mouseenter="loadTip()" @click="loadTip()" :showTip="hasContent">
  <a ref="shower" class="preview-box" @click="goToHash(target)">
<slot></slot>
  </a>
  </span>
</template>

<script>
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css'; // optional for styling
import 'tippy.js/themes/light.css';
import 'tippy.js/animations/shift-away.css';
export default {
  data() {
    return {
      needLoad: true,
      hasContent: false,
    };
  },
  props: ["target"],
  components: {
  },
  methods: {
    
    loadTip() {
      if (!this.needLoad) {
        return;
      }
      let hasContent = false;
      let needLoad = false;
      let targetList = document.createElement("div")//this.$refs.targetList;
      //console.log(targetList)
      targetList.innerHTML = "";
      for (let id of this.target) {
        let targetNode = document.getElementById(id);
        if (!targetNode) {
          needLoad = true;
          continue;
        }
        let cloneNode = targetNode.cloneNode(true)
        cloneNode.setAttribute("id", null)
        targetList.appendChild(cloneNode);
        hasContent = true;
      }
      this.needLoad = needLoad;
      this.hasContent = hasContent;
      tippy(this.$refs.shower,{
        content: targetList,
        theme: 'light',
        animation: 'shift-away',
        interactive: true,
        appendTo: document.body
      })

    },
    goToHash(target) {
      let targetNode = document.getElementById(target);
      if (targetNode) {
        targetNode.scrollIntoView();
      }
    }
  },
};
</script>

<style>
</style>