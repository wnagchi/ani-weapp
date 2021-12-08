// index/test.js

Page({

    /**
     * 页面的初始数据
     */
    data: {
        name:'我哦哦啊哦我澳网'
    },
        // 监听store
        watchStore: {
            'monitor'(news, old) {
            console.log('new', news, 'old', old);
                this.setData({
                    monitor: news
                })
            }
        },
    addStore(){
      if(isNaN(this.data.monitor)) this.data.monitor=0
      this.$setStore('monitor',++this.data.monitor)
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(33333333);
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})