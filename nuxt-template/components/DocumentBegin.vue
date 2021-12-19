<template>
  <Html>
    <Head>
      <Title>{{ pageEnv.title || "Evomark Project" }}</Title>
    </Head>
  </Html>
</template>

<script setup>
import { inject } from 'vue'
const pageEnv = inject('pageEnv')
const { data: outerLinkInfo } = await useAsyncData('outerLinkInfo', () => $fetch('/compileEnv.json'), { server: false })
const reactiveEnv = inject("reactiveEnv")
reactiveEnv.value.outerLinkInfo = outerLinkInfo
</script>

<style>
</style>