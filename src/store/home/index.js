import { reqCategoryList, reqGetBannerList, reqFloorList } from '@/api/index.js'
// home模块的小仓库
const state = {
  // state中数据默认初始值的类型与服务器返回的数据类型一致
  categoryList: [],
  // 轮播图的数组
  bannerList: [],
  floorList: []
}
const mutations = {
  // 接受的第一个形参接受state,第二个形参接收,commit传递过来的数据
  CATEGORY (state, categoryList) {
    state.categoryList = categoryList
  },
  GETBANNERLIST (state, bannerList) {
    state.bannerList = bannerList
  },
  GETFLOORLIST (state, floorList) {
    state.floorList = floorList
  }
}
const actions = {
  // 通过API里面的函数调用,向服务器发送请求,获取服务器的数据
  // 接受的'action'(categoryList),接收传递一个context对象,通过context.commit将请求到的数据提交到mutation
  // 在mutation中将数据传递给state
  async categoryList ({ commit }) {
    const result = await reqCategoryList()
    // console.log(result)
    if (result.code === 200) {
      // 提交一个事件及响应的数据
      commit('CATEGORY', result.data)
      // 在这里可以更改state中数组的长度
      state.categoryList.length = 16
    }
  },
  // 获取首页三连环的数据
  async getBannerList ({ commit }) {
    const result = await reqGetBannerList()
    // console.log(result)
    if (result.code === 200) {
      commit('GETBANNERLIST', result.data)
    }
  },
  // 获取floor组件数据
  async getFloorList ({ commit }) {
    var result = await reqFloorList()
    if (result.code === 200) {
      commit('GETFLOORLIST', result.data)
    }
  }

}
const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}
