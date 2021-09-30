<template>
  <div class="live2d-container">
    <div v-show="type == 'moc'" id="moc-ctn"></div>
    <div v-show="type == 'moc3'" id="moc3"></div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const type = computed(() => store.state.live2d.type);
    return {
      type,
    };
  },
};
</script>

<style scoped>
.live2d-container {
  position: absolute;
  width: 90%;
  height: 90%;
  overflow: hidden;
  bottom: 0px;
  left: 50%;
  transform: translate(-50%, 0);
  user-select: none;
  z-index: 1;
  -webkit-app-region: no-drag;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
