<script setup>
  import AppHeader from './components/AppHeader.vue'
</script>

<template>
  <div id="app">
    <AppHeader />
    <main>
      <router-view />
    </main>
  </div>
</template>

<style scoped lang="scss">
  #app {
    padding: 2rem;
    font-family: sans-serif;

    main {
      margin-top: 2rem;
    }
  }
</style>