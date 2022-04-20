import createPage from './page'
import {isFunction, isObject} from '../utils/util'
import {setMerge} from '../module/mergeComponent'
const oldComponent=Component;


export default class createComponent extends createPage{
    constructor(){
        super()
        this.componentCreateData=null;
        this.componentCreateDataArr=[]
    }

   
    initComponent(){
        this.componentCreateData = setMerge(this.componentCreateData)
        return oldComponent(this.componentCreateData)
    }

    setComponent(creatData) {
        // console.log(creatData);
        if (creatData.type === 'page') {
            super.setPage(creatData.options)
        } else {
            this.componentCreateData = creatData.options;
            this.componentCreateDataArr.push({data: this.componentCreateData, path: this.initComponent()})

        }
    }

    agencyComponent() {
        let that = this;
        Component = function (options) {

            if (!options.methods) options.methods = {}
            options.methods.$setStore = that.setStore.bind(that)
            options.methods.$getStore = that.getStore.bind(that)
            let pageName = null;
            let watchMethods = {}
            that.componentCreateData = options
            if (!options.pageLifetimes) options.pageLifetimes = {}
            // 此处曾导致已知bug
            let oldShow=function(){};
            if(options.pageLifetimes.show){
                console.dir(options.pageLifetimes.show)
                oldShow=options.pageLifetimes.show
            }
            options.pageLifetimes.show = function () {
                Object.keys(options).forEach(x => {
                    if (isObject(options[x]) && x === 'watchStore') {
                        if (!options.methods) options.methods = {}
                        Object.keys(options[x]).forEach(watch => {
                            options.methods['watch_' + watch] = options[x][watch].bind(this)
                            watchMethods[`${'watch_' + watch}`] = options.methods['watch_' + watch]
                        })

                    }
                })
                that.componentCreateDataArr.push({data: watchMethods, path: pageName})
                oldShow.call(this)
            }

            pageName = that.initComponent()

        }
    }

}
