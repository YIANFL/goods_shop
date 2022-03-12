// 导入vue
import Vue from 'vue'
// 导入vuex
import Vuex from 'vuex'
// 将小仓库进行引入
import home from './home/index.js'
import search from './search/index.js'
import detail from './detail'
import shopcart from './shopcart'
import users from './users'
import trade from './trade/trade.js'

// 挂载为插件
Vue.use(Vuex)

// 1总体仓库
// 向外暴露Store类的一个实例,传出一个配置对象
// export default new Vuex.Store({
//   // 这是仓库存储数据的地方
//   state: {
//     // count: 1
//   },
//   // 修改state的唯一手段
//   mutations: {
//     // ADD (state, count) {
//     //   state.count++
//     // }
//   },
//   // 处理action,可以处理自己的业务逻辑,也可以处理异步
//   actions: {
//     // 这里可以进行修改业务逻辑但是不能进行更改state数据
//     // 传递给mutations进行更改
//     // add ({ commit }) {
//     //   commit('ADD')
//     // }
//   },
//   modules: {
//   },
//   // 与计算属性类似,用于简化仓库数据,让组建获取仓库的数据更加方便
//   getters: {

//   }
// })

export default new Vuex.Store({
// 实现Vuex仓库的模块化开发存储
// 在modules中注册小仓库
  modules: {
    home,
    search,
    detail,
    shopcart,
    users,
    trade
  }
})
