import { createStore } from 'vuex';
import axios from 'axios';


export default createStore({
  state: {
    carros: [],
    categorias: [],
    estacionamento: []
  },
  mutations: {
    loadCarros(state, carros) {
      state.carros = carros;
    },
    loadCategorias(state, categorias) {
      state.categorias = categorias;
    },
    loadEstacionamento(state, estacionamento) {
      state.estacionamento = estacionamento;
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
    },
    loadEstacionamento({ commit }) {
      axios.get('http://localhost:8000/api/estacionamento/lista')
      .then(response => {
        commit('loadEstacionamento', response.data);
      })
    }
  },
  modules: {
  }
})
