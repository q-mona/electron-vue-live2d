<template>
  <div class="center container">
    <mainWin />
    <toolList />
  </div>
</template>

<script>
import mainWin from './view/mainWin'
import toolList from './components/toolList'
export default {
  name: 'App',
  setup() {
  },
  components: {
    mainWin,
    toolList,
  },
}
</script>

<style scope>
.container {
  border: 2px solid lightsalmon;
  border-radius: 4px;
  width: 98vw;
  height: 98vh;
}
</style>
