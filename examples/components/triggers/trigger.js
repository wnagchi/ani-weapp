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
     async show(dd=10){
       console.log(this);
      await this.sets()
      console.log(11111111111);
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    setStores() {
      this.$setStore('monitor', ++this.data.val)
      // apps.setStore('monitor',this.data.val)
    },
    sets(){
      return new Promise(re=>{
         setTimeout(_=>{
            re()
         },5000)
      })  
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
