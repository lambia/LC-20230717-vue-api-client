<script>
export default {
  name: "Vue API Client",
  data() {
    return { }
  }
}
</script>

<template>
  
  <header>
    <a href="/">Home</a>
    <a href="/about-us">About us</a>
    <a href="/posts">Post</a>
  </header>

  <router-view></router-view>

</template>

<style scoped>
header {
  width: 100%;
  background: white;
  color: black;
}
</style>
