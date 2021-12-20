<template>
  <Html>
    <Head>
      <Link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/katex@0.13.18/dist/katex.min.css"
        integrity="sha384-zTROYFVGOfTw7JV7KUu8udsvW2fx4lWOsCEDqhBreBwlHI4ioVRtmIvEThzJHGET"
        crossorigin="anonymous"
      />
    </Head>
    <div><slot></slot></div>
  </Html>
</template>

<script>
export default {
  props: ["name"]
};
</script>

<style lang="sass" src="../assets/style/evomark.sass">
</style>