// 统一管理所有的接口
// 导入封装的axios
import requests from './request'
import mockRequests from './mockAjax'

// 获取三级联动的接口
// /api/product/getBaseCategoryList

// 向外暴露发送请求的函数
export const reqCategoryList = () => {
  // 发送请求
  // axios返回的是promise对象
  return requests({
    url: '/product/getBaseCategoryList',
    method: 'get'
  })
}
// 获取banner,(home首页轮播图的函数)
export const reqGetBannerList = () => mockRequests.get('/banner')

// 获取floor组件的数据
export const reqFloorList = () => mockRequests.get('/floor')

// 获取search模块的数据 post
// /api/list
/*
请求,需要携带携带参数
  {
  "category3Id": "61",
  "categoryName": "手机",
  "keyword": "小米",
  "order": "1:desc",
  "pageNo": 1,
  "pageSize": 10,
  "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
  "trademark": "4:小米"
}

*/
// 当前的函数需要参数
// 当前的接口给服务器发送请求,传递的参数至少是一个空对象,如果不给空对象,会报错
// 给服务器传递一个默认的参数,至少是一个空对象
export const reqGetSearchInfo = (params) => requests({
  url: '/list',
  method: 'post',
  // axios请求方式,get方式params,post参数是data
  data: params
})

// 获取产品详情信息的的信息  get  /api/item/{ skuId }
export const reqGoodInfo = (skuId) => requests({
  url: `/item/${skuId}`,
  method: 'get'
})

// 点击添加到购物车之后,要发送请求,将数据提交给服务器
// post /api/cart/addToCart/{ skuId }/{ skuNum }
export const reqAddOrUpdateShopCart = (skuId, skuNum) => requests({
  method: 'post',
  url: `/cart/addToCart/${skuId}/${skuNum}`
})

// 获取购物车列表的数据接口
export const reqCartList = () => requests({
  method: 'get',
  url: '/cart/cartList'
})

// 删除购物车的接口 /api/cart/deleteCart/{skuId}    DELETE
export const reqDeleteCartById = (skuId) => requests({
  url: `/cart/deleteCart/${skuId} `,
  method: 'DELETE'
})

// 修改商品的选中状态
// /api/cart/checkCart/{skuID}/{isChecked} get
export const reqUpdateCheckedByid = (skuId, isChecked) => requests({
  url: `/cart/checkCart/${skuId}/${isChecked}`,
  method: 'get'
})

// 获取验证码 /api/user/passport/sendCode/{phone}
export const reqGetCode = (phone) => requests({ url: `/user/passport/sendCode/${phone}`, method: 'get' })

// 用户注册接口
// /api/user/passport/register    post
export const reqUserRegister = (data) => requests({ url: '/user/passport/register', data, method: 'post' })

// 用户登录的接口
// /api/user/passport/login  post password phone
export const reqUserLogin = (data) => requests({ url: '/user/passport/login', data, method: 'post' })

//  获取用户的信息（要携带token）
// http://182.92.128.115/api/user/passport/auth/getUserInfo   get
export const reqUserInfo = () => requests({ url: '/user/passport/auth/getUserInfo', method: 'get' })

// 退出登陆
// /api/user/passport/logout  get
export const reqLogout = () => requests({ url: '/user/passport/logout', method: 'get' })

// 获取用户地址信息  /api/user/userAddress/auth/findUserAddressList
export const reqAddressInfo = () => requests({ url: '/user/userAddress/auth/findUserAddressList', method: 'get' })

// 获取商品清单
// /api/order/auth/trade   get
export const reqOrderInfo = () => requests({ url: '/order/auth/trade', method: 'get' })

// 提交订单的接口
// /api/order/auth/submitOrder?tradeNo={tradeNo}
export const reqSumitOrder = (tradeNo, data) => requests({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, data, method: 'post' })

// 获取支付信息 /api/payment/weixin/createNative/{orderId}
export const reqPayInfo = (orderId) => requests({ url: `/payment/weixin/createNative/${orderId}`, method: 'get' })

// 获取支付订单状态
// /api/payment/weixin/queryPayStatus/{orderId}
export const reqPayState = (orderId) => requests({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: 'get' })

// 获取个人中心的我的订单的数组
// /api/order/auth/{page}/{limit}   get
export const reqMyOrderList = (page, limit) => requests({ url: `/order/auth/${page}/${limit}`, method: 'get' })
