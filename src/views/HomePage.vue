<template>
  <div class="row">
    <div class="col-md-12">
      <form @submit.prevent="cadastrar">
        <div class="form-row">
          <div class="form-group col-md-4">
            <label for="inputEmail4">Placa</label>
            <input type="text" class="form-control" id="inputPlaca" placeholder="0000-0000" v-model="cadastro.placa" required>
          </div>
          <div class="form-group col-md-4">
            <label for="inputCor">Cor</label>
            <input type="text" class="form-control" id="inputCor" placeholder="Cor" v-model="cadastro.cor" required>
          </div>
          <div class="form-group col-md-4">
            <label for="inputState">Categória</label>
            <select id="inputState" class="form-control" v-model="cadastro.categoria">
              <option v-for="(categoria, index) in categorias" :key="index" :value="categoria.id">{{ categoria.nome }}</option>
            </select>
          </div>
        </div>
        <button type="submit" class="btn btn-primary">Registrar Veículo</button>
      </form>
    </div>
      <div class="col-md-12">
          <div class="table-wrap">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Placa</th>
                        <th>Cor</th>
                        <th>Categoria</th>
                    </tr>
                </thead>
                <tbody>
                <tr v-for="(carro, index) in carros" :key="index">
                    <th scope="row">{{ carro.placa }}</th>
                    <td>{{ carro.cor }}</td>
                    <td>{{ carro.categoria.nome }}</td>
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
  name: 'HomePage',
  components: {
  },
  created() {
    this.$store.dispatch('loadCarros');
    this.$store.dispatch('loadCategorias');
  },
  data() {
    return {
      rows: [],
      columns: [
        {
          label: 'name',
          field: 'name',
          filterOptions: {
            enabled: true,
            customFilter: true,
            formatValue: this.formatFilterValue
          }
        }
      ],
      cadastro: {
        placa: '',
        cor: '',
        categoria: 0
      }
    }
  },
  computed: mapState([
    'carros',
    'categorias'
  ]),
  methods: {
    cadastrar() {
      const formData = new FormData();
      formData.append('placa', this.cadastro.placa);
      formData.append('cor', this.cadastro.cor);
      formData.append('categoria', this.cadastro.categoria);

      axios.post('http://localhost:8000/api/carros/cadastrar', formData)
        .then(response => {
          if (response.data.code == 200) {
            this.$store.dispatch('loadCarros');
          }
        })
    },
    timeSince(date) {
      const currentDate = new Date(this.dateTime);
      const diffInSeconds = Math.floor((currentDate - new Date(date)) / 1000);

      const intervals = [
        { label: 'ano', seconds: 31536000 },
        { label: 'mês', seconds: 2592000 },
        { label: 'dia', seconds: 86400 },
        { label: 'hora', seconds: 3600 },
        { label: 'minuto', seconds: 60 },
        { label: 'segundo', seconds: 1 }
      ];

      for (const interval of intervals) {
        const count = Math.floor(diffInSeconds / interval.seconds);
        if (count > 1) {
          return `${count} ${interval.label}${count > 1 ? 's' : ''}`;
        }
      }
    }
  }
}
</script>

<style lang="scss">

.tiny-text {
  font-size: 7pt;
  display: block;
}

</style>
