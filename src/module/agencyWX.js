import {isObject} from "../utils/util";

export default class Agency {
    constructor() {
        this.vm = this.getWxMethods()
        this.routerConfig=[]
        this.initProxy()
    }

    getWxMethods() {
        let vm = {}
        Object.keys(wx).forEach(x => {
            vm[x] = wx[x]
        })
        return wx = vm;
    }

    initProxy() {
        this.proxyRouter()
        // console.log(this.vm)
    }
    setRouterBefore(data){
        this.routerConfig.push(data)
    }
    setRouterAfter(data){
        this.routerConfig.push(data)
    }
    //路由代理
    proxyRouter(config = {}) {
        let that = this
        let routers = ['switchTab', 'reLaunch', 'redirectTo', 'navigateTo', 'navigateBack']
        routers.forEach(x => {
            let m = wx[x]
            wx[x] = function (data) {
                let Page=getCurrentPages();
                let currPage=Page[Page.length-1]
                if(currPage.$beforeRouter){
                    let pageBeforeFn = currPage.$beforeRouter({data, routerType: x,beforePage:currPage})
                    if (pageBeforeFn === false) return false
                    if (isObject(pageBeforeFn)) {
                        if (pageBeforeFn.data) data = pageBeforeFn.data
                        if (pageBeforeFn.routerType && routers.includes(pageBeforeFn.routerType)) {
                            m = wx[pageBeforeFn.routerType]
                        }
                    }
                }
                that.routerConfig.forEach( (config)=>{
                    // console.log('执行了跳转',x,data)
                    if (config.succeed) {
                        data.success = function () {
                            setTimeout(_ => {
                                let currPage = getCurrentPages()[getCurrentPages().length - 1]
                                if (config.succeed) config.succeed(currPage, x)
                            }, 300)
                        }
                    }

                    if (config.before) {
                        let beforeFn = config.before({data, routerType: x,beforePage:currPage})
                        if (beforeFn === false) return false
                        if (isObject(beforeFn)) {
                            if (beforeFn.data) data = beforeFn.data
                            if (beforeFn.routerType && routers.includes(beforeFn.routerType)) {
                                m = wx[beforeFn.routerType]
                            }
                        }

                    }
                })

                m(data)
            }
        })
    }
}