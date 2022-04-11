/* eslint-disable */
/*
 * @Descripttion: your project
 * @version: 0.0.0
 * @Author: Minyoung
 * @Date: 2022-04-08 10:01:07
 * @LastEditors: Minyoung
 * @LastEditTime: 2022-04-11 16:56:45
 */
const routes = require('../../public/static/routes.json')

// 将数组转换成树结构
function arrToTree(arr = []) {
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
// console.log(JSON.stringify(arrToTree(routes), null, 2))

const treeRoutes = [
  {
    "id": 1,
    "parentId": "root",
    "name": "订单管理",
    "children": [
      {
        "id": 3,
        "parentId": 1,
        "name": "创建订单"
      },
      {
        "id": 4,
        "parentId": 1,
        "name": "订单详情",
        "hide": true
      }
    ]
  },
  {
    "id": 2,
    "parentId": "root",
    "name": "产品管理",
    "children": [
      {
        "id": 5,
        "parentId": 2,
        "name": "创建产品"
      },
      {
        "id": 6,
        "parentId": 2,
        "name": "产品详情",
        "hide": true
      },
      {
        "id": 7,
        "parentId": 2,
        "name": "产品分类管理",
        "children": [
          {
            "id": 8,
            "parentId": 7,
            "name": "创建分类"
          },
          {
            "id": 9,
            "parentId": 7,
            "name": "分类详情",
            "hide": true
          }
        ]
      }
    ]
  },
  {
    "id": 10,
    "parentId": "root",
    "name": "关于我们"
  }
]
// 将树结构转换成数组
function treeToArr(tree = []) {
  const allChildren = [] // 存放所有children项(child)
  const outer = [] // 最外层(parentId = root)
  const newTree = JSON.parse(JSON.stringify(tree)) // 会对原始数组操作 必须使用深拷贝
  
  // 深度优先
  while (newTree.length) {
    const first = newTree.shift() // 将第一项拿出来(这里会改变原始数组的长度)
    const children = first.children
    const isRoot = first.parentId === 'root'
    if (isRoot) { // 处理最外层的项
      const newFirst = JSON.parse(JSON.stringify(first))
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
// console.log(treeToArr(treeRoutes))

// 路由整合，将服务端的路由与客户端的路由整合
function mergeRoutes(serverRoutes = [], clientRoutes =[]) {
  const authRoutes = [] // 最终认证合并的路由
  // 扁平化路由tree -> arr
  const arrClientRoutes = clientRoutes
  // 比对路由
    // 找到一致路由，以服务端路由为基准更新客户端路由相关属性
    // 没有找到删除路由
  
  // 还原客户端路由arr -> tree
  
  // 返回路由
}