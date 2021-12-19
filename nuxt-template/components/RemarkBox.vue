<template>
  <div class="remark-box" :name="name" :title="title" :id="id" :index="index">
    <span v-if="title" class="remark-title">{{ title }}</span>
    <p>
      <slot />
    </p>
  </div>
</template>

<script>
export default {
  props: ["title","id","name"],
};
</script>

<style>
</style>