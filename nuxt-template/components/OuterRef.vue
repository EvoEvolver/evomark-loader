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
  if (!reactiveEnv.value.globalEnv)
    return null

  for (let page in reactiveEnv.value.globalEnv.idNames) {
    if (reactiveEnv.value.globalEnv.idNames[page][props.label]) {
      return page
    }
  }
})

const idName = computed(() => {
  if (!reactiveEnv.value.globalEnv)
    return "Here"
  let pageDict
  if(props.page)
    pageDict = reactiveEnv.value.globalEnv.idNames[props.page]
  else
    pageDict = reactiveEnv.value.globalEnv.idNames[matchedPage.value]

  if (!pageDict)
    return "Here"
  let labelDict = pageDict[props.label]
  if (!labelDict)
    return "Here"
  // Display the title if there is one
  if(labelDict.title)
    return labelDict.tagName + ": " + labelDict.title
  else
    return labelDict.tagName + " " + labelDict.index.join(".") +"(other page)"

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