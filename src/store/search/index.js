// search模块的小仓库
import { reqGetSearchInfo } from '../../api'
const state = {
  // 仓库中的数据
  searchList: {}
}
const mutations = {
  GETSEARCHLIST (state, searchList) {
    state.searchList = searchList
  }
}
const actions = {
  // 获取search模块数据
  // action函数可以有第二个参数,载荷
  // params形参是当用户派发action的时候传递过来的,至少是一个空对象
  async getSearchList ({ commit }, params = {}) {
    // 这个函数至少要传入一个空对象
    const result = await reqGetSearchInfo(params)
    if (result.code === 200) {
      commit('GETSEARCHLIST', result.data)
    }
  }
}
const getters = {
  // 当前形参state是当前仓库的属性值,不是大仓库中的state
  goodsList (state) {
    // 这样写是有问题的
    // searchList开始是一个空对象,如果此时请求没有发出,空对象中没有goodsList,会返回undefined
    // searchList在数据返回后是是请求的数据
    return state.searchList.goodsList
  },
  trademarkList (state) {
    return state.searchList.trademarkList
  },
  attrsList (state) {
    return state.searchList.attrsList
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
