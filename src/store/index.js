import { createStore } from 'vuex';
import axios from 'axios';


export default createStore({
  state: {
    dateTime: '',
    carros: []
  },
  mutations: {
    loadCarros(state, carros) {
      state.carros = carros;
    },
    loadDateTime(state, dateTime) {
      state.dateTime = dateTime;
    }
  },
  actions: {
    loadCarros({ commit }) {
      axios.get('http://localhost:8000/api/carros/lista')
      .then(response => {
        commit('loadDateTime', response.data.dateTime);
        commit('loadCarros', response.data.data);
      })
    }
  },
  modules: {
  }
})
