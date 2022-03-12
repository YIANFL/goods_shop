// 导入请求函数
import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLogout } from '@/api'
import { setToken, getToken, removeToken } from '@/utils/token.js'
const state = {
  code: '',
  token: getToken(),
  userInfo: {}
}
const actions = {
  async getCode ({ commit }, phone) {
    const result = await reqGetCode(phone)
    if (result.code === 200) {
      commit('GETCODE', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('fail'))
    }
  },
  // 用户的注册
  async userRegister ({ commit }, user) {
    const result = await reqUserRegister(user)
    // console.log(result)
    if (result.code === 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('fail'))
    }
  },
  // 登陆业务(token)
  async userLogin ({ commit }, data) {
    const result = await reqUserLogin(data)
    // console.log(result)
    if (result.code === 200) {
      commit('USERLOGIN', result.data.token)
      // 保存token到本体存储
      setToken(result.data.token)
      return 'ok'
    } else {
      return Promise(new Error('fail'))
    }
  },
  // 获取用户的信息
  async getUserInfo ({ commit }) {
    const result = await reqUserInfo()
    // console.log(result)
    // alert(111)
    if (result.code === 200) {
      // 提交用户的信息
      // console.log(result.data.token)
      commit('GETUSERINFO', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('fail'))
    }
  },
  // 退出登陆,只是通知服务器
  async userLogout ({ commit }) {
    const result = await reqLogout()
    console.log(result)
    if (result.code === 200) {
      commit('CLEAR')
      return 'ok'
    } else {
      return Promise.reject(new Error('fail'))
    }
  }
}
const mutations = {
  GETCODE (state, code) {
    state.code = code
  },
  USERLOGIN (state, token) {
    state.token = token
  },
  GETUSERINFO (state, userInfo) {
    state.userInfo = userInfo
  },
  // 清除数据
  CLEAR (state) {
    // 把vuex中的相关信息置空
    state.token = ''
    state.userInfo = {}
    // 本地存储置空
    removeToken()
  }

}
const getters = {}

export default {
  state,
  actions,
  mutations,
  getters
}
