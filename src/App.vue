<template>
  <div id="app">
    <header>My App Header</header>
    <router-view /> 
    <footer>My App Footer</footer>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
}
</style>
