<template>
  <div class="type-nav">
    <div class="container">
      <!-- 利用事件委托来处理鼠标移除后的样式问题 -->
     <div  @mouseleave="leaveShow" @mouseenter="entershow" >
      <h2 class="all">全部商品分类</h2>
      <transition name="sort">
        <div class="sort" v-show="show">
          <div class="all-sort-list2" @click="goSearch">
            <div class="item" v-for="(c1,index) in categoryList" :key="c1.categoryId" :class="{cur:currentIndex == index}">
              <h3 @mouseenter="changeIndex(index)">
                <!-- 为所有的a标签添加自定义属性 -->
                <a :data-categoryName = "c1.categoryName" :data-category1Id="c1.categoryId" @click="goSearch">{{c1.categoryName}}</a>
              </h3>
              <!-- 二级分类、三级分类 -->
              <div class="item-list clearfix" :style="{display:currentIndex == index?'block':'none'}">
                <div class="subitem" v-for="(c2) in c1.categoryChild" :key="c2.categryId">
                  <dl class="fore">
                    <dt>
                      <a :data-categoryName = "c2.categoryName" @click="goSearch" :data-category2Id="c2.categoryId">{{c2.categoryName}}</a>
                    </dt>
                    <dd>
                      <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                        <a :data-categoryName = "c3.categoryName" @click="goSearch" :data-category3Id="c3.categoryId">{{c3.categoryName}}</a>
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>

     </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>

    </div>
  </div>
</template>

<script>
// 为了获得vuex中的数据
import { mapState } from 'vuex'
import throttle from 'lodash/throttle'
export default {
  name: 'TypeNav',
  data () {
    return {
      // 用户移动到哪一个一级分类上
      // 初始值给索引之外的值,
      currentIndex: -1,
      // 表示是否鼠标经过的时候为h添加样式
      show: true
    }
  },
  methods: {
    // 修改currentIndex
    // changeIndex (index) {
    //   // index是当前索引
    //   this.currentIndex = index
    // },
    // 防抖与节流的操作
    changeIndex: throttle(function (index) {
      this.currentIndex = index
    }, 50),
    // 一级分类鼠标移除的回调
    leaveIndex () {
      this.currentIndex = -1
    },
    // 通过事件对象可以得到点击的元素
    goSearch (event) {
      // this.$router.push('/search')
      // 通过事件对象,获取到元素
      const element = event.target
      // 节点的dataset属性可以获取自定义属性值,返回的是一个对象,可以将其中的自定义属性值解构出来,注意自定义属性值是小写的(浏览器进行转换)
      const { categoryname, category1id, category2id, category3id } = element.dataset
      // 判断
      if (categoryname) {
        // 整理路由跳转的参数
        const location = {
          name: 'search'
        }
        const query = { categoryName: categoryname }
        if (category1id) {
          query.category1id = category1id
        } else if (category2id) {
          query.category2id = category2id
        } else {
          query.category3id = category3id
        }

        // 判断:如果路由跳转的时候,带有params参数,捎带传递过去
        if (this.$route.params) {
          location.params = this.$route.params
        }

        // 整理完参数之后
        // console.log(location, query)
        location.query = query
        // 路由跳转
        this.$router.push(location)
      }
    },
    // 鼠标移入的时候,三级列表进行显示
    entershow () {
      this.show = true
    },
    leaveShow () {
      if (this.$route.path !== '/home') {
        this.show = false
      }
      this.currentIndex = -1
    }
  },
  // 组件挂载完毕,可以向服务器发送请求
  mounted () {
    // 当组件挂载成功之后,就将show改变为false
    // 判断组件的路由,如果不是Home组件,将typeNav进行隐藏
    if (this.$route.path !== '/home') {
      this.show = false
    }
  },
  computed: {
    ...mapState({
      // 右侧需要一个函数,当使用这个计算属性的时候,右侧的函数会执行一次
      // 注入一个参数,state其实即为大仓库中的数据
      // 拿到小仓库中的categoryList数据
      categoryList: (state) => {
        return state.home.categoryList
      }
    })
  }
}
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }
        .cur{
          background-color: skyblue;
        }
      }
    }
    // 过渡动画的样式
    // 这是过渡动画开始状态(进入)
    .sort-enter{
      height: 0px;
    }
    // 过渡动画的结束状态(进入)
    .sort-enter-to{
      height: 461px;
      // transform: rotate(360deg);

    }
    // 定义动画的时间和速率
    .sort-enter-active{
      transition:all 0.2s linear;
    }
  }
}
</style>
