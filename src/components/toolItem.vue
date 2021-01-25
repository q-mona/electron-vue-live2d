<template>
  <div class="item-container">
    {{ title }}
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: ['title'],
  methods: {},
}
</script>

<style scoped>
.item-container {
  position: relative;
  font-size: 14px;
  padding: 4px 8px;
}
.item-container:hover {
  background: rgba(153, 243, 255, 0.8);
  cursor: pointer;
}
</style>
