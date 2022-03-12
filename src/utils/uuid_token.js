import { v4 as uuidv4 } from 'uuid'
// 生成一个随机的字符串,且每次执行不能发生变化,切用户身份要持久存储
export const getUUID = () => {
  // 先从本地存储获取uuid,看一下本体存储里面是否有
  let uuidToken = localStorage.getItem('UUIDTOKEN')
  // 如果没有就生成uuid
  if (!uuidToken) {
    // 生成游客否认临时身份
    uuidToken = uuidv4()
    localStorage.setItem('UUIDTOKEN', uuidToken)
  }
  return uuidToken
}

// 使用单例模式
