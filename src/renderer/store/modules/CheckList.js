const fs = require('fs')
const path = require('path')
const Nedb = require('nedb')

const state = {
  checkList: [],
  checkListDb: null
}

const mutations = {
  RESET_DEFAULT_CHECK_LIST (state) {
    state.checkListDb.remove({}, { multi: true }, (_err, _numRemoved) => {})
    state.checkListDb.insert(JSON.parse(fs.readFileSync(path.join(__static, '/defaultcheckList.json'), 'utf8')))
  },
  SET_CHECK_LIST (state, data) {
    state.checkList = data
  },
  SET_CHECK_LIST_DB (state) {
    state.checkListDb = new Nedb({ filename: path.join(__static, '/checkList.db'), autoload: true })
  },
  INSERT_CHECK_LIST_DB (state, data) {
    state.checkListDb.insert(data)
  }
}

const actions = {
  resetDefaultCheckList ({ commit }) {
    commit('RESET_DEFAULT_CHECK_LIST')
  },
  setCheckList ({ commit }, data) {
    commit('SET_CHECK_LIST', data)
  },
  setCheckListDb ({ commit }) {
    commit('SET_CHECK_LIST_DB')
  },
  insertCheckListDb ({ commit }, data) {
    commit('INSERT_CHECK_LIST_DB', data)
  }
}

const getters = {
  getCheckList: () => { return state.checkList },
  getCheckListDb: () => { return state.checkListDb }
}

export default {
  state,
  mutations,
  actions,
  getters
}
