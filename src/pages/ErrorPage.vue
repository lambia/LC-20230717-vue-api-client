<script>
export default {
    name: "ErrorNotFound",
    data() {
        return {
            //nel caso si voglia passare "message" al componente
            //decommentare i commenti indicati con "Message via history"
            //e decommentare anche nel redirect fatto da PostList.vue
            //inoltre questo oggetto errorMessage non servirebbe più
            errorMessage: {
                401: "Unauthorized",
                404: "Nothing found"
            },
            // Message via history
            // message: null
        }
    },
    mounted() {
        // Message via history
        // this.message = history.state.message;
    }
}
</script>

<template>

    <section>
        <!-- $route.params.nomeProprietaDellaRotta -->
        <h1>Error {{ $route.params.code }}</h1>

        <p>{{ message }}</p>
    </section>

</template>