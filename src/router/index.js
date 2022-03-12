import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入路由注册的数组文件
import routes from './routes.js'
import store from '@/store'

Vue.use(VueRouter)

// 重写VueRouter原型对象中的push方法
// 先把VueRouter的原型对象中的push保存一份
// originPush的函数指向为window
const originPush = VueRouter.prototype.push
const originReplace = VueRouter.prototype.replace
console.log(originPush)
// 重写push|replace
// 第一参数是传递的地址
// 第二个参数是成功
VueRouter.prototype.push = function (locaton, resolve, reject) {
  if (resolve && reject) {
    // 为了保证上下文的this指向是VueRouter实例,使用.call调用函数,并且改变原有函数的this指向
    originPush.call(this, location, resolve, reject)
  } else {
    originPush.call(this, locaton, () => {}, () => {})
  }
}

VueRouter.prototype.replace = function (locaton, resolve, reject) {
  if (resolve && reject) {
    // 为了保证上下文的this指向是VueRouter实例,使用.call调用函数,并且改变原有函数的this指向
    originReplace.call(this, location, resolve, reject)
  } else {
    originReplace.call(this, locaton, () => {}, () => {})
  }
}

const router = new VueRouter({
  routes,
  scrollBehavior (to, from, savedPosition) {
    // y=0表示,默认滚动条的位置
    return { y: 0 }
  }
})

// 在向外暴露之前需要一个全局前置守卫
router.beforeEach(async (to, from, next) => {
  // next() 表示放行 next(路由),next(false)
  // to可以获取到要跳转到的那个路由的信息
  // from可以获取到从哪个路由而来的信息
  // 用户登陆了就不能到登陆页面了,用户登陆了才会有token
  const token = store.state.users.token
  const name = store.state.users.userInfo.name
  if (token) {
    // 用户登陆了,还想去login,不行,重新回首页
    if (to.path === '/login' || to.path === '/register') {
      next('/')
    } else {
      // 要判断用户信息是不是有,在home页面一直发送action,获取用户数据,跳转到search页面没有发这个action,所以先判断在跳转
      //  判断是不是有用户信息,有就放行,没有就发送actions
      // 登陆了取得不是login
      // 跳转到的页面不是login，先看有没有用户信息，通过name进行判断，有就放行，没有就发送action进行请求，请求成功后放行
      if (name) {
        next()
      } else {
        // 没有用户信息,派发action
        // 点击登录之后，派发action获取用户的信息
        try {
          // 获取用户信息成功
          await store.dispatch('getUserInfo')
          next()
        } catch (error) {
          // token过期了,或者是失效了才能走到这个catch中,此时要清除token,再跳回login
          // 清除token,
          store.dispatch('userLogout')
          next('/login')
        }
      }
      next()
    }
  } else {
    // 后期再处理,未登录，路由的首位
    // 不能去center,pay,paysuccess,trade,去到这些页面需要进行跳转
    // 想去的地方，而没有去成的地方保存一下
    const toPath = to.path
    if (toPath.indexOf('/trade') !== -1 || toPath.indexOf('/pay') !== -1 || toPath.indexOf('/center') !== -1) {
      // 登录的时候通过query参数进行传递重定向参数，登录成功，有query参数，往query参数中传递的值跳转
      // 没有query就跳转登录
      next('/login?redirect=' + toPath)
    } else {
      next()
    }
  }
})

export default router
