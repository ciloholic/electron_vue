const fs = require('fs')
const path = require('path')
const Nedb = require('nedb')

const state = {
  defaultCheckList: JSON.parse(fs.readFileSync(path.join(__static, '/defaultCheckList.json'), 'utf8')),
  checkListDb: new Nedb({ filename: path.join(__static, '/checkList.db'), autoload: true })
}

const mutations = {
  setDefaultCheckList (state, data) {
    state.defaultCheckList = data
  },
  setCheckListDb (state, data) {
    state.checkListDb = data
  },
  insertCheckListDb (state, data) {
    state.checkListDb.insert(data)
  }
}

const actions = {
  setDefaultCheckList ({ commit }, data) {
    commit('setDefaultCheckList', data)
  },
  setCheckListDb ({ commit }, data) {
    commit('setCheckListDb', data)
  },
  insertCheckListDb ({ commit }, data) {
    commit('insertCheckListDb', data)
  }
}

const getters = {
  getDefaultCheckList: function () {
    return state.defaultCheckList
  },
  getCheckListDb: function () {
    return state.checkListDb
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
