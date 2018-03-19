export default el => {
  const date = new Date(el.date)
  let result = ''
  if (date.getDate() < 10) result += `0${date.getDate()}/`
  else result += `${date.getDate()}/`
  if (date.getMonth() < 9) result += `0${date.getMonth()+1}/`
  else result += `${date.getMonth()+1}/`
  result += `${date.getFullYear()} `
  if (date.getHours() < 10) result += `0${date.getHours()}:`
  else result += `${date.getHours()}:`
  if (date.getMinutes() < 10) result += `0${date.getMinutes()}:`
  else result += `${date.getMinutes()}:`
  if (date.getSeconds() < 10) result += `0${date.getSeconds()}`
  else result += `${date.getSeconds()}`
  el.date = result
  return el
}
