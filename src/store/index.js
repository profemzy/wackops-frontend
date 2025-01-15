import { createStore } from 'vuex';
import api from '../services/api';

export default createStore({
  state: {
    user: null,
    token: localStorage.getItem('token'),
    researches: [],
    users: []
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    SET_TOKEN(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
    },
    CLEAR_AUTH(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
    },
    SET_RESEARCHES(state, researches) {
      state.researches = researches;
    },
    SET_USERS(state, users) {
      state.users = users;
    }
  },
  actions: {
    async login({ commit }, credentials) {
      const response = await api.login(credentials);
      commit('SET_TOKEN', response.data.data.access_token);
    },
    async logout({ commit }) {
      await api.logout();
      commit('CLEAR_AUTH');
    },
    async register(_, userData) {
      await api.register(userData);
    },
    async fetchResearches({ commit }, username) {
      const response = await api.getResearch(username);
      commit('SET_RESEARCHES', response.data.data);
    },
    async createResearch(_, question) {
      return await api.createResearch(question);
    },
    async fetchUsers({ commit }) {
      const response = await api.getUsers();
      commit('SET_USERS', response.data.data);
    }
  }
});
