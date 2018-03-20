<template>
  <div>
    <div class="view">
      <div class="section no-border">
        <h2>Sorteios</h2>
      </div>
      <div class="section">
        <div class="view">
          <div class="section">
            <div class="view">
              <div class="button-add">
                <button type="button" name="add_game" @click="createGame()">Adicionar Sorteio</button>
              </div>
            </div>
          </div>
          <div class="section">
            <table>
              <thead>
                <tr>
                  <th>Nº de Jogos</th>
                  <th>Data de Cadastro</th>
                  <th>Resultado</th>
                  <th>Excluir</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="game in games">
                  <td @click="goTo(game['_id'])">{{ game.games.length }}</td>
                  <td @click="goTo(game['_id'])">{{ game.date }}</td>
                  <td @click="goTo(game['_id'])">{{ !game.checked?'Não Conferido':`${game.hits} acertos` }}</td>
                  <td class="icon-trash"><button @click="deleteGame(game['_id'])"><img src="~/assets/images/trash-can.png" alt="Deletar Sorteio"></button></td>
                </tr>
                <!-- <tr v-if="!hasData">
                  <td class="exception"><h2>Não há Sorteio Registrado!</h2></td>
                </tr> -->
              </tbody>
            </table>
          </div>
          <div class="section" v-if="!hasData">
            <h2>Não há Sorteio Registrado!</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  asyncData ({ store }) {
    store.dispatch('fetchGames')
  },
  computed: {
    games () {
      return this.$store.state.games
    }
  },
  layout: 'sample',
  data () {
    return {
      hasData: true
    }
  },
  methods: {
    async createGame () {
      this.hasData = true
      await this.$store.dispatch('createNewGame')
    },
    async deleteGame (id) {
      if (this.games.length === 1) this.hasData = false
      await this.$store.dispatch('removeGame', id)
    },
    async goTo (id) {
      await this.$store.dispatch('getById', id)
      $nuxt.$router.push(`/${id}`)
    }
  },
  async created () {
    await this.$store.dispatch('fetchGames')
    if (this.games && this.games.length > 0) this.hasData = true
    else this.hasData = false
  }
}
</script>

<style>
.view {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.section {
  width: 100%;
  background-color: #fff;
  align-self: center;
  flex-grow: 1;
  margin-top: 10px;
  padding: 5px 0px;
  text-align: center;
  border-top: 2px solid #d6d6d6;
}

.no-border {
  border: none;
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

.exception {
  flex-grow: 1;
  max-width: 100%;
  border: 0;
}

.button-add {
  align-self: flex-start;
  margin-left: 4.5%;
  margin-top: 10px;
}

.button-add button {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid white;
  outline: none;
}

.button-add button:hover {
  background-color: white;
  border-color: black;
  cursor: pointer;
}

.button-add button:active {
  color: white;
  background-color: #d6d6d6;
  border: 1px solid black;
}

.icon-trash {
  padding: 0;
}

.icon-trash button {
  background-color: #fff;
  outline: none;
}

.icon-trash button img {
  max-width: 35px;
  margin: 0;
}

.icon-trash button, img {
  outline: none;
  cursor: pointer;
}
</style>
