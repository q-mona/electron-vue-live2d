<template>
  <div class="list-container shake-animate">
    <div>
      <div @click="change">
        <ToolItem title="切换" />
      </div>
      <div @click="settings">
        <ToolItem title="设置" />
      </div>
      <div @click="about">
        <ToolItem title="关于" />
      </div>
      <div @click="quit">
        <ToolItem title="退出"></ToolItem>
      </div>
    </div>
  </div>
</template>

<script>
import ToolItem from './toolItem'
import { about } from '../assets/js/message'
const { ipcRenderer } = window.require('electron')
export default {
  data() {
    return {
      num: 0
    }
  },
  methods: {
    // 更换live2d
    change() {
      this.$store.commit('setLive2dList', true)
    },
    // 显示设置界面
    settings() {
      this.$store.commit('setSettings', true)
    },
    about() {
      // 设置随机一条互动信息
      this.$store.commit(
        'setMsg',
        about[Math.round(Math.random() * (about.length - 1))]
      )
      this.$store.commit('setFade', 1)
      this.$store.dispatch('removeMsg')
    },
    // 退出
    quit() {
      ipcRenderer.send('win-close')
    }
  },
  components: {
    ToolItem
  }
}
</script>

<style scoped>
.list-container {
  position: absolute;
  top: 50%;
  right: 120px;
  background: white;
  border: 1px solid gainsboro;
  border-radius: 6px;
  overflow: hidden;
  -webkit-app-region: no-drag;
  z-index: 2;
}
</style>
