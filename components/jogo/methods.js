export default {
  select: function(number, element) {
    const index = this.numbers.indexOf(number)
    if (index > -1) {
      element.style['background-color'] = ''
      element.style['color'] = 'black'
      this.numbers.splice(index, 1)
    } else {
      if (this.numbers.length === 15) {
        alert('Permitido Somente 15 números!')
      } else {
        element.style['background-color'] = '#d6d6d6'
        element.style['color'] = 'white'
        this.numbers.push(number)
      }
    }
  }
}
