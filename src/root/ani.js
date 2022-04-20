import createComponent from './component'
import Agency from '../module/agencyWX'
import pageInitFn from '../module/pageInitFn'
import storage from "../module/storage";

export default class Ani extends createComponent{

    constructor(config) {
        super()

        this.store = this.proxyStore({})
        // 如果有配置项 并且配置代理默认
        if(!config) config={}

        this.use=config.use||[]
    
        if(config.proxyBase!=false){
            super.agencyPage()
            super.agencyComponent()
        }
            
        
        this.config = config
        // 代理wx方法
        this.agencyWx = new Agency()
    }

    beforeRouter(fn) {
        this.agencyWx.setRouterBefore({before: fn})
    }

    afterRouter(fn) {
        setTimeout(_ => {
            fn(getCurrentPages()[getCurrentPages().length - 1])
        }, 300)
        this.agencyWx.setRouterAfter({succeed: fn})
    }

    static wxFn(){
        return pageInitFn
    }
    static storage(){
        return storage
    }
    static $getStorage(...args){
        return storage.$getStorage(...args)
    }
    static $removeStorage(...args){
        return storage.$removeStorage(...args)
    }
    static $setStorage(...args){
        return storage.$setStorage(...args)
    }
    proxyStore(obj) {
        const that = this
        return new Proxy(obj,{
            get(target,property,receiver){
                return target[property]
            },
            set(target, p, value, receiver) {
                // if(typeof value=='object'){
                //     target[p]=that.proxyStore(value)
                // }else{
                //     target[p]=value
                // }
                that.hookSetStore(p,value,target[p])
                target[p]=value
                return true
            }
        })
    }
    setStore(key,val){
        this.store[key]=val;
    }
    hookSetStore(key,val,oldVal){
        if (this.componentCreateDataArr.length == 0) return
        this.componentCreateDataArr.forEach(x => {
            if (!Object.keys(x.data).length) return
            if (x.data['watch_' + key]) x.data['watch_' + key](val, oldVal)
        })
        const pages = getCurrentPages()
        pages.forEach(x => {
            if (!x.hasOwnProperty('watch_' + key)) return
            x['watch_' + key](val, oldVal)
        })
    }
    getStore(key){
        return this.store[key]
    }
    getStoreAll(){
        return this.store
    }


    Page(options){
        super.setComponent({options,type:'page'})
        return this
    }
    Component(options){

        super.setComponent({options,type:'component'})
        return this
    }
}

export const {$getStorage,$setStorage,$removeStorage,$clearStorage}=storage
