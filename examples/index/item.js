
const app=getApp();

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
