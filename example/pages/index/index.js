// index.js
// 获取应用实例
const app = getApp()
const index=app.Ani.Page({
  data: {
    otherHeight:0
  },
  offTo(){
    console.log(3333333333333);
    wx.redirectTo({
      url: '../item/item',
    })
}
})
