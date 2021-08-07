// index.js
// 获取应用实例
const app = getApp()
const index=app.Ani.Page({
  data: {
    otherHeight:0
  },

  // 监听器
  watchStore: {
    'monitor'(news, old) {
        this.setData({
            monitor: news
        })
    }
  },

})
