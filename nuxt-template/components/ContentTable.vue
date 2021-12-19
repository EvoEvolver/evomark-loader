<template>
  <div class="content-table">
    <content-table-nested :contentList="contentList"> </content-table-nested>
  </div>
</template>

<script>
import ContentTableNested from "./_ContentTableNested.vue";
export default {
  inject: ["pageEnv"],
  components: {
    ContentTableNested: ContentTableNested,
  },
  computed: {
    contentList: function () {
      let contentList = [];
      let idNames = this.pageEnv.idNames;
      for (let id in idNames) {
        if (idNames[id].tagName != "Section") continue;
        const index = idNames[id].index;
        contentList.push({
          index: index,
          id: id,
          title: idNames[id]["title"],
        });
      }
      contentList.sort((a, b) => {
        let maxLen = Math.min(a.index.length, b.index.length);
        for (let i = 0; i < maxLen; i++) {
          if (a.index[i] < b.index[i]) return -1;
          if (a.index[i] > b.index[i]) return 1;
        }
        if (a.index.length < b.index.length) return -1;
        if (a.index.length > b.index.length) return 1;
        return 0;
      });

      let contentListNested = [];
      let listPointerStack = [contentListNested];
      let listAdding = contentListNested;
      let lastLevel = 1;

      for (let section of contentList) {
        let thisLevel = section.index.length;
        for (let diff = thisLevel - lastLevel; diff > 0; diff--) {
          let newListAdding = [];
          listAdding.push(newListAdding);
          listPointerStack.push(newListAdding);
          listAdding = newListAdding;
        }
        for (let diff = lastLevel - thisLevel; diff > 0; diff--) {
          listPointerStack.pop();
          listAdding = listPointerStack[listPointerStack.length - 1];
        }
        listAdding.push(section);
        lastLevel = thisLevel;
      }

      return contentListNested;
    },
  },
};
</script>

<style>
</style>