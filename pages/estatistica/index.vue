<template>
  <div class="containt">
    <div class="intern">
      <h2>Estatísticas</h2>
    </div>
    <div class="intern">
      <div class="containt">
        <div class="intern" v-if="rounds.length === 0">
          <h3>Não há jogos verificados para gerar estatística!</h3>
        </div>
      </div>
      <div class="containt less row" v-if="rounds.length !== 0">
        <div class="intern statistic">
          <div class="containt">
            <div class="intern">
              <h3>Números mais premiados:</h3>
            </div>
            <div class="intern">
              
            </div>
          </div>
        </div>
        <div class="intern statistic">
          <div class="containt">
            <div class="intern">
              <h3>Percentual de Acertos dos Jogos:</h3>
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
      return this.$store.state.games.filter(x => x.checked)
    }
  },
  layout: 'sample'
}
</script>

<style>
.containt {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 20px 30px;
  flex-direction: column;
}

.intern {
  width: 100%;
  height: 100%;
  flex-grow: 1;
  align-self: center;
  text-align: center;
}

.less {
  padding: 10px;
}

.row {
  flex-direction: row;
  flex-wrap: wrap;
}

.statistic {
  max-width: 45%;
  padding: 5px 30px;
  align-self: flex-start;
  text-align: start;
}
</style>
