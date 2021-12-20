<template>
    <div>
        <HoverTip
            interactive="true"
            placement="bottom-end"
            theme="material"
            :options="{ arrow: false,
            offset: [0,2] }"
        >
            <span class="navbar-item">
                <slot name="title"></slot>
            </span>
            <template v-slot:tip>
                <slot name="content"></slot>
            </template>
        </HoverTip>
    </div>
</template>

<style scoped>
.navbar-item {
    display: block;
    color: white;
    text-align: center;
    padding: 0.8rem;
    text-decoration: none;
}
</style>