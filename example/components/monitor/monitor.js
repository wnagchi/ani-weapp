const app=getApp()
let that;
app.Ani.Component({
  data: {

  },
  ready(){
    that=this
  },

  watchStore:{
    'monitor':(news)=>{
      console.log(this);
      that.setData({ monitor:news })
    }
  }
})
