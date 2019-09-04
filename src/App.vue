<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
}
</script>

<style>
html,
body {
    margin: 0;
    padding: 0;
    border: 0;
    vertical-align: baseline;
    background: rgb(86, 228, 221);
}

body {
    font-family: 'Catamaran', sans-serif;
    font-size: 100%;
    width: 100%;
    height: 100%;
}
</style>
