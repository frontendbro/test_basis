import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    usersList: [],
    userListLoading: false
  },
  mutations: {
    USER_LIST_LOADING: (state, payload) => {
      state.userListLoading = payload;
    },
    GET_USERS_LIST: (state, payload) => {
      state.usersList = payload;
    }
  },
  actions: {
    GetUsersList: ({ commit }) => {
      commit("USER_LIST_LOADING", true);
      return axios
        .get("https://jsonplaceholder.typicode.com/users", {})
        .then(res => {
          commit("GET_USERS_LIST", res.data);
        })
        .catch(e => {
          throw e;
        })
        .finally(() => {
          commit("USER_LIST_LOADING", true);
        });
    }
  },
  modules: {}
});
