<template>
    <nav>
        <div id="navbar">
            <span class="navbar-left">
                <span>
                    <NavBarDropdown>
                        <template v-slot:title>
                            <img class="navicon" src="assets/icons/chapters-svgrepo-com.svg" />
                        </template>
                        <template v-slot:content>
                            <NavBarContentTable :pageInfoList="pageInfoList"></NavBarContentTable>
                        </template>
                    </NavBarDropdown>
                </span>

                <span class="navbar-item">
                    <a href="/">
                        <img class="navicon" src="assets/icons/home-svgrepo-com.svg" />
                    </a>
                </span>

                <span class="navbar-title">{{ pageEnv.title }}</span>
            </span>

            <span class="navbar-right">
                <span v-if="pageEnv.chatUrl" class="navbar-item">
                    <a :href="pageEnv.chatUrl" target="_blank">
                        <img
                            class="navicon"
                            src="assets/icons/chat-svgrepo-com.svg"
                            style="fill: white;"
                        />
                    </a>
                </span>
                <span v-if="pageEnv.gitRepoUrl" class="navbar-item">
                    <a :href="pageEnv.gitRepoUrl" target="_blank">
                        <img
                            class="navicon"
                            src="assets/icons/git-icon-white.svg"
                            style="fill: white;"
                        />
                    </a>
                </span>
            </span>
        </div>
        <div style="padding: 1.5rem;"></div>
    </nav>
</template>

<script setup>
import { inject, computed, onMounted } from "vue"

const pageEnv = inject('pageEnv')
const reactiveEnv = inject('reactiveEnv')

const pageInfoList = computed(() => {
    if (!reactiveEnv.value.globalEnv)
        return null
    let pageInfo = reactiveEnv.value.globalEnv.pageInfo
    let pageKeyList = pageEnv.linearize
    if (!pageKeyList) {
        pageKeyList = Object.keys(pageInfo)
    }
    let pageList = []
    for (let key of pageKeyList) {
        pageList.push([key, pageInfo[key]])
    }
    return pageList
})
onMounted(() => {
    var prevScrollpos = window.pageYOffset;
    window.onscroll = function () {
        var currentScrollPos = window.pageYOffset;
        if (prevScrollpos > currentScrollPos) {
            document.getElementById("navbar").style.top = "0";
        } else {
            document.getElementById("navbar").style.top = "-60px";
        }
        prevScrollpos = currentScrollPos;
    }
})

</script>

<style scoped>
#navbar {
    background-color: rgb(37, 37, 37); /* Black background color */
    position: fixed; /* Make it stick/fixed */
    top: 0; /* Stay on top */
    width: 100%; /* Full width */
    transition: top 0.3s; /* Transition effect when sliding down (and up) */
}

/* Style the navbar links */
.navbar-item {
    display: block;
    color: white;
    text-align: center;
    padding: 0.8rem;
    text-decoration: none;
}

.navbar-left span {
    float: left;
}

.navbar-right span {
    float: right;
}
.navicon {
    display: inline;
    height: 1.5rem;
    pedding: 0px;
}
.navbar-item:hover {
    background-color: rgb(167, 167, 167);
    color: black;
}
.navbar-title {
    display: block;
    color: white;
    text-align: center;
    padding: 0.8rem;
    text-decoration: none;
}
@media (max-width: 600px) {
    .navbar-title {
        display: none;
    }
}
</style>