<template>
  <div
    class="list-container shake-animate no-drag"
    :style="{ opacity: listStyle.opacity }"
    @mouseleave="listFade"
  >
    <div>
      <div @click="change">
        <ToolItem title="切换" />
      </div>
      <div @click="settings">
        <ToolItem title="设置" />
      </div>
      <div @click="about">
        <ToolItem title="工具">
          <setAudio />
        </ToolItem>
      </div>
      <div @click="quit">
        <ToolItem title="退出" />
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive } from 'vue'
import ToolItem from './toolItem'
import emitter from '../utils/emitter'
import setAudio from '../components/setAudio'
const { ipcRenderer } = window.require('electron')
export default {
  setup() {
    const listStyle = reactive({
      opacity: 0,
    })
    const listFade = () => {
      listStyle.opacity = 0
    }
    const quit = () => {
      ipcRenderer.send('win-close')
    }
    onMounted(() => {
      emitter.on('setOpacity', () => {
        listStyle.opacity = 1
      })
    })
    return {
      listStyle,
      listFade,
      quit,
    }
  },
  components: {
    ToolItem,
    setAudio,
  },
}
</script>

<style scoped>
.list-container {
  position: relative;
  background: white;
  border: 1px solid gainsboro;
  border-radius: 6px;
  overflow: hidden;
  transition: opacity 1s;
}
</style>
