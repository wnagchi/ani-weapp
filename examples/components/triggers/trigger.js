const app=getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {
    val:0
  },
  lifetimes:{
    attached(){
      console.log();
    }
  },
  pageLifetimes:{
    
  },
  /**
   * 组件的方法列表
   */
  methods: {
    setStores() {
      this.$setStore('monitor', ++this.data.val)
      // apps.setStore('monitor',this.data.val)
    },
    
  },
  watchStore: {
    'monitor'(news) {
      this.setData({
        val: news
      })
    }
  }
})
