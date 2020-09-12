import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    session: {}
  },
  mutations: {
    setSession(state, session) {
      state.session = session
      sessionStorage.setItem('session', JSON.stringify(session))
    },
    clearSession(state) {
      state.session = null
      sessionStorage.removeItem('session')
    }
  },
  actions: {},
  getters: {
    session: state => {
      return state.session
    }
  }
});
