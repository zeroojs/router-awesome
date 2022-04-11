/*
 * @Descripttion: your project
 * @version: 0.0.0
 * @Author: Minyoung
 * @Date: 2022-04-08 10:01:07
 * @LastEditors: Minyoung
 * @LastEditTime: 2022-04-11 16:37:24
 */
import { cloneDeep } from 'lodash'

// 将数组转换成树结构
export function arrToTree(arr = []) {
  const temp = {} // 临时存储数组对象
  const tree = {} // 返回的结果

  // 填充临时对象
  for (const i in arr) {
    // 以唯一值（id）作为对象的键，id所存在的项为值
    temp[arr[i]['id']] = arr[i]
  }
  for (const i in temp) {
    // 判断是否是根节点下的项
    if (temp[i]['parentId'] !== 'root') { // 处理不是根节点的项
      if (!temp[temp[i]['parentId']].children) { // 初始化有子项的的项
        temp[temp[i]['parentId']].children = []
      }
      // 将子项存储到 children 属性中
      temp[temp[i]['parentId']].children.push(temp[i])
    } else {
      // 根节点的直接迁移temp -> tree
      tree[temp[i]['id']] = temp[i]
    }
  }
  return Object.values(tree) // 将外层对象转换成数组
}

// 将树结构转换成数组
export function treeToArr(tree = []) {
  const allChildren = [] // 存放所有children项(child)
  // 会对原始数组操作 必须使用深拷贝 这里不能使用字符串简单拷贝，涉及到异步路由组件是函数，字面量将不会拷贝过去
  const newTree = cloneDeep(tree)
  // 最外层(parentId = root)
  const outer = []

  // 深度优先
  while (newTree.length) {
    const first = newTree.shift() // 将第一项拿出来(这里会改变原始数组的长度)
    const children = first.children
    if (children && children.length) {
      first.parentId = 'root'
    }
    const isRoot = first.parentId === 'root'
    if (isRoot) { // 处理最外层的项
      const newFirst = cloneDeep(first)
      if (newFirst.children) {
        delete newFirst.children // 扁平化不需要children属性(这里会改变原始数组的长度)
      }
      outer.push(newFirst) // 将最外层的项单独存放到outer
    }
    if (children && children.length) {
      const result = treeToArr(children) // 递归处理children
      allChildren.push(...result) // 结果单独存到allChildren
    } else {
      !isRoot && allChildren.push(first) // 只处理不是根节点的
    }
  }
  return [...outer, ...allChildren]
}
