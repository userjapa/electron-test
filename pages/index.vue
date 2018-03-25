<template>
  <div ref="index-page">
    <div class="view">
      <div class="section no-border">
        <h2>Sorteios</h2>
      </div>
      <div class="section">
        <div class="view">
          <div class="section">
            <div class="view row">
              <div class="button-add">
                <button type="button" name="add_game" @click="createGame()">Adicionar Sorteio</button>
              </div>
              <div class="button-add">
                <button type="button" name="import_data" @click="importDatabase()">Importar Dados Sorteio</button>
                <input type="file" ref="upload_file" style="display: none;" @change="changed">
              </div>
              <div class="button-add">
                <button type="button" name="export_data" @click="exportDatabase()">Exportar Dados</button>
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
      return this.$store.state.g.games
    },
    file () {
      return this.$store.state.d.file
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
    },
    importDatabase () {
      const uploader = this.$refs['upload_file']
      uploader.click()
    },
    async exportDatabase () {
      const index = this.$refs['index-page']
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

.row {
  flex-direction: row;
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
  border-radius: 10px;
  outline: none;
  background-color: rgba(147, 9, 137, 0.85);
  border: 2px solid #930989;
  color: white;
}

.button-add button:hover {
  color: #930989;
  background-color: #fff;
  cursor: pointer;
}

.button-add button:active {
  color: black;
  background-color: rgba(147, 9, 137, 0.85);
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
