<template>
  <header class="header">
            <!-- 头部的第一行 -->
            <div class="top">
                <div class="container">
                    <div class="loginList">
                        <p>尚品汇欢迎您！</p>
                        <p v-if="!userName">
                            <span>请</span>
                            <router-link :to="'/Login'">登录</router-link>
                            <router-link :to="'Register'" class="register">免费注册</router-link>
                        </p>
                        <p v-else>
                            <a >{{userName}}</a>
                            <a  class="register" @click = "logout">退出登陆</a>
                        </p>
                    </div>
                    <div class="typeList">
                        <router-link to="/center/myorder">我的订单</router-link>
                        <router-link to="/shopcart">我的购物车</router-link>
                        <a href="###">我的尚品汇</a>
                        <a href="###">尚品汇会员</a>
                        <a href="###">企业采购</a>
                        <a href="###">关注尚品汇</a>
                        <a href="###">合作招商</a>
                        <a href="###">商家后台</a>
                    </div>
                </div>
            </div>
            <!--头部第二行 搜索区域-->
            <div class="bottom">
                <h1 class="logoArea">
                    <router-link class="logo" to="/home">
                        <img src="./images/logo.png" alt="">
                    </router-link>
                </h1>
                <div class="searchArea">
                    <form action="###" class="searchForm">
                        <input type="text" id="autocomplete" class="input-error input-xxlarge" v-model="keyword"/>
                        <button class="sui-btn btn-xlarge btn-danger" type="button" @click="goSearch">搜索</button>
                    </form>
                </div>
            </div>
        </header>
</template>

<script>
export default {
  data () {
    return {
      keyword: ''
    }
  },
  methods: {
    goSearch () {
      // 路由传参
    //   第一种:字符串形式
    //   每次需要字符串拼接比较麻烦,所以使用模版字符串更加方便
    //   this.$router.push('/search/' + this.keyword + '?k=' + this.keyword.toUpperCase())
      // this.$router.push(`/search/${this.keyword}?k=${this.keyword.toUpperCase()}`)
      //   第三种写法对象形的写法
      if (this.$route.query) {
        const location = { name: 'search', params: { keyword: this.keyword || undefined } }
        location.query = this.$route.query
        this.$router.push(location)
      }
    },
    async logout () {
      try {
        // alert(123)
        await this.$store.dispatch('userLogout')
        this.$router.push('/home')
      } catch (error) {
        alert(error.message)
      }
    }
  },
  mounted () {
    // 通过全局事件总线清除关键字
    this.$bus.$on('clearKeyword', () => {
      this.keyword = ''
    })
  },
  computed: {
    // 计算出用户名,
    userName () {
      return this.$store.state.users.userInfo.name
    }
  }
}
</script>

<style lang="less" scoped>
@import "./css/header.less";
</style>
