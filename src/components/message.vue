<template>
  <div class="message shake-animate" :style="{'opacity':$store.state.fade}">
    <p>{{$store.state.msg}}</p>
  </div>
</template>

<script>
import Vue from 'vue'
import { initMsg } from '../assets/js/message'
export default {
  data() {
    return {
      time: '', // 定时器
      fade: 0, // 消息框的opacity
      msg: '' // 互动内容
    }
  },
  methods: {
    // 获得互动内容并显示消息框
    getMsg() {
      // v1.hitokoto.cn这网址会随机返回一条互动 不知道是谁的反正用就vans了
      Vue.axios.get('https://v1.hitokoto.cn/').then(res => {
        this.msg = res.data.hitokoto
        this.fade = 1 // 消息框opacity=1
      })
    },
    // 移除消息框
    removeMsg() {
      setTimeout(() => {
        this.fade = 0 // 消息框opacity=0
      }, 5000)
    }
  },
  async mounted() {
    // 初始化消息
    this.$store.commit('setMsg', initMsg)
    this.$store.commit('setFade', 1)
    this.$store.dispatch('removeMsg')

    // 定时器存在就删了 防止叠加
    if (this.time) {
      this.time = ''
    }

    // 固定时间获取互动内容
    this.time = setInterval(async () => {
      this.$store.dispatch('getMsg')
      this.$store.dispatch('removeMsg')
    }, 30000)
  }
}
</script>

<style scoped>
.message {
  width: 280px;
  height: auto;
  text-align: center;
  border: 1px solid rgba(255, 137, 255, 0.4);
  border-radius: 12px;
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 3px 15px 2px rgba(255, 137, 255, 0.4),
    0 3px 15px 2px rgba(255, 137, 255, 0.4) inset;
  font-size: 13px;
  font-weight: 400;
  text-overflow: ellipsis;
  overflow: hidden;
  position: absolute;
  top: 20%;
  left: 10px;
  transform: translate(-50%, -50%);
  transition: opacity 1s;
  z-index: 2;
  -webkit-app-region: no-drag;
}
</style>
