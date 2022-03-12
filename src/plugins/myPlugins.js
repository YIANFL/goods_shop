// 封装插件,对外暴露一定是一个对象,而且这个对像必须含有install方法
const myPlugins = {}

myPlugins.install = function (Vue, options) {
  // 什么时候会调用这个插件,只要是使用vue.use(插件名)就会调用install方法,
  // 会注入参数,第一个参数是vue构造函数
  // 对注入第二个参数就是vue.use(传入的对象)
  // vue.prototype.$bus 全局事件总线
  // vue.directive  全局指令
  // vue.component 全局组件
  // vue.filter全局过滤器
  // 自定义指令,第一个参数是名称
  // 会自动注入第一个参数,指令绑定的对象,第二个参数
  Vue.directive(options.name, (element, params) => {
    // console.log('执行了自定义指令')
    element.innerHTML = params.value.toUpperCase()
  })
}

export default myPlugins
