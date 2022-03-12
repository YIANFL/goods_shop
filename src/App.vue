<template>
  <div id="app">
    <!-- 头部组件 -->
    <Header></Header>
    <router-view></router-view>
    <!-- 在Home或者是Search下是显示的 -->
    <!-- <Footer v-show="$route.path == '/home' || $route.path == '/search'"></Footer> -->
    <!-- 通过路由元信息按条件展示footer组件 -->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header/Header.vue'
import Footer from '@/components/Footer/Footer.vue'
// import Footer from './components/Footer/Footer.vue'
export default {
  data () {
    return {
    }
  },
  components: {
    Header,
    Footer
  },
  // app中的mounted()只会执行一次
  mounted () {
    // 通知vuex发送请求,获取数据,储存于仓库中
    // 派发一个action,获取商品列表的数据
    this.$store.dispatch('categoryList')
  }
}
</script>
<style lang="less">

</style>
