import gameBus from './event-bus'

export default function () {
  gameBus.$on('close', () => {
    this.$data.numbers = []
  })
  gameBus.$on('open', numbers => {
    this.$data.numbers = numbers.slice()
  })
}
