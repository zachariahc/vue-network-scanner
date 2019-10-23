<template>
    <div>
        <h2 class="default-header">{{defaultMessage}}</h2>
    </div>
</template>

<script>
    export default {
        props: {
            defaultMessage: {
                type: String
            }
        }
    }
</script>

<style scoped>
.default-header {
    color: white;
}
</style>