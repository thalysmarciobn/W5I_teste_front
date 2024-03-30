<template>
  <div class="row">
    <div class="col-md-12">
      <form @submit.prevent="cadastrar">
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="inputNome">Nome</label>
            <input type="text" class="form-control" id="inputNome" placeholder="" v-model="cadastro.nome" required>
          </div>
          <div class="form-group col-md-6">
            <label for="inputTaxa">Taxa</label>
            <input type="text" class="form-control" id="inputTaxa" placeholder="1.0" v-model="cadastro.taxa" required>
          </div>
        </div>
        <button type="submit" class="btn btn-primary">Cadastrar</button>
      </form>
    </div>
        <div class="col-md-12">
            <div class="table-wrap">
              <table class="table table-striped">
                  <thead>
                      <tr>
                          <th>Categória</th>
                          <th>Taxa</th>
                          <th>Carros</th>
                          <th></th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr v-for="(data, index) in categorias" :key="index">
                        <th scope="row">{{ data.nome }}</th>
                        <td>{{ data.taxa }}</td>
                        <td>{{ data.numero_carros }}</td>
                        <td><button @click="deleteCategoria(data.id)" class="btn btn-danger" :disabled="data.numero_carros > 0">Remover</button></td>
                      </tr>
                  </tbody>
              </table>
            </div>
        </div>
    </div>
  </template>
  
<script>
import { mapState } from 'vuex';
  
import axios from 'axios';
  
export default {
  name: 'CategoriaPage',
  components: {
  },
  created() {
    this.$store.dispatch('loadCategorias');
  },
  data() {
    return {
      cadastro: {
        nome: '',
        taxa: 1.0
      }
    }
  },
  computed: mapState([
    'categorias'
  ]),
  methods: {
    cadastrar() {
      const formData = new FormData();
      formData.append('nome', this.cadastro.nome);
      formData.append('taxa', this.cadastro.taxa);

      axios.post('http://localhost:8000/api/categorias/cadastrar', formData)
        .then(response => {
          if (response.data.code == 200) {
            this.$store.dispatch('loadCategorias');
          }
        })
    },
    deleteCategoria(id) {
      axios.delete(`http://localhost:8000/api/categorias/remover?id=${id}`)
      .then(response => {
        if (response.data.code == 200) {
          this.$store.dispatch('loadCategorias');
        }
      })
    }
  }
}
</script>
  
  <style lang="scss">
  
  </style>
  