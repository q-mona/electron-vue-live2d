<template>
  <div class="item-container">{{title}}</div>
</template>

<script>
export default {
  props: ['title']
}
</script>

<style scoped>
.item-container {
  font-size: 14px;
  padding: 4px 8px;
  -webkit-app-region: no-drag;
}
.item-container:hover {
  background: lightblue;
  cursor: pointer;
}
</style>
