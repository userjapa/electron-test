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
                <nuxt-link to="/">
                  <button>Voltar</button>
                </nuxt-link>
              </div>
              <div class="button">
                <button type="button" name="add_game" @click="openModal()">Adicionar Jogo</button>
              </div>
            </div>
          </div>
          <div class="area">
            Sorteio de {{ formatDateWeek(game.date) }}
          </div>
          <div class="area no-border" v-if="game && game.result.length > 0">
            <div class="info">
              Resultado: <b v-for="(n, index) in sortNumbers(game.result)">{{ `${n}${index !== (game.result.length - 1)?', ':'.'}` }}</b>
            </div>
            <div class="info space" v-if="game.checked">
              Nº Acertos: <b>11: {{corrects[11]}} | 12: {{corrects[12]}} | 13: {{corrects[13]}} | 14: {{corrects[14]}} | 15: {{corrects[15]}}.</b>
            </div>
            <div class="info dad">
              <div class="button small">
                <button class="right" @click="editResult(game.result)">Editar Resultado</button>
              </div>
              <div class="button small">
                <button class="left" @click="verify(game)">Verificar Jogos</button>
              </div>
            </div>
          </div>
          <div class="area" v-if="!game || game.result.length === 0">
            <div class="info">
              <b>Nenhum Resultado Registrado</b>
            </div>
            <div class="info">
              <button @click="addResult()">Adicionar Resultado</button>
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
                    <tr v-for="(g, index) in game.games" :style="{'background-color': g.score >= 11?'#d6d6d6':''}">
                      <td @click="openGame(g.numbers)">{{game.checked?`${g.score} Acertos`:'Não Verificado'}}</td>
                      <td @click="openGame(g.numbers)">
                        <b v-for="(num, index) in sortNumbers(g.numbers)">
                          {{ `${num}${index !== (g.numbers.length - 1)?', ':'.'}` }}
                        </b>
                      </td>
                      <td>
                        <div class="button action">
                          <button class="right" @click="editGame(index, g.numbers)">Editar</button>
                        </div>
                        <div class="button action">
                          <button class="left" @click="remove(index)">Remover</button>
                        </div>
                      </td>
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
    <FormGame v-show="showModal" :jogo="game" :edit="edit" :result="result"/>
  </div>
</template>

<script>
import FormGame from '@/components/FormGame'
import { gameBus } from '@/components/form-game'

export default {
  computed: {
    game () {
      const game = this.$store.state.game
      if (game.checked) {
        const sorted = game.games.sort((before, current) => current.score - before.score)

        this.$store.state.game.games = sorted
      }
      return this.$store.state.game
    }
  },
  layout: 'sample',
  data () {
    return {
      showModal: false,
      edit: null,
      result: false,
      corrects: {
        11: 0,
        12: 0,
        13: 0,
        14: 0,
        15: 0,
      }
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
    remove: async function (index) {
      this.game.games.splice(index, 1)
      await this.$store.dispatch('change', this.game)
    },
    openGame: function (numbers) {
      gameBus.$emit('open', numbers)
      this.$data.showModal = true
    },
    editGame: function (index, numbers) {
      this.$data.edit = index
      this.openGame(numbers)
    },
    addResult: function () {
      gameBus.$emit('open', [])
      this.$data.result = true
      this.$data.showModal = true
    },
    editResult: function (numbers) {
      gameBus.$emit('open', numbers)
      this.$data.result = true
      this.$data.edit = -1
      this.$data.showModal = true
    },
    sortNumbers: function (numbers) {
      const copy = numbers.slice()
      const sorted = copy.sort((before, current) => before - current)
      return sorted
    },
    verify: async function (game) {
      if (game.games.length === 0) {
        alert('Deve ser Cadastrado algum Jogo!')
        return;
      }
      let countHits = 0
      for (const round of game.games) {
        let countScore = 0
        for (const number of round.numbers) {
          if (game.result.indexOf(number) > -1) countScore++
        }
        if (countScore >= 11) countHits++
        round.score = countScore
      }
      game.hits = countHits
      game.checked = true
      await this.$store.dispatch('change', game)
      this.getScores()
      alert(`Jogos verificados! ${game.hits} Jogos Premiados!`)
    },
    formatDateWeek: function (date) {
      const day = new Date(date)
      const dayOfWeek = day.getUTCDay()
      if (dayOfWeek === 0 || dayOfWeek === 1 || dayOfWeek === 6) return 'Segunda'
      else if (dayOfWeek === 2 || dayOfWeek === 3) return 'Quarta'
      else if (dayOfWeek === 4 || dayOfWeek === 5) return 'Sexta'
      else return ''
    },
    getScores: function () {
      const filtered = this.game.games.filter(x => x.score >= 11)
      for (let x of filtered) {
        this.corrects[x.score]++
      }
    }
  },
  mounted () {
    gameBus.$on('close', () => {
      this.$data.showModal = false
      if (this.$data.edit !== null) this.$data.edit = null
      if (this.$data.result) this.$data.result = false
    })

    this.getScores()
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
  border: 1px solid white;
  outline: none;
}

.button button:hover {
  background-color: white;
  border-color: black;
  cursor: pointer;
}

.button button:active {
  color: white;
  background-color: #d6d6d6;
  border: 1px solid black;
}

.info * {
  margin: 5px;
}

.info button {
  padding: 7px;
  border-radius: 5px;
  border: 1px solid white;
  outline: none;
}

.info button:hover {
  background-color: white;
  border-color: black;
}

.info button:active {
  color: white;
  background-color: #d6d6d6;
  border: 1px solid black;
}

.small {
  padding: 10px !important;
  margin: 0 auto;
  align-self: center;
  flex-grow: 1;
}

.dad {
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
}

.area table {
  width: 100%;
}

.area table tr {
  width: 100%;
  height: 100%;
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  position: relative;
  padding-top: 5px;
}

.area table tr th, td {
  width: 33%;
  height: 100%;
  flex-grow: 1;
  max-width: 50%;
  margin: auto;
  padding-bottom: 10px
}

.action {
  padding: 0;
  width: 49%;
  margin: 0 !important;
  position: relative;
  float: left;
}

.action button {
  max-width: 100% !important;
  border: 0;
  padding: 5px;
  margin: 0 7px;
  border: 1px solid #d6d6d6;
  outline: none;
}

.action button:hover {
  background-color: white;
  border-color: black;
  cursor: pointer;
}

.action button:active {
  color: white;
  background-color: #d6d6d6;
  border: 1px solid black;
}

.right {
  float: right;
}

.left {
  float: left;
}

.space {
  padding-top: 10px;
  padding-bottom: 5px;
  border-bottom: 1px solid #d6d6d6;
}

.no-border {
  border: 0;
}

</style>
