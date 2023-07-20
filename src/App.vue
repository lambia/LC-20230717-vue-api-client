<script>
import AppHeader from './components/AppHeader.vue';
import { store } from './store';
import axios from "axios";

export default {
  name: "Vue API Client",
  components: {
    AppHeader
  },
  data() {
    return {
        store,
    }
  },
  methods: {
    
    getPostsTotalNumber() {

      if(this.store.totalPostsNumber == 0) {

          axios.get(this.store.apiUrl + "posts/count").then(response => {
              this.store.totalPostsNumber = response.data.results;
          }).catch(err => {
              this.loading = false;
          });
      }

    },
  },
  created() {
    this.getPostsTotalNumber();
  }
}
</script>

<template>
  
  <AppHeader />

  <router-view></router-view>

</template>

