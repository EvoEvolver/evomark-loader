<template>
  <a :href="pageURL + '#' + label">
    <slot>{{ idName }}</slot>
  </a>
</template>

<script setup>
const props = defineProps({
  page: String,
  label: String
})
import { inject, computed } from "vue"
const reactiveEnv = inject('reactiveEnv')
const matchedPage = computed(() => {
  if (props.page)
    return props.page
  if (!reactiveEnv.value.outerLinkInfo)
    return null

  for (let page in reactiveEnv.value.outerLinkInfo) {
    if (reactiveEnv.value.outerLinkInfo[page].idNames[props.label]) {
      return page
    }
  }
})

const idName = computed(() => {
  if (!reactiveEnv.value.outerLinkInfo)
    return "Here"
  let pageDict
  if(props.page)
    pageDict = reactiveEnv.value.outerLinkInfo[props.page]
  else
    pageDict = reactiveEnv.value.outerLinkInfo[matchedPage.value]

  if (!pageDict)
    return "Here"
  let labelDict = pageDict.idNames[props.label]
  if (!labelDict)
    return "Here"
  return labelDict.tagName + ": " + labelDict.title
})

const pageURL = computed(()=>{
    let URL = props.page || matchedPage.value
    if(URL=="index")
      URL = "/"
    return URL
})
</script>

<style>
</style>