import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    usersList: [],
    userListLoading: false,
    tasksList: [],
    tasksListLoading: false
  },
  getters: {
    getUserById: state => id => {
      return state.usersList.find(user => user.id === id);
    }
  },
  mutations: {
    USERS_LIST_LOADING: (state, payload) => {
      state.userListLoading = payload;
    },
    GET_USERS_LIST: (state, payload) => {
      state.usersList = payload;
    },
    TASKS_LIST_LOADING: (state, payload) => {
      state.tasksListLoading = payload;
    },
    GET_TASKS_LIST: (state, payload) => {
      state.tasksList = payload;
    }
  },
  actions: {
    GetUsersList: ({ commit }) => {
      commit("USERS_LIST_LOADING", true);
      return axios
        .get("https://jsonplaceholder.typicode.com/users", {})
        .then(res => {
          commit("GET_USERS_LIST", res.data);
        })
        .catch(e => {
          throw e;
        })
        .finally(() => {
          commit("USERS_LIST_LOADING", false);
        });
    },
    GetTasksList: ({ commit }, payload) => {
      commit("TASKS_LIST_LOADING", true);
      console.info("payload", payload);
      return axios
        .get(`https://jsonplaceholder.typicode.com/users/${payload}/todos`, {})
        .then(res => {
          commit("GET_TASKS_LIST", res.data);
          return res.data;
        })
        .catch(e => {
          throw e;
        })
        .finally(() => {
          commit("TASKS_LIST_LOADING", false);
        });
    }
  },
  modules: {}
});
