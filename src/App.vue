<script>
export default {
  name: "Vue API Client",
  data() {
    return {
      navLinks: [
        { label: "Home", name: "home" },
        { label: "About us", name: "about"  },
        { label: "Posts", name: "posts" },
        { label: "Testa pagina di errore", name: "error", params: { code: "404" } }
      ],
      // navLinks: [
      //   { label: "Home", to: { name: "home" } },
      //   { label: "About us", to: { name: "about" } },
      //   { label: "Posts", to: { name: "posts"} },
      //   { label: "Testa pagina di errore", to: { name: "error", params: { code: "404" } } }
      // ]
    }
  }
}
</script>

<template>
  
  <header>
    <template v-for="i in navLinks">
      <router-link :to="{ name: i.name, params: i.params }">{{ i.label }}</router-link>
    </template>
<!-- 
    <template v-for="i in navLinks">
      <router-link :to="i.to">{{ i.label }}</router-link>
    </template> -->
  </header>

  <router-view></router-view>

</template>

<style scoped>
header {
  width: 100%;
  background: #666;
  color: black;
  padding: 1rem;
}
header a {
  margin: 1rem;
}
</style>
