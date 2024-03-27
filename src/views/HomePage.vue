<template>
  <div class="row">
      <div class="col-md-12">
          <div class="table-wrap">
            <h1>Horário do Sistema: {{ dateTime }}</h1>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Placa</th>
                        <th>Cor</th>
                        <th>Modelo</th>
                        <th>Categoria</th>
                        <th>Entrada</th>
                        <th>Saída</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(carro, index) in carros" :key="index">
                        <th scope="row">{{ carro.placa }}</th>
                        <td>{{ carro.cor }}</td>
                        <td>{{ carro.modelo.nome }}</td>
                        <td>{{ carro.modelo.categoria.nome }}</td>
                        <td>{{ timeSince(carro.entrada) }}</td>
                        <td>{{ carro.saida }}</td>
                        <td><a href="#" class="btn btn-success">Progress</a></td>
                    </tr>
                </tbody>
            </table>
          </div>
      </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'HomePage',
  components: {
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
      ]
    }
  },
  computed: mapState([
    'carros', 
    'dateTime'
  ]),
  methods: {
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

  .home {
  }


</style>
