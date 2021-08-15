// index.js
// 获取应用实例
const app = getApp()
Page({
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
