<template>
  <div
    class="shake message"
    :style="{ opacity: msg.opacity, 'z-index': msg.opacity == 0 ? -1 : 3 }"
  >
    <p>{{ msg.content }}</p>
  </div>
</template>
<script>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    onMounted(() => {
      setInterval(() => {
        store.dispatch("getMsg");
      }, 50000);
    });
    return {
      msg: computed(() => store.state.message),
    };
  },
};
</script>

<style scoped>
.message {
  padding: 10px 10px;
  width: 280px;
  right: 20px;
  top: 50%;
  transform: translate(-50%, 0);
  height: auto;
  text-align: center;
  border: 1px solid rgba(255, 137, 255, 0.4);
  color: #505050;
  border-radius: 12px;
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 3px 15px 2px rgba(255, 137, 255, 0.4),
    0 3px 15px 2px rgba(255, 137, 255, 0.4) inset;
  text-overflow: ellipsis;
  position: absolute;
  transition: opacity 0.5s;
  z-index: 2;
  -webkit-app-region: no-drag;
}
p {
  padding: 0 0;
  margin: 0 0;
}
</style>
