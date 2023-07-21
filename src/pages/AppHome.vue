<script>
import ContactForm from "../components/ContactForm.vue";

export default {
    name: "AppHome",
    components: {
        ContactForm
    },
    data() {
        return {
        }
    },
}
</script>

<template>

    <section>
        <h1>Welcome</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem velit et asperiores ab illum, labore minus deleniti. Voluptatum sunt veniam culpa recusandae consequatur, reiciendis, nam, quaerat iusto velit porro fuga.</p>
        <ContactForm />
    </section>

</template>