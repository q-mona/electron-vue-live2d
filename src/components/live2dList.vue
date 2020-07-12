<template>
  <div
    class="list-container shake-animate"
    @mouseleave="hideLive2dList"
    v-if="$store.state.isShowLive2dList"
  >

    <div @click="back">
      <ToolItem title="上一页" style="border-bottom:1px solid lightgray" />
    </div>

    <div v-for="(item, index) in data" :key="index">
      <div
        @click="change(index)"
        @contextmenu.prevent="removeLive2d(index,item.path)"
        :class="setHighlLight(item.path)?'hightLight':''"
        :style="{'color':externalHighlLight(item.path)?'red':''}"
      >
        <ToolItem :title="item.name" v-if="index>=0&&index<end" />
      </div>
    </div>

    <div @click="forward">
      <ToolItem title="下一页" style="border-top:1px solid lightgray" />
    </div>

  </div>
</template>

<script>
import ToolItem from './toolItem'
import { live2dPath } from '../assets/js/live2dPath'
const { ipcRenderer } = window.require('electron')
const Store = window.require('electron-store')
const store = new Store()
export default {
  data() {
    return {
      data: [],
      sum: [],
      hide: false, // 隐藏
      start: 0, // 一次显示8个
      end: 8 // 一次显示8个
    }
  },
  methods: {
    // 更改live2d模型
    change(index) {
      this.$store.commit('setPath', this.data[index].path)
      // 每次最后选择的人物 设为下次启动的首选项
      store.set('live2dPath', this.data[index].path)
      window.loadlive2d('live2d', this.$store.state.path)
    },
    // 选中高亮
    setHighlLight(path) {
      return this.$store.state.path === path
    },
    // 导入的live2d高亮
    externalHighlLight(path) {
      const data = store.get('live2dSource')
      for (let i = 0; i < data.length; i++) {
        if (data[i].path === path) {
          return true
        }
      }
      return false
    },
    removeLive2d(index, path) {
      // 只能删除导入的live2d
      if (this.externalHighlLight(path)) {
        const data = store.get('live2dSource')
        const newData = []
        for (let i = 0; i < data.length; i++) {
          if (data[i].path !== path) {
            newData.push(data[i])
          }
        }
        store.set('live2dSource', newData)
        this.$store.commit('setSum', [...live2dPath, ...newData])
        ipcRenderer.send('win-reload')
      } else {
        this.$store.commit('setMsg', '只能删除导入的live2d哦~~')
        this.$store.commit('setFade', 1)
        this.$store.dispatch('removeMsg')
      }
    },
    // 上一页
    back() {
      if (this.start === 0) {
        this.$store.commit('setMsg', '已经到顶了=。=')
        this.$store.commit('setFade', 1)
        this.$store.dispatch('removeMsg')
      } else {
        this.start -= 8
        this.end -= 8
        this.data = this.$store.state.sum.slice(this.start, this.end)
      }
    },
    // 下一页
    forward() {
      if (this.end >= live2dPath.length) {
        this.$store.commit('setMsg', '已经到底了=。=')
        this.$store.commit('setFade', 1)
        this.$store.dispatch('removeMsg')
      } else {
        this.start += 8
        this.end += 8
        this.data = this.$store.state.sum.slice(this.start, this.end)
      }
    },
    // 鼠标离开则隐藏列表
    hideLive2dList() {
      this.$store.commit('setLive2dList', false)
    }
  },
  components: {
    ToolItem
  },
  mounted() {
    // 获取导入的live2d模型
    this.data = this.$store.state.sum.slice(0, 8)
  }
}
</script>

<style scoped>
.list-container {
  position: absolute;
  right: 20px;
  background: white;
  border: 1px solid gainsboro;
  border-radius: 6px;
  overflow: hidden;
  -webkit-app-region: no-drag;
  z-index: 3;
  text-align: center;
}
.hightLight {
  background: lightblue;
}
</style>
