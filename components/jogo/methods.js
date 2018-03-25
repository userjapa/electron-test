export default {
  select: function(number, element) {
    const index = this.numbers.indexOf(number)
    if (index > -1) {
      element.style['background-color'] = ''
      element.style['color'] = '#930989 !important'
      this.numbers.splice(index, 1)
    } else {
      if (this.numbers.length === 15) {
        alert('Permitido Somente 15 números!')
      } else {
        element.style['background-color'] = 'rgba(147, 9, 137, 0.85)'
        element.style['color'] = 'black !important'
        this.numbers.push(number)
      }
    }
  }
}
