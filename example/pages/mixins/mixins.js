
const app=getApp();
import one from './one'
const apps = app.Ani.Page({
    mixins:[one],
    onLoad(options){
        console.log(options);
        this.setData({
            options:JSON.stringify(options)
        })
    }

})
