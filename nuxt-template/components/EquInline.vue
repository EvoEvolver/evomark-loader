<template>
  <span ref="math"></span>
</template>

<script>

export default {
  inject: ["katexAPI", "pageEnv"],
  props: ["tex"],
  methods: {
    typeset() {
      if (this.tex)
        this.katexAPI.render(this.tex, this.$refs.math, {
          throwOnError: false,
          macros: this.pageEnv.mathMacros
        }
        );
    }
  },
  mounted() {
    this.typeset()
  },
  watch: {
    tex: function (val) {
      this.typeset()
    },
  },
};
</script>

<style>
</style>