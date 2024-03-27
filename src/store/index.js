import { createStore } from 'vuex';
import axios from 'axios';


export default createStore({
  state: {
    dateTime: '',
    carros: [],
    categorias: []
  },
  mutations: {
    loadCarros(state, carros) {
      state.carros = carros;
    },
    loadCategorias(state, categorias) {
      state.categorias = categorias;
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
    },
    loadCategorias({ commit }) {
      axios.get('http://localhost:8000/api/categorias/lista')
      .then(response => {
        commit('loadCategorias', response.data);
      })
    }
  },
  modules: {
  }
})
