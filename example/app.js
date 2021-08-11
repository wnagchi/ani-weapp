// app.js
import Ani from './ani'
App({
  Ani:new Ani(),
  onLaunch() {
      this.Ani.listenPage(function(page,routerName){
          console.log(page,routerName);
      })
  },
})
