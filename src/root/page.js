
import {setMerge} from "../module/merge"
import {isFunction, isObject} from "../utils/util";

import Listen from "../module/listen";
export default class createPage{
    
    constructor() {
        this.pageCreateDataArr = []
        this.ListenPage = []
        this.Listen = new Listen()
        this.oldPage=Page
    }

    initPage(creatData){
        Object.keys(creatData).forEach(x=>{
            if(isObject(creatData[x])){
                if(x==='watchStore'){
                    Object.keys(creatData[x]).forEach(watch=>{
                        creatData['watch_' + watch] = creatData[x][watch]
                    })
                }
            }
        })


        return this.oldPage(setMerge(creatData,this.use))
    }

    setPage(creatData) {
        this.pageCreateDataArr.push({data: creatData, path: this.initPage(creatData)})
    }

    listen(name, fn) {
        const ListenList = ['onLoad', 'onShow', 'onReady', 'onHide']
        if (!ListenList.includes(name)) return console.error(name + '侦听失败')
        this.ListenPage.push({
            name, fn
        })
    }

    agencyPage() {
        let that = this;
        this.oldPage=Page
        Page = function (options) {
            that.ListenPage.forEach(x => {
                if (!options[x.name]) options[x.name] = function () {}
                let oldMethods = options[x.name]
                options[x.name] = that.Listen[x.name](options[x.name], x.fn)
            })
            options.$setStore = that.setStore.bind(that)
            options.$getStore = that.getStore.bind(that)
            // console.log('endOptions', options.onShow)
            that.initPage(options)
        }
    }

}

