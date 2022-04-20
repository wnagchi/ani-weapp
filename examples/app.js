import Ani,{$getStorage} from './ani.min'
import mixinsMethod from './lib/mixinsMethods'
console.log($getStorage('aaaa'));
Page.prototype.aaaa=function(){
    console.log(1111);
}
console.dir(Page);
debugger
App({
    Ani: new Ani({
        use:[mixinsMethod]
    }),
    onLaunch: function () {
        console.dir(Page);
        this.Ani.afterRouter(function (page, routerName) {
            console.log('afterRouter',page, routerName);
        })
        this.Ani.beforeRouter(function (data) {
            console.log('beforeRouter',data)
            return true
        })
        this.Ani.listen('onShow', function () {
            console.log('监听到onShow执行')
        })
        this.Ani.listen('onLoad', function (options) {
            console.log('监听到onLoad执行', options)
            return {data: 20}
        })
        this.Ani.listen('onReady', function () {
            console.log('监听到onReady执行')
        })

        // console.log(this.fn.a);

    }
})
 