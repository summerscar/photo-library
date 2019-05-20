<template>
  <div id="app">
    <router-view/>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
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
