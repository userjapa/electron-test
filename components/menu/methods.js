export default {
  select (ev) {
    const father = ev.target.parentNode
    const father_siblings = father.parentNode.childNodes
    for (let x of father_siblings) {
      if (x.href === father.href) x.style['background-color'] = '#fff'
      else x.style['background-color'] = '#d6d6d6'
    }
  }
}
