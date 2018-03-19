import { gameBus } from './../form-game'

export default function () {
  gameBus.$on('open', numbers => {
    for (let x = 1; x<=25; x++) {
      let el = this.$refs[x][0]
      if (el) {
        el.style['background-color'] = ''
        el.style['color'] = '#000'
      }
    }
    if (numbers.length > 0) {
      for (let num of numbers) {
        let el = this.$refs[num][0]
        if (el) {
          el.style['background-color'] = '#d6d6d6'
          el.style['color'] = 'white'
        }
      }
    }
  })
}
