import { createStore } from 'vuex';
import axios from 'axios';


export default createStore({
  state: {
    carros: [],
    categorias: []
  },
  mutations: {
    loadCarros(state, carros) {
      state.carros = carros;
    },
    loadCategorias(state, categorias) {
      state.categorias = categorias;
    }
  },
  actions: {
    loadCarros({ commit }) {
      axios.get('http://localhost:8000/api/carros/lista')
      .then(response => {
        commit('loadCarros', response.data);
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
