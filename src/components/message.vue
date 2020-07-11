<template>
  <div class="message shake-animate" :style="{'opacity':$store.state.fade}">
    <p>{{$store.state.msg}}</p>
  </div>
</template>

<style scoped>
.message {
  width: 280px;
  height: auto;
  text-align: center;
  border: 1px solid rgba(255, 137, 255, 0.4);
  border-radius: 12px;
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 3px 15px 2px rgba(255, 137, 255, 0.4),
    0 3px 15px 2px rgba(255, 137, 255, 0.4) inset;
  font-size: 13px;
  font-weight: 400;
  text-overflow: ellipsis;
  overflow: hidden;
  position: absolute;
  top: 20%;
  left: 10px;
  transform: translate(-50%, -50%);
  transition: opacity 1s;
  z-index: 2;
  -webkit-app-region: no-drag;
}
</style>
