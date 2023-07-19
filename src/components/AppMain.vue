<script>
import axios from "axios";

export default {
    name: "AppMain",
    data() {
        return {
            chiave: "valore",
            apiUrl: "http://localhost:8000/api/",
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
            axios.get(this.apiUrl + "posts").then(response => {
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
                axios.get(this.apiUrl + "posts", config).then(response => {
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

    <main>
        <h2>Posts <span v-if="postsTotalPages>0">{{ postsCurrentPage }} di {{ postsTotalPages }}</span></h2>
        <h3 v-if="loading">Caricamento in corso</h3>
        <h3 v-if="loadingError">{{ loadingError }}</h3>

        <div class="card" v-for="post in posts">
            <h3>{{ post.title }}</h3>
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
</style>