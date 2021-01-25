<template>
  <input
    type="file"
    accept="image/png,image/jpg,image/jpeg"
    @change="upload($event)"
  />
</template>

<script>
import { createWorker } from 'tesseract.js'
import emitter from '../utils/emitter'
const { ipcRenderer } = window.require('electron')
export default {
  setup() {
    const upload = (e) => {
      const file = e.target.files[0]
      readAndWrite(file)
    }
    // 识别图片
    const readAndWrite = async (file) => {
      const worker = createWorker({
        logger: (m) => {
          if (m.status == 'recognizing text')
            emitter.emit('sendProgress', m.progress)
          else emitter.emit('sendProgress', '图片解析正在初始化...')
        },
      })

      const img = file
      await worker.load()
      await worker.loadLanguage('eng+chi_sim')
      await worker.initialize('eng+chi_sim')

      const {
        data: { text },
      } = await worker.recognize(img)
      // 请求主进程使用node保存识别后的文件
      ipcRenderer.send('writeFile', text, file.path, file.name)
      // 主进程写入完成
      ipcRenderer.on('writeFile-reply', (event, res) => {
        emitter.emit('sendProgress', res)
      })
    }
    return {
      readAndWrite,
      upload,
    }
  },
}
</script>

<style scope>
</style>