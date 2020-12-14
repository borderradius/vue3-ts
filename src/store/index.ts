import Axios from "axios";
import { createStore } from "vuex";

export default createStore({
  state: {
    commonData: 0,
    lists: []
  },
  getters: {
    getCommonData(state) {
      return state.commonData;
    },
    getLists(state) {
      return state.lists;
    }
  },
  mutations: {
    SET_COMMON_DATA(state, payload) {
      state.commonData = payload;
    },
    SET_LISTS(state, payload) {
      state.lists = payload;
    }
  },
  actions: {
    setCommonData({ commit }, params) {
      console.warn(params);
      commit("SET_COMMON_DATA", params);
    },
    async setLists({ commit }, params) {
      const { data } = await Axios.get(
        "http://sample.bmaster.kro.kr/contacts",
        {
          params
        }
      );
      commit("SET_LISTS", data.contacts);
    }
  },
  modules: {}
});
