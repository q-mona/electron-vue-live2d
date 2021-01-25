<template>
  <div class="no-drag" @mouseenter="listShow">
    <canvas id="live2d" width="250" height="250"></canvas>
  </div>
</template>

<script>
import { onMounted } from 'vue'
import emitter from '../utils/emitter'
import myEvent from '../utils/myEvent'
export default {
  props: {
    msg: String,
  },
  setup() {
    const listShow = ()=>{
      emitter.emit('setOpacity')
    }
    onMounted(() => {
      myEvent.emit('say', 'Hello World~')
      window.loadlive2d(
        'live2d',
        'live2d/live2d-widget-model-plt/assets/plt.model.json'
      )
    })
    return {
      listShow
    }
  },
}
</script>

<style scoped>
</style>
