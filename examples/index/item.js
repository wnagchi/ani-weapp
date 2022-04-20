
const app=getApp();
// app.Ani.beforeRouter(function (data) {
//     console.log(data)
//     console.log('hhhhhhhhh')
//     return true
//   })
//   app.Ani.beforeRouter(function (data) {
//     console.log(data)
//     console.log('ddddddddddd')
//     return true
//   })  
Page({
    onLoad(args) {
        console.log('item onLoad接到的值', args);
        // console.log(JSON.parse(args.a));
    },
    onShow() {
        console.log('item中的onSHow')
    },
    onUnload() {

    },

})
