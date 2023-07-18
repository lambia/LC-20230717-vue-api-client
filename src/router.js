import { createRouter, createWebHistory } from 'vue-router';

import AppHome from './pages/AppHome.vue';
import AppAbout from './pages/AppAbout.vue';
import PostList from './pages/PostList.vue';

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
        }
    ]
});

//alternativa se da main.js volete importare senza graffe:
// export default router;
export { router };