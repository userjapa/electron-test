import axios from 'axios'


export default {
  async importDatabase ({ dispatch }, file) {
    try {
      const formData = new FormData()
      formData.append("database", file)
      const res = await axios.post('http://localhost:4210/database', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      dispatch('fetchGames')
    } catch (error) {
      console.warn(error)
    }
  },
  async exportDatabase ({ commit }) {
    try {
      const { data } = await axios({
        url: 'http://localhost:4210/database/',
        method: 'GET',
        responseType: 'blob'
      })
      commit('databaseExported', data)
    } catch (error) {
      console.warn(error)
    }
  }
}
