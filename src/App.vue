<template>
  <div id="app">
    <router-view/>
    <div id="nav">
      <a href="https://github.com/summerscar/photo-library" target="_blank">Github</a>
    </div>
  </div>
</template>

<style lang="scss">
@import './style/common.scss';
body {
  overflow-y: hidden;
}
#app {
  text-align: center;
  transition: .5s all;
}
#nav {
  position: fixed;
  bottom: 0;
  right: 10px;
}
</style>
