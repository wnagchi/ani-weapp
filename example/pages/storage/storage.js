const app = getApp();

const apps = app.Ani.Page({
   
    setStorage() {
        // 设置有效时长为5秒的storage
        this.$setStorage('ani','haha', 5)
        
    },
    getStorage() {
        const ani = this.$getStorage('ani')
        console.log(ani);
        this.setData({
            ani
        })
    },
    removetStorage() {
        this.$removeStorage('ani')
    },
})