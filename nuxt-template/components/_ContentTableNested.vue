<template>
  <ul>
    <template v-for="(section, index) of contentList" :key="index">
      <li v-if="!Array.isArray(section)" class="content-list-item">
        <a
          class="content-list-link"
          :href="'#' + section.id"
          :index="section.index.join('.')"
        >{{ section.title }}</a>
      </li>
      <ContentTableNested v-else :contentList="section"></ContentTableNested>
    </template>
  </ul>
</template>

<script>
export default {
  props: ["contentList"],
  name: "ContentTableNested",
};
</script>

<style>
</style>