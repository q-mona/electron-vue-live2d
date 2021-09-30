<template>
  <div
    class="cfg-list-container shake"
    @mouseleave="hidden"
    :style="{ opacity: opacity, 'z-index': opacity == 0 ? -1 : 3 }"
  >
    <div class="cfg-item-container">
      <span>宽度：</span>
      <a-slider
        style="width: 200px"
        v-model:value="config.width"
        :step="25"
        :max="800"
        :min="300"
      />
    </div>
    <div class="cfg-item-container">
      <span>高度：</span>
      <a-slider
        style="width: 200px"
        v-model:value="config.height"
        :step="25"
        :max="800"
        :min="300"
      />
    </div>
    <div class="cfg-item-container">
      <span>缩放：</span>
      <a-slider
        style="width: 200px"
        v-model:value="config.scale"
        :step="0.1"
        :max="2"
        :min="0.5"
      />
    </div>

    <div class="cfg-item-container">
      <div>
        <span>开机自启：</span>
        <a-switch v-model:checked="config.autoStart" />
      </div>
      <div>
        <span>显示边框：</span>
        <a-switch v-model:checked="config.showBorder" />
      </div>
    </div>

    <a-divider />
    <div class="cfg-item-container" style="justify-content: space-around">
      <a-tooltip placement="topRight">
        <template #title>
          <span>还原</span>
        </template>
        <a-button shape="circle" @click="reset">
          <template #icon><UndoOutlined /></template>
        </a-button>
      </a-tooltip>

      <a-tooltip>
        <template #title>
          <span>确认</span>
        </template>
        <a-button shape="circle" @click="confirm" id="confirmBtn">
          <template #icon><CheckOutlined /></template>
        </a-button>
      </a-tooltip>
    </div>
  </div>
</template>

<script>
import { ipcRenderer } from "electron";
import { useStore } from "vuex";
import { computed, onMounted, reactive } from "vue";
import { CheckOutlined, UndoOutlined } from "@ant-design/icons-vue";
import fs from "fs";
import path from "path";
export default {
  setup() {
    const store = useStore();
    const config = reactive({
      width: 475,
      height: 475,
      scale: 1,
      showBorder: true,
      autoStart: false,
    });
    const confirm = () => {
      store.commit("setConfig", config);

      ipcRenderer.send("auto-start", config.autoStart);
      ipcRenderer.send("resize", {
        width: config.width + 40,
        height: config.height + 80,
      });

      let live2d = document.querySelector("#moc3");
      if (live2d.childNodes.length > 0)
        live2d.removeChild(live2d.childNodes[0]);
      let ctn = document.querySelector("#moc-ctn");
      if (ctn.childNodes.length > 0) ctn.removeChild(ctn.childNodes[0]);

      if (store.state.live2d.type == "moc3") {
        window.l2dViewer({
          el: live2d,
          basePath: "live2d",
          modelName: store.state.live2d.name,
          width: config.width,
          height: config.height,
          sounds: store.state.live2d.voices
        });
        live2d.childNodes[0].style.transform = `scale(${config.scale})`
      } else {
        let canvas = document.createElement("canvas");
        canvas.setAttribute("id", "moc");
        canvas.width = config.width;
        canvas.height = config.height;
        ctn.appendChild(canvas);
        window.loadlive2d("moc", store.state.live2d.path);
        canvas.style.transform = `scale(${config.scale})`
      }
    };
    const reset = () => {
      for (let key in store.state.config) {
        config[key] = store.state.config[key];
      }
    };
    // 隐藏设置面板
    const hidden = () => {
      store.commit("setOpacity", { config: 0 });
    };
    onMounted(() => {
      // 获得配置文件
      let configPath = path.join(
        ipcRenderer.sendSync("getPublicPath"),
        "..",
        "config.json"
      );
      let data = fs.readFileSync(configPath);
      data = JSON.parse(data);

      // 初始化配置 
      store.commit("setLive2d", data.live2d);
      store.commit("setMsg", data.message);
      store.commit("setConfig", data.config);
      store.commit("setPage", data.start);

      for (let key in store.state.config) {
        config[key] = store.state.config[key];
      }

      store.commit("setMsg", { opacity: 1 });
      store.dispatch("removeMsg");

      // 启用配置
      confirm();
    });
    return {
      opacity: computed(() => store.state.opacity.config),
      config,
      hidden,
      confirm,
      reset,
    };
  },
  components: {
    CheckOutlined,
    UndoOutlined,
  },
};
</script>

<style scoped>
.cfg-list-container {
  width: 300px;
  padding: 20px 20px;
  position: absolute;
  left: 20px;
  bottom: 50px;
  background: white;
  border: 1px solid gainsboro;
  border-radius: 6px;
  overflow: hidden;
  -webkit-app-region: no-drag;
  transition: opacity 0.5s;
}
.cfg-item-container {
  width: 260px;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
