<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul
          class="cart-list"
          v-for="(cart, index) in cartInfoList"
          :key="cart.id"
        >
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="cart.isChecked"
              @change="updateChecked(cart,$event)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl" />
            <div class="item-msg">{{ cart.skuName }}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ cart.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <!-- -1是在已有数值的基础上的变化量,减一 -->
            <a
              href="javascript:void(0)"
              class="mins"
              @click="handler('minus', -1, cart)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              :value="cart.skuNum"
              minnum="1"
              class="itxt"
              @change="handler('change', $event.target.value * 1, cart)"
            />
            <!-- 1是在已有数值的基础上的变化量,加1 -->
            <a
              href="javascript:void(0)"
              class="plus"
              @click="handler('add', 1, cart)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cart.skuNum * cart.skuPrice }}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="deleteCartById(cart)">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isAllChecked && cartInfoList.length>0" @change="updateAllCheckedCart" />
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllChecked" >删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" to="/trade" target="_blank">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import throttle from 'lodash/throttle'
export default {
  name: 'ShopCart',
  mounted () {
    // 将请求封装为一个函数,防止请求发多次,什么时候需要请求,随时调用
    this.getData()
  },
  methods: {
    // 获取个人购物车的数组
    getData () {
      this.$store.dispatch('getCartList')
    },
    // 第一个参数用于区分点击了哪个按钮,第二个参数表示变化量或者是最终的个数
    // 如果点加或减传递的是变化的量disNum: - (-1)  + (1)
    // 中间输入则传递到最终的值
    // cart是表示点击的是哪一个产品,身上有id
    // 向服务器发送请求
    handler: throttle(async function (type, disNum, cart) {
      // console.log(type)
      switch (type) {
        case 'add':
          // 带给服务器变化的量
          disNum = 1
          break
        case 'minus':
          // 判断产品的个数大于1,才能传递-1
          // 如果产品的个数小于1,那么传递的参数是0,不增也不减
          disNum = cart.skuNum > 1 ? -1 : 0
          break
        case 'change':
          // 用户输入的是最终的量,带有汉字,不是数字,带给服务器原有的数量
          if (isNaN(disNum) || disNum < 1) {
            disNum = 0
          } else {
            disNum = parseInt(disNum) - cart.skuNum
          }
          break
      }
      // 派发action
      try {
        // 代表的是修改成功
        await this.$store.dispatch('addOrUpdateShopCart', { skuId: cart.skuId, skuNum: disNum })
        // 再一次获取数据进行展示
        this.getData()
      } catch (error) {
        alert(error.message)
      }
    }, 500),
    async deleteCartById (cart) {
      try {
        await this.$store.dispatch('deleteCartListBySkuId', cart.skuId)
      } catch (error) {
        alert(error.message)
      }
    },
    // 修改产品的勾选状态
    async updateChecked (cart, event) {
      try {
        // 带给服务器的参数应该是布尔值
        const isChecked = event.target.checked ? '1' : '0'
        this.$store.dispatch('updateCheckedByid', { skuId: cart.skuId, isChecked })
        // 修改成功后重新获取数据
        this.getData()
      } catch (error) {
        alert(error.message)
      }
    },
    // 删除选中的商品
    async deleteAllChecked () {
      try {
        // 派发action
        await this.$store.dispatch('deleteAllCheckedCart')
        // 请求成功之后,要重新发送请求
        this.getData()
      } catch (error) {
        alert('error.message')
      }
    },
    // 更改全部商品的状态
    async updateAllCheckedCart () {
      try {
        const isChecked = event.target.checked ? '1' : '0'
        // 派发actions
        await this.$store.dispatch('updateAllCartChecked', isChecked)
        this.getData()
      } catch (error) {
        alert(error.message)
      }
    }

  },
  computed: {
    ...mapGetters(['cartList']),
    // 购物车数据
    cartInfoList () {
      return this.cartList.cartInfoList || []
    },
    // 计算产品的总价
    totalPrice () {
      let sum = 0
      this.cartInfoList.forEach((item) => {
        sum += item.skuNum * item.skuPrice
      })
      return sum
    },
    // 判断底部的复选框是不是选中
    isAllChecked () {
      return this.cartInfoList.every((item) => item.isChecked === 1)
    }
  }
}
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
