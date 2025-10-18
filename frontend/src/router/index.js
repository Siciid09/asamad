// frontend/src/router/index.js
import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Hotels from '../views/Hotels.vue';
import HotelDetail from '../views/HotelDetail.vue';
import Places from '../views/Places.vue';
import PlaceDetail from '../views/PlaceDetail.vue';
import About from '../views/About.vue';
import Contact from '../views/Contact.vue';
import BookingConfirmation from '../views/BookingConfirmation.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import UserDashboard from '../views/UserDashboard.vue';
import AdminDashboard from '../views/AdminDashboard.vue';
import store from '../store';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/hotels', name: 'Hotels', component: Hotels },
  { path: '/hotel/:id', name: 'HotelDetail', component: HotelDetail },
  { path: '/places', name: 'Places', component: Places },
  { path: '/place/:id', name: 'PlaceDetail', component: PlaceDetail },
  { path: '/about', name: 'About', component: About },
  { path: '/contact', name: 'Contact', component: Contact },
  { path: '/booking-confirmed/:hotelName', name: 'BookingConfirmation', component: BookingConfirmation, props: true },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { 
    path: '/dashboard/user', 
    name: 'UserDashboard', 
    component: UserDashboard,
    meta: { requiresAuth: true } 
  },
  { 
    path: '/dashboard/admin', 
    name: 'AdminDashboard', 
    component: AdminDashboard,
    meta: { requiresAuth: true, requiresAdmin: true }
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  },
});

router.beforeEach((to, from, next) => {
  const loggedIn = store.getters.isAuthenticated;
  const user = store.getters.user;

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!loggedIn) {
      next('/login');
    } else {
      if (to.matched.some(record => record.meta.requiresAdmin)) {
        if (user && user.role === 'admin') {
          next();
        } else {
          next('/dashboard/user'); // Redirect non-admins trying to access admin routes
        }
      } else {
        next();
      }
    }
  } else {
    next();
  }
});

export default router;

