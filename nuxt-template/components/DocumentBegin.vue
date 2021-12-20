<template>
  <Html>
    <Head>
      <Title>{{ (pageEnv.title || pageEnv.projectTitle ) || "Evomark Project" }}</Title>
    </Head>
      <NavBar></NavBar>
  </Html>
</template>

<script setup>
import { inject } from 'vue'
const pageEnv = inject('pageEnv')

const { data: globalEnv } = await useAsyncData('globalEnv', () => $fetch('/page_assets/globalEnv.json'), { server: false })
const reactiveEnv = inject("reactiveEnv")
reactiveEnv.value.globalEnv = globalEnv

</script>

<style>
</style>