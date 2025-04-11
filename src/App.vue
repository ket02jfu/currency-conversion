<script setup>
  import AppHeader from './components/AppHeader.vue'
</script>

<template>
  <div id="app">
    <AppHeader />
    <main>
      <router-view />
      <div class="background-decor"></div>
      <div class="background-decor purple"></div>
      <div class="background-decor red"></div>
    </main>
  </div>
</template>

<style lang="scss">
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    min-height: calc(100vh - 80px);
    padding-top: 48px;
    position: relative;
    z-index: 1;
  }
</style>