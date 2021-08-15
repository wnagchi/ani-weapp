// app.js
import Ani from './ani.min'
App({
  Ani:new Ani(),
  onLaunch() {
      /*
      * 执行路由跳转之前
      * @param {object} routerData 跳转相关参数 可进行修改
      * */
      this.Ani.beforeRouter(function(routerData){
          console.log(this)
          console.log(routerData);
          // 禁止继续跳转
          // return false

          //修改跳转参数
          // return {
          //   data:{
          //     url:'111111'
          //   },
          //   routerType:'redirectTo'
          // }
          
      })
      /*
      * 执行路由跳转之后
      * @param {object} page
      * */
      this.Ani.afterRouter(function(page){
        console.log(page);
      })
      /*
      * 侦听页面onShow事件
      * */
      this.Ani.listen('onShow',function(){
        console.log('onShow');
      })
      /*
      * 侦听页面onLoad事件
      * @param {any} options 跳转带过来的参数 可进行处理
      * */
      this.Ani.listen('onLoad',function(options){
          console.log(options)
          console.log('onLoad');
          return {
              data:'11111'
          }
      })
      /*
      * 侦听页面onReady事件
      * */
      this.Ani.listen('onReady',function(){
        console.log('onReady');
      })
      /*
      * 侦听页面onHide事件
      * */
      this.Ani.listen('onHide',function(){
        console.log('onHide');
      })
  },
})
