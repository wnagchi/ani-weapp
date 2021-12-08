const app=getApp()
let that=this;
Component({
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {

  },
  ready(){
    that=this
  },
  /**
   * 组件的方法列表
   */
  methods: {

  },
  watchStore:{
    'monitor'(news){
      that.setData({ monitor:news })
    }
  }
})
