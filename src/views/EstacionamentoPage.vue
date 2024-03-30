<template>
    <div class="row">
      <div class="col-md-12">
        <form @submit.prevent="enviar">
          <div class="form-row">
            <div class="form-group col-md-4">
              <label for="inputEmail4">Placa</label>
              <input type="text" class="form-control" id="inputPlaca" placeholder="0000-0000" v-model="form.placa" required>
            </div>
            <div class="form-group col-md-4">
              <label for="inputCor">Data</label>
              <input
                class="form-control"
                type="datetime-local"
                id="meeting-time"
                name="meeting-time"
                v-model="form.data"
                :min="getCurrentDateTime()"
              />
            </div>
            <div class="form-group col-md-4">
              <label for="inputState">Ação</label>
              <select id="inputState" class="form-control" v-model="form.park">
                <option value="0" selected>Entrada</option>
                <option value="1">Saída</option>
              </select>
            </div>
          </div>
          <button type="submit" class="btn btn-primary">Enviar</button>
        </form>
      </div>
        <div class="col-md-12">
            <div class="table-wrap">
              <table class="table table-striped">
                  <thead>
                      <tr>
                          <th>Placa</th>
                          <th>Categoria</th>
                          <th>Entrada</th>
                          <th>Saída</th>
                          <th>No Estacionamento</th>
                      </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(data, index) in estacionamento" :key="index">
                      <th scope="row">{{ data.carro.placa }}</th>
                      <td>{{ data.carro.categoria.nome }}</td>
                      <td>{{ formatarData(data.entrada)  }}</td>
                      <td>{{ formatarData(data.saida) }}</td>
                      <td>{{ data.park }}</td>
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
    name: 'EstacionamentoPage',
    components: {
    },
    created() {
      this.$store.dispatch('loadEstacionamento');
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
        form: {
          placa: '',
          data: '',
          park: 0
        }
      }
    },
    computed: mapState([
      'estacionamento'
    ]),
    methods: {
      enviar() {
        const formData = new FormData();
        formData.append('placa', this.form.placa);
        formData.append('data', this.form.data);
        formData.append('park', this.form.park);

        axios.post('http://localhost:8000/api/estacionamento/enviar', formData)
          .then(response => {
            if (response.data.code == 200) {
              this.$store.dispatch('loadEstacionamento');

              let mensagem;
              switch (response.data.op) {
                case 1:
                  mensagem = `Entrada com Sucesso ao Veículo ${this.form.placa}`;
                  break;
                case 2:
                  mensagem = `Saída com Sucesso ao Veículo ${this.form.placa}`;
                  break;
                case 3:
                  mensagem = `O Veículo ${this.form.placa} já Possui uma Entrada`;
                  break;
                case 4:
                  mensagem = `É necessário o Veículo ${this.form.placa} Possuir uma Entrada`;
                  break;
              }

              this.$notify(mensagem);
            } else if (response.data.code == 404) {
              this.$notify('Veículo não Encontrado');
            }
          })
      },
      formatarData(dataString) {
        let data = new Date(dataString);
        let dia = data.getDate();
        let mes = data.getMonth() + 1;
        let ano = data.getFullYear();
        let horas = data.getHours().toString().padStart(2, '0');
        let minutos = data.getMinutes().toString().padStart(2, '0');
        return `${dia}/${mes}/${ano} ${horas}:${minutos}`;
      },
      getCurrentDateTime() {
          const now = new Date();
          const year = now.getFullYear();
          const month = (now.getMonth() + 1).toString().padStart(2, '0');
          const day = now.getDate().toString().padStart(2, '0');
          const hours = now.getHours().toString().padStart(2, '0');
          const minutes = now.getMinutes().toString().padStart(2, '0');

          return `${year}-${month}-${day}T${hours}:${minutes}`;
      },
      timeSince(date) {
        const currentDate = new Date();
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
  