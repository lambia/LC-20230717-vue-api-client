import { reactive } from "vue";

export const store = reactive({
    apiUrl: "http://localhost:8000/api/",
    storageUrl: "http://localhost:8000/storage/",
    totalPostsNumber: 0
});