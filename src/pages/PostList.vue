<script>
import axios from "axios";
import { store } from '../store';

export default {
    name: "PostList",
    data() {
        return {
            store,
            loading: false,
            loadingError: false,
            posts: [],
            postsCurrentPage: 0,
            postsTotalPages: 0
        }
    },
    methods: {
        getPostsFirstPage() {

            this.loading = true;
            axios.get(this.store.apiUrl + "posts").then(response => {
                console.log(response.data);
                // this.posts = response.data.results; //non paginato
                this.posts = response.data.results.data; //paginato
                this.postsCurrentPage = response.data.results.current_page;
                this.postsTotalPages = response.data.results.last_page;
                this.loading = false;
            }).catch(err => {
                this.loading = false;
                this.loadingError = err.message;
                this.$router.push({ name: 'error', params: { code: 404 } })
                // per passare "params artificiali":
                // Message via history
                // this.$router.push({ name: 'error', params: { code: err.response.status }, state: { message: err.message } })
            });

        },
        getPostsPage(pageNumber) {

            if(pageNumber && pageNumber > 0 && pageNumber <= this.postsTotalPages) {

                let config = {
                    params: {
                        page: pageNumber
                    }
                };

                this.loading = true;
                axios.get(this.store.apiUrl + "posts", config).then(response => {
                    console.log(response.data);
                    // this.posts = response.data.results; //non paginato
                    this.posts = response.data.results.data; //paginato
                    this.postsCurrentPage = response.data.results.current_page;
                    this.postsTotalPages = response.data.results.last_page;
                    this.loading = false;
                }).catch(err => {
                    this.loading = false;
                    this.loadingError = err.message;
                });

            } else {
                console.error("Non ci sono più pagine");
            }

        },
        getPostsPrevPage() {

            this.getPostsPage( this.postsCurrentPage - 1 );
        },
        getPostsNextPage() {

            this.getPostsPage( this.postsCurrentPage + 1 );
        },
    },
    mounted() {
        this.getPostsFirstPage();
    }
}
</script>

<template>

    <section>
        <h1>Lista dei post</h1>
        
        <main>
            <h2>Posts <span v-if="postsTotalPages>0">{{ postsCurrentPage }} di {{ postsTotalPages }}</span></h2>
            <h3 v-if="loading">Caricamento in corso</h3>
            <h3 v-if="loadingError">{{ loadingError }}</h3>

            <div class="card" v-for="post in posts">
                <img :src="store.storageUrl + post.image" />
                <h3>
                    <router-link :to="{ name:'single-post', params: {id: post.id} }">{{ post.title }}</router-link>
                </h3>
                <h4>Categoria: {{ post.category ? post.category.name : "Nessuna" }}</h4>
                <h4>Tags: 
                    <span v-if="post.tags.length" v-for="tag in post.tags">{{ tag.name }}&nbsp;</span>
                    <span v-else>Nessun tag</span>
                </h4>
                <p>{{ post.content }}</p>
            </div>

            <a class="button" @click="getPostsPrevPage">Pagina precedente</a>
            <a class="button" @click="getPostsPage(pageNumber)" v-for="pageNumber in postsTotalPages">{{ pageNumber }}</a>
            <a class="button" @click="getPostsNextPage">Pagina successiva</a>
        </main>

    </section>

</template>


<style scoped>
.card {
    background: #555;
    padding: 1rem;
    margin: 1rem;
    border-radius: 0.25rem;
}

.button {
    padding: 0.5rem;
    background: #DDD;
    color: black;
    border: solid 1px black;
    border-radius: 0.25rem;
    margin: 1rem;
    cursor: pointer;
}

.card > img {
    width: 100%;
}
</style>