<script>
import axios from "axios";
import { store } from "../store.js";

export default {
    name: "ContactForm",
    data() {
        return {
          store,
          loading: false,
          name: "",
          email: "",
          message: "",
          success: false,
          errors: [],
        }
    },
    methods: {
      sendForm() {

        this.loading = true;
        this.success = false;
        this.errors = [];

        let requestData = {
          name: this.name,
          email: this.email,
          message: this.message,
        };

        axios.post(this.store.apiUrl + "contacts", requestData).then(response=>{
          this.loading = false;

          let success = response.data.success;

          if(!success) {
            console.error("Ci sono stati errori", response.data.errors);
            this.errors = response.data.errors;
          } else {
            this.success = true;
            this.name = "";
            this.email = "";
            this.message = "";
            console.log("Tutto ok");
          }

        }).catch(err=>{
          this.loading = false;

          console.log(err);
        });
      }
    }
}
</script>

<template>
    <section class="contact_me py-5">
        <div class="inner-wrapper">
            <div class="container-fluid text-center">
                <h2 class="text-uppercase">contact me</h2>
                <div class="row">
                    <form @submit.prevent="sendForm()" class="col-12 text-start">
                        <div class="mb-3">
                            <input class="border-0 border-bottom form-control"
                                type="text" name="name" id="name" placeholder="Name" v-model="name" :class="{ 'is-invalid': errors.name}">
                            <p v-for="error in errors.name">{{ error }}</p>
                        </div>
                        <div class="mb-3">
                            <input class="border-0 border-bottom form-control"
                                type="text" name="email" id="email" placeholder="Email" v-model="email" :class="{ 'is-invalid': errors.email}">
                            <p v-for="error in errors.email">{{ error }}</p>
                        </div>
                        <div class="mb-3">
                            <textarea class="border-0 border-bottom form-control"
                                name="message" id="message" cols="30"
                                rows="10" placeholder="Message" v-model="message" :class="{ 'is-invalid': errors.message}"></textarea>
                            <p v-for="error in errors.message">{{ error }}</p>
                        </div>
                        <button class="btn btn-lg btn-primary text-white" type="submit" :disabled="loading">{{ loading ? "Invio in corso..." : "Invia" }}</button>
                        <p v-if="success">Invio avvenuto con successo</p>
                      </form>
                </div>
            </div>
        </div>
    </section>
</template>


<style scoped>
.is-invalid {
  background: red;
}
</style>