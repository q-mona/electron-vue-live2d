<template>
  <div
    class="list-container shake"
    @mouseleave="hidden"
    :style="{ opacity: opacity, 'z-index': opacity == 0 ? -1 : 2 }"
  >
    <div>
      <div @click="change">
        <ToolItem title="切换" />
      </div>
      <div @click="config">
        <ToolItem title="设置" />
      </div>
      <div @click="importLive2d">
        <ToolItem title="导入" />
      </div>
      <div @click="quit">
        <ToolItem title="退出" />
      </div>
    </div>
  </div>
  <!--live2d资源列表-->
  <Live2dList />
  <Config />
  <Upload @click="upload" style="display: none" />
</template>

<script>
import ToolItem from "./toolItem";
import Upload from "./upload";
import Live2dList from "./live2dList";
import Config from "./config";
import { ipcRenderer } from "electron";
import { useStore } from "vuex";
import { computed } from "vue";
import fs from "fs";
import path from "path";
export default {
  setup() {
    const store = useStore();
    // 用js点击upload组件 导入live2d文件
    const importLive2d = () => {
      document.querySelector("#upload").click();
    };
    // 退出程序
    const quit = () => {
      // 保存配置
      const config = {
        live2d: store.state.live2d,
        message: store.state.message,
        config: store.state.config,
      };
      let configPath = path.join(
        ipcRenderer.sendSync("getPublicPath"),
        "..",
        "config.json"
      );
      fs.writeFileSync(configPath, JSON.stringify(config));
      ipcRenderer.send("win-close");
    };
    // 显示live2d列表
    const change = () => {
      store.commit("setOpacity", { live2d: 1 });
    };
    // 显示config列表
    const config = () => {
      store.commit("setOpacity", { config: 1 });
    };
    // 隐藏主面板
    const hidden = () => {
      store.commit("setOpacity", { main: 0 });
    };
    return {
      importLive2d,
      quit,
      change,
      hidden,
      config,
      opacity: computed(() => store.state.opacity.main),
    };
  },
  components: {
    ToolItem,
    Upload,
    Live2dList,
    Config,
  },
};
</script>

<style scoped>
.list-container {
  position: absolute;
  right: 20px;
  bottom: 50px;
  background: white;
  border: 1px solid gainsboro;
  border-radius: 6px;
  overflow: hidden;
  -webkit-app-region: no-drag;
  transition: opacity 0.5s;
}
</style>
