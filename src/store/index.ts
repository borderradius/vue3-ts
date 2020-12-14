import { createStore } from "vuex";

export default createStore({
  state: {
    commonData: 0
  },
  getters: {
    getCommonData(state) {
      return state.commonData;
    }
  },
  mutations: {
    SET_COMMON_DATA(state, payload) {
      state.commonData = payload;
    }
  },
  actions: {
    setCommonData({ commit }, params) {
      console.warn(params);
      commit("SET_COMMON_DATA", params);
    }
  },
  modules: {}
});
