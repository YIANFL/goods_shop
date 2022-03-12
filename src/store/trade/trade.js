import { reqAddressInfo, reqOrderInfo } from '../../api'

const state = {
  address: [],
  orderInfo: {}
}
const actions = {
  // 获取用户地址信息
  async getUserAddress ({ commit }) {
    const result = await reqAddressInfo()
    // console.log(result)
    if (result.code === 200) {
      commit('GETUSERADDRESS', result.data)
    }
  },
  // 获取商品清单的信息
  async getOrderInfo ({ commit }) {
    const result = await reqOrderInfo()
    if (result.code === 200) {
      commit('GETORDERINFO', result.data)
    }
  }
}
const mutations = {
  GETUSERADDRESS (state, address) {
    state.address = address
  },
  GETORDERINFO (state, orderInfo) {
    state.orderInfo = orderInfo
  }
}
const getters = {}

export default {
  state,
  actions,
  mutations,
  getters
}
