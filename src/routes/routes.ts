import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: '/',
        component: () => import("../views/cardView.vue")
    },
    {
        path: '/archive',
        component: () => import("../views/home.vue")
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});
export default router;