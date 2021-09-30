<template>
  <div :class="showBorder ? 'border' : ''" class="app-container">
    <!-- 消息框 -->
    <Message />
    <!--live2d-->
    <Live2d @click="showMainList" />
    <!--主面板-->
    <ToolList />
  </div>
</template> 

<script>
import Live2d from "./components/live2d";
import ToolList from "./components/toolList";
import Message from "./components/message";
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    // 显示主面板
    const showMainList = () => {
      store.commit("setOpacity", { main: 1 });
    };
    return {
      showMainList,
      showBorder: computed(() => store.state.config.showBorder),
    };
  },
  components: {
    Live2d,
    ToolList,
    Message,
  },
};
</script>

<style>
html {
  -webkit-app-region: drag;
}
body {
  background: #ffffff00;
}
.app-container {
  width: 100vw;
  height: 100vh;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.shake {
  animation-duration: 10s;
  animation-iteration-count: infinite;
  animation-name: shake-animate;
  animation-timing-function: ease-in-out;
}
.border {
  border: 1px solid lightsalmon;
  border-radius: 10px;
  box-shadow: 0 0 6px lightsalmon, 0 0 10px lightsalmon inset;
}
@keyframes shake-animate {
  20% {
    transform: translate(2px, 1.5px) rotate(1.5deg);
  }

  40% {
    transform: translate(-1.5px, -2px) rotate(-1.5deg);
  }

  60% {
    transform: translate(1.5px, 2px) rotate(1.5deg);
  }

  80% {
    transform: translate(-1.5px, -1.5px) rotate(-1.5deg);
  }

  0%,
  100% {
    transform: translate(0, 0) rotate(0);
  }
}
</style>
