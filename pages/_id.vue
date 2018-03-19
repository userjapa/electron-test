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
            Sorteio do dia {{ formatDate({ date: game.date }).date }}
          </div>
          <div class="area no-border" v-if="game && game.result.length > 0">
            <div class="info">
              Resultado: <b v-for="(n, index) in sortNumbers(game.result)">{{ `${n}${index !== (game.result.length - 1)?', ':'.'}` }}</b>
            </div>
            <div class="info space">
              Nº Acertos: <b>11: {{corrects[11]}} | 12: {{corrects[12]}} | 13: {{corrects[13]}} | 14: {{corrects[14]}} | 15: {{corrects[15]}}</b>.
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
            <div class="result">
              <div class="info">
                <b>Nenhum Resultado Registrado</b>
              </div>
              <div class="button">
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
                    <tr v-for="(g, index) in game.games">
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

import { formatDate } from '@/store/filters'

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
    formatDate,
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
      // await this.$store.dispatch('getById', game['_id'])
      alert(`Jogos verificados! ${game.hits} Jogos Premiados!`)
    }
  },
  mounted () {
    gameBus.$on('close', () => {
      this.$data.showModal = false
      if (this.$data.edit !== null) this.$data.edit = null
      if (this.$data.result) this.$data.result = false
    })

    const filtered = this.game.games.filter(x => x.score >= 11)
    for (let x of filtered) {
      this.corrects[x.score]++
    }
    console.log(this.corrects)
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

.result {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0 50px;
}

.result .info {
  max-width: 150px;
  align-self: flex-start;
  flex-grow: 1;
}

.result > .info {
  font-size: 15px;
  text-align: center;
  padding-top: 10px;
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
