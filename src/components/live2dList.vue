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
      <div v-if="index >= page.start && index < page.end">
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
      start: 0,
      end: 5,
      total: 0, // live2d个数
      step: 5, // 每次显示step个live2d
    });
    // 上一页
    const back = () => {
      if (page.start != 0) {
        page.start -= page.step;
        page.end -= page.step;
      }
    };
    // 下一页
    const forward = () => {
      if (page.end < page.total) {
        page.start += page.step;
        page.end += page.step;
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
      fs.readdir(live2dPath, (error, data) => {
        data.forEach((item) => {
          let jsonPath = path.join("live2d", name, item).replaceAll("\\", "/");
          if (item.indexOf("model.json") != -1) {
            store.commit("setLive2d", {
              path: jsonPath,
              type: "moc",
              name: name,
            });
            let ctn = document.querySelector("#moc-ctn");
            if (ctn.childNodes.length > 0) ctn.removeChild(ctn.childNodes[0]);
            let canvas = document.createElement("canvas");
            canvas.setAttribute("id", "moc");
            canvas.width = store.state.config.width;
            canvas.height = store.state.config.height;
            ctn.appendChild(canvas);
            window.loadlive2d("moc", jsonPath);
          } else if (item.indexOf("model3.json") != -1) {
            store.commit("setLive2d", {
              path: jsonPath,
              type: "moc3",
              name: name,
            });
            let live2d = document.querySelector("#moc3");
            if (live2d.childNodes.length > 0)
              live2d.removeChild(live2d.childNodes[0]);

            window.l2dViewer({
              el: document.querySelector("#moc3"),
              basePath: "live2d",
              modelName: name,
              width: store.state.config.width,
              height: store.state.config.height,
            });
          }
        });
      });
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
  right: 20px;
  bottom: 50px;
  transition: opacity 0.5s;
}
.hightLight {
  background: lightblue;
}
</style>
