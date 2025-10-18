import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/hotels',
    name: 'Hotels',
    component: () => import('../views/Hotels.vue'),
  },
  {
    path: '/hotel/:id',
    name: 'HotelDetail',
    component: () => import('../views/HotelDetail.vue'),
    props: true,
  },
  {
    path: '/places',
    name: 'Places',
    component: () => import('../views/Places.vue'),
  },
  {
    path: '/place/:id',
    name: 'PlaceDetail',
    component: () => import('../views/PlaceDetail.vue'),
    props: true,
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('../views/Contact.vue'),
  },
  {
    path: '/booking-confirmed/:hotelName',
    name: 'BookingConfirmation',
    component: () => import('../views/BookingConfirmation.vue'),
    props: true,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0 };
  },
});

export default router;
