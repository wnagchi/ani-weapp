import {debounce, throttle, once} from "./sectionFn";
import {isObject} from "../utils/util";

import initPage from "./initPage";
import pageInitFn from "./pageInitFn";
import userFn from "./userFn";
import utilFn from "./utilFn";
import wxmlFn from "./wxmlFn";
const mergeFunctions=[
    initPage,
    pageInitFn,
    userFn,
    utilFn,
    wxmlFn
]
const originProperties = [
    'data',
    'properties',
    'options'
];
const originMethods=[
    'onLoad',
    'onShow',
    'onReady',
    'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onShareAppMessage',
    'onShareTimeline','' +
    'onAddToFavorites',
    'onPageScroll',
    'onResize',
    'onTabItemTap'
];
export function setMerge(options,use){
    if (!options.mixins) options.mixins = []
    options.mixins.push(...use)
    const mixins = options.mixins;
    options = setUser(options)
    if (Array.isArray(mixins)) {
        delete options.mixins;
        options = merge(mixins, options)
    }
    return options
}

function setUser(options) {
    options.mixins.push(pageInitFn)
    options.mixins.push(userFn)
    options.mixins.push(utilFn)
    options.mixins.push(wxmlFn)
    options.mixins.push(initPage)
    const sections = {throttle, debounce, once}
    for (let i in sections){
        if (options[i] && isObject(options[i])) {
            const tharo = options[i];
            const time = tharo.time || void 0
            for (let [key, value] of Object.entries(tharo)) {
                options[key] = sections[i].call(this,function (...args) {
                    value.call(this, ...args)
                }, time)
            }
        }
    }
    return options
}

function merge(mixins, options) {
    mixins.forEach((mixin) => {
        if (Object.prototype.toString.call(mixin) !== '[object Object]') {
            throw new Error('对象错误')
        }
        for (let [key, value] of Object.entries(mixin)) {
            if (originProperties.includes(key)) {
                options[key] = {...value, ...options[key]}
            } else if (originMethods.includes(key)) {
                const originFunc = options[key]
                options[key] = function (...args) {
                    value.call(this, ...args)
                    return originFunc && originFunc.call(this, ...args)
                }
            } else {
                options = {...mixin, ...options}
            }
        }
    })
    return options
}
