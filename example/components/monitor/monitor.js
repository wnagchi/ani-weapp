const app=getApp()
let that;
Component({
  data: {

  },
  ready(){
    that=this
  },

  watchStore:{
    'monitor'(news){
      this.setData({ monitor:news })
    }
  }
})
