<template>
  <input id="upload" type="file" @change="upload" webkitdirectory />
</template>
<script>
import fs from "fs";
import path from "path";
import { ipcRenderer } from "electron";
export default {
  setup() {
    // 判断文件是否存在
    const isExist = (filePath) => {
      return new Promise((resolve) => {
        fs.stat(filePath, (err) => {
          if (err) resolve(false);
          else resolve(true);
        });
      });
    };
    // 拷贝文件夹
    const copy = async (src, dest) => {
      let flag = await isExist(dest);
      if (!flag) {
        fs.mkdirSync(dest);
      }

      let dirs = fs.readdirSync(src);
      dirs.forEach((item) => {
        let itemPath = path.join(src, item);
        let temp = fs.statSync(itemPath);
        if (temp.isFile()) fs.copyFileSync(itemPath, path.join(dest, item));
        else if (temp.isDirectory()) copy(itemPath, path.join(dest, item));
      });
    };
    // 上传文件
    const upload = async (e) => {
      let files = e.target.files;
      if (files.length > 0) {
        let file = files[0];
        // 拼接文件夹路径
        let fileName = file.webkitRelativePath.split("/")[0];
        let filePath = file.path.split(fileName)[0] + fileName;
        // 拷贝文件夹到项目静态文件目录
        let dest = ipcRenderer.sendSync("getPublicPath") + "\\" + fileName;
        let flag = await isExist(dest);
        if (!flag) copy(filePath, dest);
        else console.log("模型已存在");
      }
    };
    return {
      upload,
    };
  },
};
</script>