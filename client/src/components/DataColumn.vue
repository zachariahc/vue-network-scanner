<template>
  <div id="list-container">
    <p>{{ list }}</p>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: String
    }
  },
};
</script>

<style scoped>

</style>
