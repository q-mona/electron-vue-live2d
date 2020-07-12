<template>
  <div id="landlord" :class="$store.state.showBorder?'border':''">
    <canvas
      id="live2d"
      :width="$store.state.width"
      :height="$store.state.height"
      @click="mouseClick"
    ></canvas>
  </div>
</template>

<script>
import { clickMsg, initMsg } from '../assets/js/message'
import { live2dPath } from '../assets/js/live2dPath'

const Store = window.require('electron-store')
const store = new Store()
export default {
  data() {
    return {}
  },
  methods: {
    // 鼠标点击live2d
    mouseClick() {
      // 设置随机一条互动信息
      this.$store.commit(
        'setMsg',
        clickMsg[Math.round(Math.random() * (clickMsg.length - 1))]
      )
      this.$store.commit('setFade', 1)
      this.$store.dispatch('removeMsg')
    },
    // 从缓存中设置vuex
    perference(key, func) {
      const val = store.get(key)
      if (val) {
        this.$store.commit(func, val)
      }
    }
  },
  mounted() {
    // 从缓存中初始化程序
    // 获取导入的live2d模型
    const src1 = store.get('live2dSource')
    const src2 = live2dPath
    let sum = []
    // 获取总的live2d模型
    if (src1) {
      src2.push(...src1)
      sum = src2
    } else {
      sum = src2
    }
    this.$store.commit('setSum', sum)
    this.perference('live2dPath', 'setPath')
    this.perference('showBorder', 'setShowBorder')
    this.perference('autoStart', 'setAutoStart')
    window.loadlive2d('live2d', this.$store.state.path)

    // 初始化开场白
    this.$store.commit('setMsg', initMsg)
    this.$store.commit('setFade', 1)
    this.$store.dispatch('removeMsg')

    // 固定时间获取互动内容
    setInterval(() => {
      this.$store.dispatch('getMsg')
    }, 30000)
  }
}
</script>

<style scoped>
#landlord {
  position: relative;
  user-select: none;
  width: 280px;
  z-index: 1;
  font-size: 0;
  -webkit-app-region: no-drag;
}
</style>
