<template>
  <h1>Reference</h1>
  <div class="reference-list">
    <p
      v-for="(refInfo, index) of referenceInfo"
      :key="index"
      :id="'cite-def-' + refInfo.key"
      class="cite-def"
    >
      {{ index + 1 }}.
      <HoverTip v-for="(authorName,index) of refInfo.author" interactive="true">
        {{ authorName[2] + ",&nbsp;" }}
        <template v-slot:tip>
          {{ authorName[0] + " " + authorName[1] }}
          <a
            :href="'https://scholar.google.com/scholar?hl=en&q=' + authorName[0] + ' ' + authorName[1]"
            target="_blank"
          >(Google Ta!)</a>
        </template>
      </HoverTip>
      {{ refInfo.title + " " + refInfo.publish }}
      <HoverTip v-if="refInfo.url">
        <a :href="refInfo.url" target="_blank">
          <img class="inline-icon" src="../assets/icons/book-alt.svg" />
        </a>
        <template v-slot:tip>Origin Paper</template>
      </HoverTip>
      <HoverTip>
        <a :href="'https://scholar.google.com/scholar?hl=en&q=' + refInfo.title" target="_blank">
          <img class="inline-icon" src="../assets/icons/graduation-cap.svg" />
        </a>
        <template v-slot:tip>Google Scholar</template>
      </HoverTip>
    </p>
  </div>
</template>

<script>
import HoverTip from "./HoverTip.vue"
export default {
  inject: ["pageEnv"],
  components: {
    HoverTip: HoverTip
  },
  data: function () {
    return {
      citedKeys: this.pageEnv.citedKeys,
      bibDict: this.pageEnv.bibDict,
    };
  },
  methods: {
    getEntry(key) {
      let entryItem = this.bibDict[key];
      if (entryItem) return entryItem.entryTags;
      else return null;
    },
    getItemContent(key) {
      let entry = this.getEntry(key);
      if (entry)
        return [
          entry.title,
          entry.journal + " (" + entry.year + ")",
        ].join(", ");
      else return key;
    },
    getAuthorList(key) {
      let entry = this.getEntry(key);
    }
  },
  computed: {
    referenceInfo: function () {
      let refInfoList = []
      for (let key of this.citedKeys) {
        let entry = this.getEntry(key);
        if (!entry) continue
        let refInfo = {
          author: getAuthorList(entry.author),
          title: entry.title,
          publish: entry.journal + " (" + entry.year + ")",
          url: entry.url,
          key: key
        }
        refInfoList.push(refInfo)
      }
      return refInfoList
    }
  }
};
function getAuthorList(authorStr) {
  if (!authorStr) return ["Author error!"]
  let strSplit = authorStr.split("and");
  let authorList = [];
  for (let term of strSplit) {
    let last, first;
    let nameTuple = term.split(",");
    last = nameTuple[0]?.trim();
    first = nameTuple[1]?.trim();
    let abbrFirst = [];
    if (first) {
      for (let p of first.split("-")) {
        abbrFirst.push(p[0] + ".");
      }
    }
    authorList.push([first, last, abbrFirst.join("-") + " " + last]);
  }
  return authorList
}

function getDisplayName(authorStr) {
  let strSplit = authorStr.split("and");
  let authorList = [];
  for (let term of strSplit) {
    let last, first;
    let nameTuple = term.split(",");
    last = nameTuple[0];
    first = nameTuple[1];
    let abbrFirst = [];
    for (let p of first.trim().split("-")) {
      abbrFirst.push(p[0] + ".");
    }
    authorList.push(abbrFirst.join("-") + " " + last.trim());
  }
  return authorList.join(", ");
}
</script>

<style>
</style>