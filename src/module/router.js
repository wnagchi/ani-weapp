import {isObject, isUndefined} from '../utils/util'
import utils from './utilFn'

const routerType=[
    {
        name:'switchTab',
        cname:'toTab'
    },
    {
        name:'reLaunch',
        cname:'launch'
    },
    {
        name:'redirectTo',
        cname:'offTo'
    },
    {
        name:'navigateTo',
        cname:'to'
    },
    {
        name:'navigateBack',
        cname:'back'
    },
]


export default {
    async $toPath(e) {
        const pageTo = isObject(e) && !isUndefined(e.currentTarget);
        let {path, toType, toData} = pageTo ? utils.$getData(e) : e
        toType=toType||'navigateTo'
        if (!isUndefined(this.$toPathBefore) || !isUndefined(this.$toPathBeforeAsync)) {
            const functionType = pageTo ? 'wxml' : 'js'

            let beforeData = isUndefined(this.$toPathBeforeAsync) ?
                this.$toPathBefore({path, toType, toData, pageTo, functionType}) :
                await this.$toPathBeforeAsync({path, toType, toData, pageTo, functionType})
            // console.log(beforeData)
            if (beforeData === false) {
                return console.warn('进入路由拦截')
            } else if (!isUndefined(beforeData)) {
                if (!isUndefined(beforeData.path)) path = beforeData.path;
                if (!isUndefined(beforeData.toType)) toType = beforeData.toType;
                if (!isUndefined(beforeData.toData)) toData = beforeData.toData;

            }
        }
        toType = routerType.find(x =>
            x.name===toType||
            x.cname===toType
        ).name
        if(toType==='navigateBack') {
            let routeArr = getCurrentPages()
            if (!routeArr[routeArr.length - 2]) {
                throw new Error('未获取到前一页')
            }
            if (!isUndefined(toData)) {
                // routeArr[routeArr.length-2].data.$backData=toData;
                routeArr[routeArr.length - 2].setData({
                    $backData: toData
                })
            }
            wx.navigateBack({delta: 1})
        }
        else {
            if (isUndefined(toData)) {
                wx[toType]({url: `${path}`})
            } else {
                if (isObject(toData)) {
                    toData = Object.entries(toData);
                    toData = toData.map(x => {
                        if (typeof x[1] == 'object') {
                            x[1] = JSON.stringify(x[1])
                        }
                        return x.join('=')
                    })
                    toData = toData.join('&')
                    wx[toType]({url: `${path}?${toData}`})
                    return
                }
                toData = typeof toData == 'object' ? utils.$dataToString(toData) : toData
                wx[toType]({url: `${path}?data=${toData}`})
            }
        }

    }

}
