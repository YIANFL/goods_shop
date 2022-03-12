// 导入Home组件
import Home from '@/views/Home/Home.vue'
import Search from '@/views/Search'
import Login from '@/views/Login'
import Register from '@/views/Register'
import Detail from '@/views/Detail/index.vue'
import AddCartSuccess from '@/views/AddCartSuccess/index.vue'
import ShopCart from '@/views/ShopCart'
import Trade from '@/views/Trade'
import Pay from '@/views/Pay'
import PaySuccess from '@/views/PaySuccess'
import Center from '@/views/Center'

// 引入二级路由组件
import MyOrder from '@/views/Center/myOrder'
import GroupOrder from '@/views/Center/groupOrder'
export default [
  // 重定向路由
  {
    path: '/',
    redirect: './home'
  },
  {
    // 点击路由跳转的时候,需要跳转到详情页面,需要带着参数id给路由页面
    path: '/detail/:skuid',
    component: Detail,
    name: 'detail',
    meta: {
      show: true
    }
  },
  {
    path: '/home',
    component: Home,
    meta: {
      show: true
    }
  },
  {
    path: '/center',
    component: Center,
    meta: {
      show: true
    },
    children: [
      { path: '/center', redirect: '/center/myorder' },
      { path: 'myorder', component: MyOrder },
      { path: 'grouporder', component: GroupOrder }
    ]
  },
  {
    path: '/paysuccess',
    component: PaySuccess,
    meta: {
      show: true
    }
  },
  {
    path: '/pay',
    component: Pay,
    meta: {
      show: true
    }
    // beforeEnter: (to, from, next) => {
    //   if (from.path === '/trade') {
    //     next()
    //   } else {
    //     next(false)
    //   }
    // }
  },
  {
    path: '/trade',
    component: Trade,
    meta: {
      show: true
    }
    // 路由独享守卫
    // beforeEnter: (to, from, next) => {
    //   // 去交易页面必须是从交易页来
    //   if (from.path === '/shopcart') {
    //     next()
    //   } else {
    //     // 停留在当前页面
    //     next(false)
    //   }
    // }
  },
  {
    path: '/addacrtsuccess',
    component: AddCartSuccess,
    name: 'addacrtsuccess',
    meta: {
      show: true
    }
  },
  {
    path: '/shopcart',
    component: ShopCart,
    name: 'shopcart',
    meta: {
      show: true
    }
  },
  {
    path: '/search/:keyword?',
    component: Search,
    meta: {
      show: true
    },
    name: 'search',
    // props传参
    // 1.布尔类型,表示可以传递params参数,可以在组件的props属性中拿到值
    // props: true
    // 2.对象形式的参数,额外给路由组件传递的一些参数
    // props: {
    //   a: 1,
    //   b: 2
    // }
    // 3.函数形式可以传递params,query参数传递给路由组件
    props: ($route) => {
      return {
        keyword: $route.params.keyword,
        k: $route.query.k
      }
    }
  },
  {
    path: '/Login',
    component: Login,
    meta: {
      show: false
    }
  },
  {
    path: '/Register',
    component: Register,
    meta: {
      show: false
    }
  }

]
