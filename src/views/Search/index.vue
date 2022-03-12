<template>
  <div>
    <!-- 商品分类三级列表 -->
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <!-- 面包屑导航 -->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类的面包屑 -->
            <li class="with-x" v-show="searchParams.categoryName">
              {{ searchParams.categoryName
              }}<i @click="removeCategoryName">×</i>
            </li>
            <!--关键字的面包屑  -->
            <li class="with-x" v-show="searchParams.keyword">
              {{ searchParams.keyword
              }}<i @click="removeKeyword">×</i>
            </li>
             <!--品牌的面包屑  -->
            <li class="with-x" v-show="searchParams.trademark">
              {{ searchParams.trademark
              }}<i @click="removeTrademark">×</i>
            </li>
            <!-- 平台售卖属性值的展示 -->
            <li class="with-x" v-for="(attrValue,index) in searchParams.props" :key="index">
              {{ attrValue.split(':')[1]
              }}<i @click="removeAttrValue(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @tradeMarkInfo="tradeMarkInfo" @attrInfo="attrInfo"/>

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{active:isOne}" @click="changeOrder('1')">
                  <a href="#">综合<span v-show="isOne" class="iconfont" :class="{'icon-long-arrow-down':isAsc,'icon-long-arrow-up':isDesc}"></span></a>
                </li>
                <li :class="{active:isTwo}" @click="changeOrder('2')" >
                  <a href="#">价格<span v-show="isTwo"  class="iconfont" :class="{'icon-long-arrow-down':isAsc,'icon-long-arrow-up':isDesc}"></span></a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 销售产品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li
                class="yui3-u-1-5"
                v-for="(goods) in goodsList"
                :key="goods.id"
              >
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${goods.id}`" target="_blank"
                      ><img v-lazy="goods.defaultImg"
                    /></router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ goods.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                    >
                      {{ goods.title }}
                    </a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <Pagination :pageNo="searchParams.pageNo" :pageSize="searchParams.pageSize" :total="total" :continues="5" @getPageNo="getPageNo"></Pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from './SearchSelector/SearchSelector.vue'
import { mapGetters, mapState } from 'vuex'
export default {
  name: 'Search',
  data () {
    return {
      searchParams: {
        // 一级分类id
        category1Id: '',
        // 二级分类的id
        category2Id: '',
        // 三级分类id
        category3Id: '',
        // 分类名称
        categoryName: '',
        // 关键字
        keyword: '',
        // 排序
        order: '1:desc',
        // 默认是第一页,当前是第几页
        pageNo: 1,
        // 每一页有10条数据,代表的是每一页展示数据的个数
        pageSize: 10,
        // 平台售卖属性的操作带的参数
        props: [],
        // 品牌
        trademark: ''
      }
    }
  },
  components: {
    SearchSelector
  },
  beforeMount () {
    // 复杂的写法
    // this.searchParams.category1Id = this.$route.query.category1Id
    // this.searchParams.category2Id = this.$route.query.category2Id
    // this.searchParams.category3Id = this.$route.query.category3Id
    // this.searchParams.categoryName = this.$route.query.categoryName
    // this.searchParams.keyword = this.$route.params.keyword
    Object.assign(this.searchParams, this.$route.query, this.$route.params)
  },
  mounted () {
    // 在发送请求之前带给服务器参数searchParams进行修改,就可以拿到不同的数据
    this.getData()
  },
  computed: {
    // getters中的数据是没有分类的,没有划分home和search模块,,直接传递一个数组就可以了
    ...mapGetters(['goodsList']),
    isOne () {
      return this.searchParams.order.indexOf('1') !== -1
    },
    isTwo () {
      return this.searchParams.order.indexOf('2') !== -1
    },
    isAsc () {
      return this.searchParams.order.indexOf('asc') === -1
    },
    isDesc () {
      return this.searchParams.order.indexOf('desc') === -1
    },
    // 获取当前search模块一共有多少条数据,这个数据在仓库中
    ...mapState({
      total: state => state.search.searchList.total
    })
  },
  methods: {
    // 向服务器发送请求,请求search模块的数据,根据传递的参数不同返回不同的数据进行展示
    // 把这次请求封装为一个函数,在需要的时候进行调用即可
    getData () {
      this.$store.dispatch('getSearchList', this.searchParams)
    },
    /* 删除分类的名字 */
    removeCategoryName () {
      // alert(123)
      // 把带给服务器的数据置空
      this.searchParams.categoryName = undefined
      // 再点击关闭标签之后需要删除categoryName和相应的id
      this.searchParams.category1Id = undefined
      this.searchParams.category2Id = undefined
      this.searchParams.category3Id = undefined
      // 地址栏中路径也需要更改,进行路由的跳转
      // 地址栏中,路径发生变化,路由发生跳转,应该只清除query参数,不删除params参数
      if (this.$route.params) {
        this.$router.push({ name: 'search', params: this.$route.params })
      }
    },
    removeKeyword () {
      this.searchParams.keyword = undefined
      this.getData()
      // Search组件 通知兄弟组件Header清除关键字
      this.$bus.$emit('clearKeyword')
      if (this.$route.query) {}
      this.$router.push({ name: 'search', query: this.$route.query })
    },
    removeTrademark () {
      // 将品牌参数置空
      this.searchParams.trademark = undefined
      // 再次发送请求
      this.getData()
    },
    // 自定义事件的回调
    tradeMarkInfo (val) {
      const tdm = `${val.tmId}:${val.tmName}`.split(':')[1]
      // 整理品牌字段的参数
      this.searchParams.trademark = tdm
      this.getData()
    },
    attrInfo (attr, attrValue) {
      // console.log(attr, attrValue)
      // 参数的格式
      const props = `${attr.attrId}:${attrValue}:${attr.attrName}`
      // 数组去重
      if (this.searchParams.props.indexOf(props) === -1) {
        this.searchParams.props.push(props)
      }
    },
    removeAttrValue (index) {
      this.searchParams.props.splice(index, 1)
      // 再次发送请求
      this.getData()
    },
    // flag是用来表示点击的是价格(1)或者是综合(2),这是用户点击的时候传递进来的
    // 默认是综合降序,用户再点击综合应该变为升序,起始状态的箭头状态是需要知道的
    changeOrder (flag) {
      // 起始的状态需要知道
      // 拿到开始的点击的是综合还是价格,是降序还是升序
      const originOrder = this.searchParams.order
      const originFlag = this.searchParams.order.split(':')[0]
      const originSort = this.searchParams.order.split(':')[1]
      // 起始的状态
      // console.log(originFlag)
      // 点击之后的状态
      // console.log(flag)

      // 准备一个新的order属性值
      let newOrder = ''
      // 点击的是综合
      if (originFlag === flag) {
        newOrder = `${originFlag}:${originSort === 'desc' ? 'asc' : 'desc'}`
      } else {
        // 点击的是价格
        newOrder = `${flag}:${'desc'}`
      }

      this.searchParams.order = newOrder
      this.getData()
    },
    // 自定义事件
    getPageNo (pageNo) {
      this.searchParams.pageNo = pageNo
      this.getData()
    }
  },
  watch: {
    $route (newVal, oldVal) {
      this.getData()
      this.searchParams.category1Id = undefined
      this.searchParams.category2Id = undefined
      this.searchParams.category3Id = undefined
      this.getData()
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>
