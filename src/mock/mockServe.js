// 先引入Mock模块模拟数据
import Mock from 'mockjs'
// 引入JSON数据格式
// JSON没有对外暴露,但是可以直接暴露
// webpack中默认对外暴露的文件:图片\JSON
import banner from './banner.json'
import floor from './floor.json'

// Mock是一个对象 mock是方法,第一个参数是请求地址,第二个参数是请求数据
Mock.mock('/mock/banner', { code: 200, data: banner })
Mock.mock('/mock/floor', { code: 200, data: floor })

// 当前的代码没有执行
