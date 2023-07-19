<script>
export default {
    name: "AppHeader",
    data() {
        return {
        navLinks: [
            { label: "Home", name: "home" },
            { label: "About us", name: "about"  },
            { label: "Posts", name: "posts" },
            // { label: "Testa pagina di errore", name: "error", params: { code: 404 } },
            // { label: "Articolo a caso", name: "single-post", params: { id: 3 } }
        ]
        }
    }
}
</script>

<template>
  <header>
    <template v-for="i in navLinks">
      <router-link :to="{ name: i.name, params: i.params }">{{ i.label }}</router-link>
      <!-- <router-link :to="i">{{ i.label }}</router-link> -->
    </template>
  </header>
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