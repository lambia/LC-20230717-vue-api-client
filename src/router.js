import { createRouter, createWebHistory } from 'vue-router';

import AppHome from './pages/AppHome.vue';
import AppAbout from './pages/AppAbout.vue';
import PostList from './pages/PostList.vue';
import SinglePost from './pages/SinglePost.vue';
import ErrorPage from './pages/ErrorPage.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: "home",
            component: AppHome
        },
        {
            path: "/about-us",
            name: "about",
            component: AppAbout
        },
        {
            path: "/posts",
            name: "posts",
            component: PostList
        },
        {
            path: "/posts/:id",
            name: "single-post",
            component: SinglePost
        },
        {
            path: "/error/:code",
            name: "error",
            component: ErrorPage
        }
    ]
});

//alternativa se da main.js volete importare senza graffe:
// export default router;
export { router };