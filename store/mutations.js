import { formatDate } from './filters'

export default {
  gotMain (state, message) {
    state.message = message
  },
  gotGames (state, games) {
    state.games = games
    state.games.map(formatDate)
  },
  gotById (state, game) {
    state.game = game
    $nuxt.$router.push({ path: `/${game['_id']}` })
  },
  createdGame (state, game) {
    state.games.push(game)
    state.game = game
    $nuxt.$router.push({ path: `/${game['_id']}` })
  },
  deleted (state, id) {
    const index = state.games.findIndex(el => el['_id'] === id)
    state.games.splice(index, 1)
  }
}
