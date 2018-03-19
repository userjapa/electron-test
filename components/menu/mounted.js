export default function () {
  const options = this.$refs['menu'].childNodes
  for (let x of options) {
    if (x.href === window.location.href) x.style['background-color'] = '#fff'
  }
}
