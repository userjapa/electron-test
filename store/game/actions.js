import axios from 'axios'

export default {
  async fetchGames ({ commit }) {
    try {
      const { data } = await axios.get('http://localhost:4210/game/')
      if (data.error) throw new Error('Failed to get Games!', data.error)
      else commit('gotGames', data.data)
    } catch (error) {
      console.warn(error)
    }
  },
  async createNewGame ({ commit }, name) {
    try {
      const game = {
        games: [],
        result: [],
        date: Date.now(),
        hits: 0,
        checked: false,
        name: name
      }
      const { data } = await axios.post('http://localhost:4210/game/', game)
      if (data.error) throw new Error('Failed to Create New Game!', data.error)
      else commit('createdGame', data.data)
    } catch (error) {
      console.warn(error)
    }
  },
  async getById ({ commit }, id) {
    try {
      const { data } = await axios.get(`http://localhost:4210/game/${id}`)
      if (data.error) throw new Error('Failed to get Games!', data.error)
      else commit('gotById', data.data)
    } catch (error) {
      console.warn(error)
    }
  },
  async removeGame({ commit }, id) {
    try {
      const { data } = await axios.delete(`http://localhost:4210/game/${id}`)
      if (data.error) throw new Error('Failed to Delete Game!', data.error)
      else commit('deleted', id)
    } catch (error) {
      console.warn(error)
    }
  },
  async change({ dispatch }, game) {
    try {
      const { data } = await axios.put(`http://localhost:4210/game/${game['_id']}`, game)
      if (data.error) throw new Error('Failed to Delete Game!', data.error)
    } catch (error) {
      console.warn(error)
    }
  }
}
