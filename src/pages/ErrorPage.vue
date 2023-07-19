<script>
export default {
    name: "ErrorNotFound",
    data() {
        return {
            errorMessage: {
                401: "Unauthorized",
                404: "Nothing found"
            }
        }
    },
}
</script>

<template>

    <section>
        <!-- $route.params.nomeProprietaDellaRotta -->
        <h1>Error {{ $route.params.code }}</h1>

        <p v-if="errorMessage[$route.params.code]">{{ errorMessage[$route.params.code] }}</p>
        <p v-else>Something went wrong</p>
    </section>

</template>