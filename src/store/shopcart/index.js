// search模块的小仓库
import { reqCartList, reqDeleteCartById, reqUpdateCheckedByid } from '@/api/index.js'
const state = {
  cartList: []
}
const actions = {
  async getCartList ({ commit }) {
    const result = await reqCartList()
    // console.log(result)
    if (result.code === 200) {
      commit('GETCARTLIST', result.data)
    }
  },
  // 删除购物车某一个产品
  async deleteCartListBySkuId ({ commit }, skuId) {
    // 这个请求是没有返回数据的,组件中是需要知道成功与失败的
    const result = await reqDeleteCartById(skuId)
    console.log(result)
    if (result.code === 200) {
      return 'ok'
    } else {
      return Promise(new Error('fail'))
    }
  },
  // 修改购物车某个产品的选中状态
  async updateCheckedByid ({ commit }, { skuId, isChecked }) {
    const result = await reqUpdateCheckedByid(skuId, isChecked)
    if (result.code === 200) {
      return 'ok'
    } else {
      return Promise(new Error('fail'))
    }
  },
  // 删除全部勾选的产品
  // 可以传递context
  // context对象中包含dispatch和commit(可以再次派发action),还有state,getters中的数据
  // 要想调用仓库中的函数,可以通过context中dispatch派发action
  deleteAllCheckedCart ({ dispatch, getters }) {
    // contex就是小仓库,commit提交mutations修改state,getters计算属性,dispatch派发action,state当前仓库中的数据
    // 获取购物车中全部的产品
    const PromiseAll = []
    getters.cartList.cartInfoList.forEach(item => {
      // 返回的是一个promise
      // eslint-disable-next-line eqeqeq
      const promise = item.isChecked == 1 ? dispatch('deleteCartListBySkuId', item.skuId) : ''
      // console.log(promise, 1)
      // 将返回的promise添加到promise数组中
      PromiseAll.push(promise)
    })
    // console.log(PromiseAll)
    // Promise.All([p1,p2]) 数组中的promise都成功,返回成功,如果有一个失败就失败
    return Promise(PromiseAll)
  },
  // 修改全部产品的状态
  updateAllCartChecked ({ dispatch }, isChecked) {
    // console.log(state)
    // console.log(isChecked)
    const promiseAll = []
    state.cartList[0].cartInfoList.forEach(item => {
      const promise = dispatch('updateCheckedByid', { skuId: item.skuId, isChecked })
      promiseAll.push(promise)
    })
    return Promise.all(promiseAll)
  }
}

const mutations = {
  GETCARTLIST (state, cartList) {
    state.cartList = cartList
  }
}
const getters = {
  cartList (state) {
    return state.cartList[0] || {}
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
