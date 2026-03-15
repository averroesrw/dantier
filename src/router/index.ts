import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    { path: '/', name: 'home', component: () => import('../pages/HomePage.vue') },
    { path: '/o-nas', name: 'about', component: () => import('../pages/AboutPage.vue') },
    { path: '/rezervace', name: 'reservation', component: () => import('../pages/ReservationPage.vue') },
    { path: '/kontakt', name: 'contact', component: () => import('../pages/ContactPage.vue') },
    { path: '/:pathMatch(.*)*', name: 'not-found', redirect: '/' },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
        return { top: 0 }
    },
})

export default router
