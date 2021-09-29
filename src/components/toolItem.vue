<template>
  <div class="item-container">{{ props.title }}</div>
</template>

<script>
export default {
  props:{
    title: String
  },
  setup(props) {
    return {
      props,
    };
  },
};
</script>

<style scoped>
.item-container {
  font-size: 14px;
  padding: 4px 8px;
  color: #505050;
}
.item-container:hover {
  background: #2db7f5;
  cursor: pointer;
}
</style>
