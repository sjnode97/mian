
import { setLocalStorage } from '@/utils/auth'
const state = {
  station: '',
  city: ''
}

const mutations = {
  SET_STATION: (state, station) => {
    state.station = station
  },
  SET_CITY: (state, city) => {
    state.city = city
  }
}

const actions = {
  setStation({ commit }, station) {
    return new Promise(resolve => {
      commit('SET_STATION', station)
      setLocalStorage('station', station)
      resolve(station)
    })
  },
  setCity({ commit }, city) {
    return new Promise(resolve => {
      commit('SET_CITY', city)
      setLocalStorage('city', city)
      resolve(city)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
