// search模块的小仓库
import { reqGoodInfo, reqAddOrUpdateShopCart } from '@/api/index.js'
// 封装游客身份模块的uuid-->生成一个随机的字符串(不能再变了)
import { getUUID } from '@/utils/uuid_token.js'
const state = {
  goodsInfo: {},
  // 游客的临时身份
  uuid_token: getUUID()
}
const actions = {
  async getGoodsInfo ({ commit }, skuId) {
    const res = await reqGoodInfo(skuId)
    if (res.code === 200) {
      commit('GETGOODSINFO', res.data)
    }
  },
  // 将产品添加到购物车中
  async addOrUpdateShopCart ({ commit }, { skuId, skuNum }) {
    // 加入购物车,返回结果
    // 加入购物车后,前台将参数带给服务器
    // 服务器写入成功,并没有返回其他的数据,只是返回code==200
    // 不用进行三连环存储
    const result = await reqAddOrUpdateShopCart(skuId, skuNum)
    // 当前函数执行返回的是promise
    if (result.code === 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('fail'))
    }
  }
}
const mutations = {
  GETGOODSINFO (state, goodsInfo) {
    state.goodsInfo = goodsInfo
  }
}
const getters = {
  categoryView () {
    // 当前仓库的state
    // 比如state.info初始是一个undefined,其中是没有数据的,在数据从服务器返回的中间是没有数据
    // 当前计算出来的属性值至少是一个空对象,
    return state.goodsInfo.categoryView || {}
  },
  skuInfo () {
    return state.goodsInfo.skuInfo || {}
  },
  spuSaleAttrList () {
    return state.goodsInfo.spuSaleAttrList || []
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
