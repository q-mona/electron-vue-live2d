<template>
  <div
    class="settting-container shake-animate"
    @mouseleave="hideSettings"
    v-if="$store.state.isShowSettings"
    :style="{'height':height + 'px'}"
  >
    <div class="content">
      <div>
        <p>显示边框</p>
      </div>
      <div>
        <el-switch v-model="$store.state.showBorder" @change="isShowBorder"></el-switch>
      </div>
    </div>

    <div class="content">
      <div>
        <p>开机自启</p>
      </div>
      <div>
        <el-switch v-model="$store.state.autoStart" @change="isAutoStart"></el-switch>
      </div>
    </div>

    <!-- <div>
      <p class="uploadP" @click="addHeight">导入live2d</p>
      <div>
        <el-input type="text" placeholder="昵称" v-model="name" maxlength="10" show-word-limit></el-input>
        <a class="file">
          导入JSON
          <input type="file" id="upload" multiple="multiple" @change="getURL" accept=".json" />
        </a>
      </div>
    </div>-->
  </div>
</template>

<script>
const Store = window.require('electron-store')
const store = new Store()
const { ipcRenderer } = window.require('electron')
export default {
  data() {
    return {
      name: '',
      height: 100 // 界面长度
    }
  },
  methods: {
    isShowBorder() {
      // 将设置写入缓存
      store.set('showBorder', this.$store.state.showBorder)
      this.$store.commit('setShowBorder', this.$store.state.showBorder)
    },
    isAutoStart() {
      // 将设置写入缓存
      store.set('autoStart', this.$store.state.autoStart)
      this.$store.commit('setAutoStart', this.$store.state.autoStart)
      if (this.$store.state.autoStart === true) {
        ipcRenderer.send('auto-start', true)
      } else {
        ipcRenderer.send('auto-start', false)
      }
    },
    hideSettings() {
      // 防止还未获得路径 界面就关闭
      setTimeout(() => {
        this.$store.commit('setSettings', false)
        // this.height = 140
      }, 1000)
    }
    // addHeight() {
    //   this.height = 204
    // },
    // // 获得需要导入文件的路径
    // getURL() {
    //   if (this.name === '') {
    //     this.$store.commit('setMsg', '好歹给人起个名字啊')
    //     this.$store.commit('setFade', 1)
    //     this.$store.dispatch('removeMsg')
    //   } else {
    //     const files = document.getElementById('upload').files[0]
    //     // 获取导入的live2d资源
    //     const obj = {
    //       name: this.name,
    //       path: files.path
    //     }
    //     // 添加至vuex
    //     this.$store.commit('addSum', obj)
    //     // 存入缓存
    //     const src = store.get('live2dSource')
    //     if (src) {
    //       src.push(obj)
    //       store.set('live2dSource', src)
    //     } else {
    //       store.set('live2dSource', [obj])
    //     }

    //     this.$store.commit('setMsg', '滋滋滋~~ 导入成功')
    //     this.$store.commit('setFade', 1)
    //     this.$store.dispatch('removeMsg')

    //     ipcRenderer.send('win-reload')
    //   }
    // }
  }
}
</script>

<style scoped>
.settting-container {
  position: absolute;
  width: 120px;
  right: 20px;
  font-size: 14px;
  background: white;
  border: 1px solid gainsboro;
  border-radius: 6px;
  overflow: hidden;
  -webkit-app-region: no-drag;
  z-index: 3;
  transition: height 0.5s;
}
.content {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.uploadP {
  cursor: pointer;
  border: 1px solid lightgray;
  width: 100%;
  text-align: center;
}
.file {
  width: 100%;
  height: 20px;
  line-height: 20px;
  text-align: center;
  position: relative;
  display: inline-block;
  border: 1px solid lightgray;
  border-radius: 4px;
  text-decoration: none;
}
.file input {
  position: absolute;
  font-size: 14px;
  left: 0;
  top: 0;
  opacity: 0;
}
.file:hover {
  background: #aadffd;
  border-color: #78c3f3;
  color: #004974;
  text-decoration: none;
}
</style>
