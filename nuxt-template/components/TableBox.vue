<template>
  <figure :title="title" :id="id" :index="index">
    <table v-if="dict">
      <thead>
        <th
          v-for="(key, index) in dict.keys"
          :key="index"
          :style="'text-align:' + align[key]"
        >
          {{ key }}
        </th>
      </thead>
      <tbody>
        <tr v-for="(item, index) in dict.items" :key="index">
          <td
            v-for="(key, index) in dict.keys"
            :key="index"
            :style="'text-align:' + align[key]"
          >
            {{ item[key] }}
          </td>
        </tr>
      </tbody>
    </table>
    <figcaption :index="index" :title="title" class="caption" holder="Table">
      <span v-if="title" class="caption-title">{{ title }}</span>
      <slot></slot>
    </figcaption>
  </figure>
</template>

<script>
export default {
  inject: ["pageEnv"],
  props: ["contentId", "src", "id", "index", "title"],
  data() {
    return {
      dict: this.pageEnv.tableRecord[this.contentId],
    };
  },
  mounted() {},
  computed: {
    align() {
      let align = {};
      for (let key of this.dict.keys) {
        align[key] = this.dict.align[key] || "center";
      }
      return align;
    },
  },
};
</script>

<style lang="sass" scoped>
.left
    text-align: left
</style>