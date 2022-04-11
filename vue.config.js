/*
 * @Descripttion: your project
 * @version: 0.0.0
 * @Author: Minyoung
 * @Date: 2022-04-08 09:29:14
 * @LastEditors: Minyoung
 * @LastEditTime: 2022-04-11 16:54:21
 */
const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap: false,
  configureWebpack: config => {
    config.output.chunkFilename = 'chunks/[name].[contenthash:4].js' // 动态路由 () => import(/*webpackChunkName:[chunkName]*/)
  }
})
