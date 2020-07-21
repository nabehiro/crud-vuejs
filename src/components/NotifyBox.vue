<template>
    <div class="notifyBox">
        <ul>
            <li v-for="value in values" :key="value">
                {{ value }}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },

    props: {
        values: {
            type: Array
        }
    }
}
</script>