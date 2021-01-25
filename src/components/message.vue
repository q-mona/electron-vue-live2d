<template>
  <div class="message shake-animate" :style="{ opacity: msgStyle.opacity }">
    <p>{{ msgStyle.message }}</p>
  </div>
</template>

<script>
import emitter from '../utils/emitter'
import axios from 'axios'
import { onMounted, reactive } from 'vue'
import myEvent from '../utils/myEvent'

export default {
  setup() {
    let time = '',
      clock = '' // 定时器
    const msgStyle = reactive({
      message: 'Hello World',
      opacity: 1, // 动态设置css样式
    })
    // 显示消息
    const setMsgShow = () => {
      msgStyle.opacity = 1
    }
    // 隐藏消息
    const setMsgFade = () => {
      clearInterval(time)
      time = setTimeout(() => {
        msgStyle.opacity = 0
      }, 5000)
    }
    // 随机得到消息
    const getMsg = async () => {
      setMsgShow()
      const msg = await axios.get('https://v1.hitokoto.cn/')
      msgStyle.message = msg.data.hitokoto
      setMsgFade()
    }
    const setMsgInterval = () => {
      clock = setInterval(() => {
        getMsg()
      }, 30000)
    }
    onMounted(() => {
      setMsgFade()
      setMsgInterval()
      myEvent.on('say', (res) => {
        msgStyle.message = res
        setMsgFade()
      })
      //监听识别图像的进程
      emitter.on('sendProgress', (msg) => {
        clearInterval(clock)
        setMsgShow()
        if (typeof msg == 'number') {
          msgStyle.message = JSON.stringify(msg * 100).slice(0, 4) + '%'
        } else {
          if (msg == 'finish') {
            msgStyle.message = '解析的文件保存在原路径哦！'
            setMsgFade()
            setMsgInterval()
          } else msgStyle.message = '图片解析正在初始化。。。'
        }
      })
    })
    return {
      msgStyle,
    }
  },
}
</script>
<style scoped>
.message {
  max-width: 200px;
  padding: 2px 2px;
  text-align: center;
  border: 1px solid rgba(132, 241, 255, 0.4);
  border-radius: 12px;
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 3px 15px 2px rgba(137, 192, 255, 0.4),
    0 3px 15px 2px rgba(137, 198, 255, 0.4) inset;
  font-size: 13px;
  font-weight: 400;
  word-break: break-all;
  transition: opacity 1s;
}
</style>
