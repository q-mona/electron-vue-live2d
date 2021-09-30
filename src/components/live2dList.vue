<template>
  <div
    class="l2d-list-container shake"
    @mouseleave="hidden"
    :style="{ opacity: opacity, 'z-index': opacity == 0 ? -1 : 3 }"
  >
    <div @click="back">
      <ToolItem
        title="上一页"
        style="border-bottom: 1px solid lightgray; padding: 8px 0"
      />
    </div>
    <div v-for="(item, index) in live2dList" :key="index">
      <div v-if="index >= page.start && index < page.start + page.step">
        <ToolItem
          :title="item"
          @click="changeLive2d(item)"
          :style="{ color: item == cur ? 'red' : '' }"
        />
      </div>
    </div>
    <div @click="forward">
      <ToolItem
        title="下一页"
        style="border-top: 1px solid lightgray; padding: 8px 0"
      />
    </div>
  </div>
</template>

<script>
import ToolItem from "./toolItem";
import { ipcRenderer } from "electron";
import { computed, onMounted, ref, reactive } from "vue";
import { useStore } from "vuex";
import fs from "fs";
import path from "path";
export default {
  setup() {
    const store = useStore();
    // 仅显示(start, end)区间的live2d
    const page = reactive({
      start: computed(() => store.state.start),
      total: 0, // live2d个数
      step: 8, // 每次显示step个live2d
    });

    // 上一页
    const back = () => {
      if (page.start - page.step >= 0) {
        store.commit("setPage", page.start - page.step);
      } else store.commit("setPage", 0);
    };
    // 下一页
    const forward = () => {
      if (page.start + page.step < page.total) {
        store.commit("setPage", page.start + page.step);
      }
    };

    const live2dList = ref([]); // live2d列表
    const publicPath = ref(""); // 静态资源路径
    // 鼠标移出隐藏live2d面板
    const hidden = () => {
      store.commit("setOpacity", { live2d: 0 });
    };

    // 切换live2d
    const changeLive2d = (name) => {
      let live2dPath = path.join(publicPath.value, name);
      // 读取live2d
      let live2dData = { voices: [] };
      const data = fs.readdirSync(live2dPath);
      data.forEach((item) => {
        let jsonPath = path.join("live2d", name, item).replaceAll("\\", "/");
        if (item.indexOf("model.json") != -1) {
          live2dData.path = jsonPath;
          live2dData.type = "moc";
          live2dData.name = name;
        } else if (item.indexOf("model3.json") != -1) {
          live2dData.path = jsonPath;
          live2dData.type = "moc3";
          live2dData.name = name;
        } else if (item.indexOf("voice") != -1) {
          const voices = fs.readdirSync(path.join(live2dPath, item));
          for (let i = 0; i < voices.length; i++) {
            voices[i] = item + "/" + voices[i];
          }
          live2dData.voices = voices;
        }
      });

      // 保存配置
      const config = {
        live2d: live2dData,
        message: store.state.message,
        config: store.state.config,
        start: store.state.start,
      };
      let configPath = path.join(
        ipcRenderer.sendSync("getPublicPath"),
        "..",
        "config.json"
      );
 
      fs.writeFileSync(configPath, JSON.stringify(config));
      ipcRenderer.send("reload");
    };
    onMounted(() => {
      // 获得静态资源文件夹的绝对路径
      publicPath.value = ipcRenderer.sendSync("getPublicPath");
      // 获得live2d资源列表
      fs.readdir(publicPath.value, (error, data) => {
        live2dList.value = data;
        page.total = data.length;
      });
    });
    return {
      page,
      live2dList,
      opacity: computed(() => store.state.opacity.live2d),
      cur: computed(() => store.state.live2d.name),
      changeLive2d,
      hidden,
      back,
      forward,
    };
  },
  components: {
    ToolItem,
  },
};
</script>

<style scoped>
.l2d-list-container {
  position: absolute;
  background: white;
  border: 1px solid gainsboro;
  border-radius: 6px;
  overflow: hidden;
  -webkit-app-region: no-drag;
  text-align: center;
  left: 20px;
  bottom: 50px;
  transition: opacity 0.5s;
}
.hightLight {
  background: lightblue;
}
</style>
