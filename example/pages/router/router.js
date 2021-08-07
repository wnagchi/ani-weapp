// index.js
// 获取应用实例
const app = getApp()
const index=app.Ani.Page({
  data: {
    otherHeight:0,
    hh:'哈哈'
  },
  toItem1() {
    this.$toPath({
      path: '../item/item'
    })
  },
  toItem2() {
    this.$toPath({
      path: '../item/item',
      toData: {a: 20}
    })
  },
  toItem3() {
    this.$toPath({
      path: '../item/item',
      toData: {a:30},
      toType: 'offTo'
    })
  },
  toItem4() {
    this.$toPath({
      path: '../item/item',
      toType: 'back'
    })
  },
})
