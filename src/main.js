import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 导入store
import store from './store'

// 导入mockServe
import '@/mock/mockServe.js'

// 引入swiper
import 'swiper/css/swiper.css'
// 导入rest.css清除原有样式
// import '@/assets/css/reset.css'
// 导入iconfont.css
// 注册全局组件
import TypeNav from '@/components/TypeNav/TypeNav.vue'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'

// 统一接收api中暴露的方法
// API是一个对象，对象包含所有的请求和方法
import * as API from '@/api'

// import
import { Button, MessageBox } from 'element-ui'
// 引入插件
import VueLazyLoad from 'vue-lazyload'
// 引入图片
import SKD from '@/assets/1.gif'

// 引入自定义插件
import myPlugins from '@/plugins/myPlugins.js'
// 引入校验插件
import '@/plugins/validate.js'
Vue.use(myPlugins, {
  name: 'upper'
})
// 注册插件,只要调用了Vue.use方法,实际上是调用了插件的install方法
Vue.use(VueLazyLoad, {

  loading: SKD

})

// 第一个参数是全局组件的名字
Vue.component('TypeNav', TypeNav)
Vue.component('Carousel', Carousel)
Vue.component('Pagination', Pagination)
// element-ui注册全局组件,可以挂载到原型上
Vue.component(Button.name, Button)
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert

Vue.config.productionTip = false

// 注册store,组件实例的身上会多出了$store属性
new Vue({
  router,
  store,
  render: h => h(App),

  // 配置全局事件总线
  beforeCreate () {
    // 将组件实例挂载到vue原型对象上,所有组件通过this都可以访问到
    Vue.prototype.$bus = this
    // 在vue的原型对象中,所有的组件实例都可以进行使用
    Vue.prototype.$API = API
  }
}).$mount('#app')
