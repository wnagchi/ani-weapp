import {isObject} from "../utils/util";

export default class Agency {
    constructor() {
        this.vm = this.getWxMethods()
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
        // this.proxyRouter()
    }

    //路由代理
    proxyRouter(config = {}) {
        let that = this
        let routers = ['switchTab', 'reLaunch', 'redirectTo', 'navigateTo', 'navigateBack']
        routers.forEach(x => {
            let m = wx[x]
            wx[x] = function (data) {
                if (config.succeed) {
                    data.success = function () {
                        setTimeout(_ => {
                            let currPage = getCurrentPages()[getCurrentPages().length - 1]
                            if (config.succeed) config.succeed(currPage, x)
                        }, 300)
                    }
                }
                if (config.before) {
                    let beforeFn = config.before({data, routerType: x})
                    if (beforeFn == false) return false
                    if (isObject(beforeFn)) {
                        if (beforeFn.data) data = beforeFn.data
                        if (beforeFn.routerType && routers.includes(beforeFn.routerType)) {
                            m = wx[beforeFn.routerType]
                        }
                    }

                }
                m(data)
            }
        })
    }
}