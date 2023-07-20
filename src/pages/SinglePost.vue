<script>
import axios from "axios";
import { store } from '../store';

export default {
    name: "SinglePost",
    data() {
        return {
            store,
            loading: false,
            loadingError: false,
            post: null
        }
    },
    methods: {
        getPost(id) {

            this.loading = true;
            axios.get(this.store.apiUrl + "posts/" + id).then(response => {
                console.log(response.data);
                this.post = response.data.results;
                this.loading = false;
            }).catch(err => {
                this.loading = false;
                this.loadingError = err.message;
                this.$router.push({ name: 'error', params: { code: 404 } });
            });

        }
    },
    mounted() {
        this.getPost( this.$route.params.id );
    },
    beforeRouteUpdate (to, from) {
        if(from.name == to.name) {
            this.getPost( to.params.id );
        }
    }
}
</script>

<template>

    <section v-if="post">
        <img :src="store.storageUrl + post.image" />
        <h1>{{ post.title }}</h1>
        <template v-if="post.id > 1">
            <router-link :to="{ name:'single-post', params: {id: post.id-1} }" class="navLink">Articolo precedente</router-link>
        </template>
        <template v-if="post.id < store.totalPostsNumber">
            <router-link :to="{ name:'single-post', params: {id: post.id+1} }" class="navLink">Prossimo articolo</router-link>
        </template>
        <h2>Categoria: {{ post.category ? post.category.name : "Nessuna" }}</h2>
        <h2>Tags: 
            <span v-if="post.tags.length" v-for="tag in post.tags">{{ tag.name }}&nbsp;</span>
            <span v-else>Nessun tag</span>
        </h2>
        <p>{{ post.content }}</p>
    </section>
    <section v-else>
        <h1>Il post non è stato trovato</h1>
    </section>

</template>

<style scoped>
img {
    width: 100%;
}
a.navLink {
    padding: 1rem;
}
</style>