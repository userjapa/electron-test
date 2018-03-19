import gameBus from './event-bus'

export default function () {
  gameBus.$on('open', numbers => {
    this.$data.numbers = numbers
  })
}
