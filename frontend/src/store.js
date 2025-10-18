// frontend/src/store.js
import { createStore } from 'vuex';
import api from './api';

const store = createStore({
  state() {
    return {
      user: JSON.parse(localStorage.getItem('user')) || null,
      token: localStorage.getItem('token') || null,
    };
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      localStorage.setItem('user', JSON.stringify(user));
    },
    setToken(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
    },
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
  },
  actions: {
    async login({ commit }, credentials) {
      const response = await api.post('/auth/login', credentials);
      const { token, user } = response.data;
      commit('setToken', token);
      commit('setUser', user);
      return user;
    },
    async register({ commit }, userData) {
      const response = await api.post('/auth/register', userData);
      const { token, user } = response.data;
      commit('setToken', token);
      commit('setUser', user);
      return user;
    },
    logout({ commit }) {
      commit('logout');
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    isAdmin: (state) => state.user && state.user.role === 'admin',
    currentUser: (state) => state.user,
  },
});

export default store;
