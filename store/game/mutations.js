export default {
  gotGames (state, games) {
    state.games = games
  },
  gotById (state, game) {
    state.game = game
  },
  createdGame (state, game) {
    state.games.push(game)
    state.game = game
  },
  deleted (state, id) {
    const index = state.games.findIndex(el => el['_id'] === id)
    state.games.splice(index, 1)
  }
}
