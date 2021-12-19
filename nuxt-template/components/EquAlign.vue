<template>
  <EquBlock :tex="'\\begin{align}\n'+tex+'\n\\end{align}\n'"></EquBlock>
</template>

<script>
export default {
  props: ["tex"],
}
</script>

<style>
</style>