import gameBus from './event-bus'

export default {
  close: function () {
    this.$data.numbers = []
    gameBus.$emit('close')
  },
  addGame: async function (game) {
    if (this.$data.numbers.length === 15) {
      game.games.push({ numbers: this.$data.numbers, score: 0, id: game.games.length + 1 })
      await this.$store.dispatch('change', game)
      gameBus.$emit('close')
      this.$data.numbers = []
    } else {
      alert('Devem ser Selecionados 15 números!')
      this.$data.numbers = this.$data.numbers
    }
  },
  addResult: async function (game) {
    if (this.$data.numbers.length === 15) {
      game.result = this.$data.numbers
      await this.$store.dispatch('change', game)
      gameBus.$emit('close')
      this.$data.numbers = []
      gameBus.$emit('verify-game', game)
    } else {
      alert('Devem ser Selecionados 15 números!')
      this.$data.numbers = this.$data.numbers
    }
  },
  editGame: async function (game) {
    if (this.$data.numbers.length === 15) {
      game.games[this.edit].numbers = this.$data.numbers
      await this.$store.dispatch('change', game)
      gameBus.$emit('close')
      this.$data.numbers = []
    } else {
      alert('Devem ser Selecionados 15 números!')
      this.$data.numbers = this.$data.numbers
    }
  }
}
