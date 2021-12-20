<template>
    <div v-if="pageInfoList" class="nav-content-table">
        <ul>
            <li v-for="(item, key) of pageInfoList" :key="key">
                <a :href="'/' + mapUrl(item[0])">{{ item[1].title || item[0] }}</a>
            </li>
        </ul>
    </div>
</template>
<script setup>
const props = defineProps(["pageInfoList"])
function mapUrl(url){
    if(url=="index")
        return ""
    else
        return url
}
</script>
<style scoped>
.nav-content-table a {
    color: white;
    font-size: 1.1rem;
}
.nav-content-table li {
    margin: 0.3rem;
}
</style>