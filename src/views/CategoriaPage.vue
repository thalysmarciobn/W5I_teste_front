<template>
    <div class="row">
        <div class="col-md-12">
            <div class="table-wrap">
              <table class="table table-striped">
                  <thead>
                      <tr>
                          <th>Categória</th>
                          <th>Taxa</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr v-for="(categoria, index) in categorias" :key="index">
                        <th scope="row">{{ categoria.nome }}</th>
                        <td>{{ categoria.taxa }}</td>
                        <td><div @click="deleteCategoria(categoria.id)" class="btn btn-danger">Remover</div></td>
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
  data() {
    return {
    }
  },
  computed: mapState([
    'categorias'
  ]),
  methods: {
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
  