<template>
  <div ref="index">
    <div class="screen" v-if="!loaded">
      <div class="area">
        <h2>Carregando...</h2>
      </div>
    </div>
    <div class="screen" v-if="loaded">
      <div class="area no-border">
        <h2>Sorteio</h2>
      </div>
      <div class="area">
        <div class="screen row">
          <div class=" area button no-border">
            <button type="button" name="import_data" @click="importDatabase()">Importar Dados Sorteio</button>
            <input type="file" ref="upload_file" style="display: none;" @change="changed">
          </div>
          <div class="area button no-border">
            <button type="button" name="export_data" @click="exportDatabase()">Exportar Dados</button>
          </div>
        </div>
      </div>
      <div class="area">
        <div class="screen">
          <div class="area no-border">
            <div class="screen options">
              <!-- <div class="button">
                <nuxt-link to="/">
                  <button>Voltar</button>
                </nuxt-link>
              </div> -->
              <div class="button" v-if="!game.checked">
                <button type="button" name="add_game" @click="openModal()">Adicionar Jogo</button>
              </div>
              <div class="button" v-if="game.checked">
                <button type="button" name="add_game" @click="createGame()">Novo Sorteio</button>
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
              <button @click="addResult()" v-if="game.games.length > 0">Adicionar Resultado</button>
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
                      <th class="id">ID</th>
                      <th>Acertos</th>
                      <th>Números</th>
                      <th>Editar/Excluir</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(g, index) in game.checked?game.games.filter(x => x.score >= 11):game.games" :style="{'background-color': g.score >= 11?'#d6d6d6':''}">
                      <td class="id">{{g.id}}</td>
                      <td @click="openGame(g.numbers)">{{game.checked?`${g.score} Acertos`:'Não Verificado'}}</td>
                      <td @click="openGame(g.numbers)">
                        <b v-for="(num, index) in sortNumbers(g.numbers)">
                          {{ `${num}${index !== (g.numbers.length - 1)?', ':'.'}` }}
                        </b>
                      </td>
                      <td>
                        <div class="button action">
                          <button class="right" @click="editGame(index, g.numbers)" :disabled="game.checked">Editar</button>
                        </div>
                        <div class="button action">
                          <button class="left" @click="remove(index)" :disabled="game.checked">Remover</button>
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
    file () {
      return this.$store.state.d.file
    },
    game () {
      const length = this.$store.state.g.games.length
      const game = Object.assign({}, this.$store.state.g.games[0])
      return game
    }
  },
  layout: 'sample',
  data () {
    return {
      showModal: false,
      edit: null,
      result: false,
      corrects: {},
      loaded: false
    }
  },
  components: {
    FormGame
  },
  methods: {
    async createGame () {
      await this.$store.dispatch('createNewGame')
      await this.$store.dispatch('fetchGames')
    },
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
      let copy = {
        11: 0,
        12: 0,
        13: 0,
        14: 0,
        15: 0,
      }
      const filtered = this.game.games.filter(x => x.score >= 11)
      for (let x of filtered) {
        copy[x.score]++
      }
      this.corrects = copy
    },
    importDatabase () {
      const uploader = this.$refs['upload_file']
      uploader.click()
    },
    async exportDatabase () {
      const index = this.$refs['index']
      await this.$store.dispatch('exportDatabase')
      const url = window.URL.createObjectURL(new Blob([this.file]))
      let link = document.createElement('a')
      link.style.display = 'none'
      link.setAttribute('download', `database-${Date.now()}.db`)
      link.href = url
      index.appendChild(link)
      link.click()
      index.removeChild(link)
    },
    async changed (ev) {
      try {
        const file = ev.target.files[0]
        await this.$store.dispatch('importDatabase', file)
      } catch (error) {
        console.warn(error)
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
  },
  async beforeCreate () {
    this.loaded = false
    await this.$store.dispatch('fetchGames')
    const length = this.$store.state.g.games.length
    if (length === 0) await this.$store.dispatch('createNewGame')
    this.loaded = true
    console.log('called', length)
    console.log('Game: ', this.$store.state.g.games[0])
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

.row {
  flex-direction: row;
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
  background-color: rgba(147, 9, 137, 0.85);
  border: 2px solid #930989;
  color: white;
  border-radius: 10px;
  outline: none;
}

.button button:hover {
  color: #930989;
  background-color: #fff;
  cursor: pointer;
}

.button button:active {
  color: black;
  background-color: rgba(147, 9, 137, 0.85);
}

.info * {
  margin: 5px;
}

.info button {
  padding: 7px;
  background-color: rgba(147, 9, 137, 0.85);
  border: 2px solid #930989;
  color: white;
  border-radius: 10px;
  outline: none;
}

.info button:hover {
  color: #930989;
  background-color: #fff;
  cursor: pointer;
}

.info button:active {
  color: black;
  background-color: rgba(147, 9, 137, 0.85);
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

table {
  width: 100%;
}

table tr {
  height: 100%;
  margin-bottom: 15px;
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #d6d6d6;
}

table tr td {
  cursor: pointer;
}

table tr th, td {
  flex-grow: 1;
  max-width: 25%;
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
  margin-left: 5px;
  margin-right: 5px;
}

.area table tr th, td {
  width: 30%;
  height: 100%;
  flex-grow: 1;
  max-width: 50%;
  margin: auto;
  padding-bottom: 10px
}

.id {
  width: 10% !important;
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
  padding: 5px;
  margin: 0 7px;
  background-color: rgba(147, 9, 137, 0.85);
  border: 2px solid #930989;
  color: white;
  outline: none;
}

.action button:hover {
  color: #930989;
  background-color: #fff;
  cursor: pointer;
}

.action button:active {
  color: black;
  background-color: rgba(147, 9, 137, 0.85);
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
