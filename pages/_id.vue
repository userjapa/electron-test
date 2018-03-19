<template>
  <div>
    <div class="screen">
      <div class="area no-border">
        <h2>Sorteio</h2>
      </div>
      <div class="area">
        <div class="screen">
          <div class="area">
            <div class="screen options">
              <div class="button">
                <button type="button" name="add_game" @click="openModal()">Adicionar Jogo</button>
              </div>
              <div class="button">
                <nuxt-link to="/">
                  <button>Voltar</button>
                </nuxt-link>
              </div>
            </div>
          </div>
          <div class="area">
            Sorteio do dia {{ formatDate({ date: game.date }).date }}
          </div>
          <div class="area" v-if="game && game.result.length > 0">
            Resultado: <b v-for="(n, index) in game.result">{{ `${n}${index !== (game.result.length - 1)?', ':'.'}` }}</b>
          </div>
          <div class="area" v-if="!game || game.result.length === 0">
            <div class="result">
              <div class="info">
                <b>Nenhum Resultado Registrado</b>
              </div>
              <div class="info">
                <button @click="addResult()">Adicionar Resultado</button>
              </div>
            </div>
          </div>
          <div class="area">
            <div class="screen">
              <div class="area">
                <h3>Jogos</h3>
              </div>
              <div class="area">
                <table>
                  <thead>
                    <tr>
                      <th>Acertos</th>
                      <th>Números</th>
                      <th>Editar/Excluir</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="g in game.games">
                      <td @click="openGame(g.numbers)">{{(game && game.result && game.result.length > 0)?`${g.score} Acertos`:'Sem resultado'}}</td>
                      <td @click="openGame(g.numbers)">
                        <b v-for="(num, index) in g.numbers">
                          {{ `${num}${index !== (g.numbers.length - 1)?', ':'.'}` }}
                        </b>
                      </td>
                      <td @click="remover(g)"> Remover </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="area" v-if="!game || game.games.length === 0">
                <h3>Nenhum Jogo Registrado!</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <FormGame v-show="showModal" :jogo="game"/>
  </div>
</template>

<script>
import FormGame from '@/components/FormGame'
import { gameBus } from '@/components/form-game'

import { formatDate } from '@/store/filters'

export default {
  computed: {
    game () {
      return this.$store.state.game
    }
  },
  layout: 'sample',
  data () {
    return {
      showModal: false
    }
  },
  components: {
    FormGame
  },
  methods: {
    openModal: function () {
      gameBus.$emit('open', [])
      this.$data.showModal = true
    },
    remover: async function (game) {
      const index = this.game.games.indexOf(game)
      this.game.games.splice(index, 1)
      await this.$store.dispatch('change', this.game)
    },
    openGame: function (numbers) {
      gameBus.$emit('open', numbers)
      this.$data.showModal = true
    },
    addResult: function () {
      gameBus.$emit('open', [])
      this.$data.showModal = true
    },
    formatDate
  },
  mounted () {
    gameBus.$on('close', () => {
      this.$data.showModal = false
    })
  }
}
</script>

<style>
.screen {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.area {
  width: 100%;
  background-color: #fff;
  align-self: center;
  flex-grow: 1;
  margin-top: 10px;
  padding: 5px 0px;
  text-align: center;
  border-top: 2px solid #d6d6d6;
}

.options {
  flex-direction: row !important;
}

.button {
  align-self: flex-start;
  margin-left: 4.5%;
  margin-top: 10px;
}

.button button {
  min-width: 125px;
  padding: 10px;
  border-radius: 5px;
}

.result {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0 50px;
}

.result .info {
  max-width: 125px;
  align-self: flex-start;
  flex-grow: 1;
  margin-top: 10px;
  padding: 5px 0px;
  margin: 0 15px;
}

.info b {
  font-size: 12px;
}

.area table {
  width: 100%;
}

.area table tr {
  height: 100%;
  margin-bottom: 15px;
  display: flex;
  flex-direction: row;
}

.area table tr th, td {
  flex-grow: 1;
  max-width: 50%;
  border-bottom: 1px solid #d6d6d6;
}
</style>
