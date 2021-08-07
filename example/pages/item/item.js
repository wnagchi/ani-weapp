
const app=getApp();

const apps = app.Ani.Page({

    onLoad(options){
        console.log(options);
        this.setData({
            options:JSON.stringify(options)
        })
    }

})
