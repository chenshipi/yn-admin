<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view class="app-router-view"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
#app .app-router-view {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: hidden;
  backface-visibility: hidden;
}
.app .app-router-view {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: hidden;
  backface-visibility: hidden;
  transform: translate3d(0, 0, 0);
  transform-style: preserve-3d;
  visibility: visible;
}
</style>
