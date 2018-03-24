<template>
  <div class="containt">
    <div class="intern">
      <h2>Estatísticas</h2>
    </div>
    <div class="intern">
      <div class="containt">
        <div class="intern" v-if="rounds.length === 0 && numbers.length === 0">
          <h3>Não há jogos verificados para gerar estatística!</h3>
        </div>
      </div>
      <div class="containt less row" v-if="rounds.length > 0 || numbers.length > 0">
        <div class="intern statistic bord-right">
          <div class="containt">
            <div class="intern">
              <h3>Números mais premiados:</h3>
            </div>
            <div class="intern" v-if="commom.length === 0">
              <h3>Não há resultados registrados.</h3>
            </div>
            <div class="intern" v-if="commom.length > 0">
              <table>
                <thead>
                  <tr class="intern-row">
                    <th class="row-head">Número</th>
                    <th class="row-head">Repetições</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="element in commom" class="intern-row">
                    <td class="row-body">{{element.number}}</td>
                    <td class="row-body">{{element.times}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="intern statistic bord-left">
          <div class="containt">
            <div class="intern">
              <h3>Números mais Jogados:</h3>
            </div>
            <div class="intern" v-if="played.length === 0">
              <h3>Não há números apostados!</h3>
            </div>
            <div class="intern" v-if="played.length > 0">
              <table>
                <thead>
                  <tr class="intern-row">
                    <th class="row-head">Número</th>
                    <th class="row-head">Repetições</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="element in played" class="intern-row">
                    <td class="row-body">{{element.number}}</td>
                    <td class="row-body">{{element.times}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
statistic
<script>
export default {
  asyncData ({ store }) {
    store.dispatch('fetchGames')
  },
  computed: {
    rounds () {
      return this.$store.state.g.games.filter(x => x.checked)
    },
    numbers () {
      return this.$store.state.g.games.filter(x => x.games.length > 0)
    }
  },
  layout: 'sample',
  data () {
    return {
      played: [],
      commom: []
    }
  },
  mounted () {
    // Getting Most Commom Numbers Results
    const commom = []
    for (const game of this.rounds) {
      for (const num of game.result) {
        const index = commom.findIndex(el => el.number === num)
        if (index > -1) commom[index].times++
        else commom.push({number: num, times: 1})
      }
    }
    const commomTimes = commom.sort((before, current) => current.times - before.times)
    this.commom = commomTimes

    // Getting Most Played Numbers
    const played = []
    for (const game of this.numbers) {
      for (const play of game.games) {
        for (const num of play.numbers) {
          const index = played.findIndex(el => el.number === num)
          if (index > -1) played[index].times++
          else played.push({number: num, times: 1})
        }
      }
    }
    const playedTimes = played.sort((before, current) => current.times - before.times)
    this.played = playedTimes
  }
}
</script>

<style>
.containt {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 20px 0;
  flex-direction: column;
}

.intern {
  width: 100%;
  height: 100%;
  flex-grow: 1;
  align-self: center;
  text-align: center;
}

.main {
  flex-direction: row;
}

.row {
  flex-direction: row;
}

.statistic {
  max-width: 50%;
  padding: 5px 0;
  align-self: flex-start;
  text-align: start;
}

.intern-row {
  margin: 0;
}

.intern-row .row-head, .row-body {
  min-width: 50%;
  padding: 3px 0 2px 0;
}

.bord-left {
  border-left: 1px solid #d6d6d6
}

.bord-right {
  border-right: 1px solid #d6d6d6
}
</style>
