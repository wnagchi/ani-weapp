import Ani from './ani.min'
// import Ani from './src/root/ani'

import mixinsMethod from './lib/mixinsMethods'
App({
    Ani: new Ani({
        use:[mixinsMethod]
    }),
    onLaunch: function () {
        this.Ani.afterRouter(function (page, routerName) {
            console.log(page, routerName);
        })
        this.Ani.beforeRouter(function (data) {
            console.log(data)
            return true
        })
        this.Ani.listen('onShow', function () {
            console.log('监听到onShow执行')
            console.log(this)
        })
        this.Ani.listen('onLoad', function (options) {
            console.log('监听到onLoad执行', options)
            console.log(this)
            return {data: 20}
        })
        this.Ani.listen('onReady', function () {
            console.log('监听到onReady执行')
        })
        console.log(this.Ani);

        // console.log(this.fn.a);

    }
})
 