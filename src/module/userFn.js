
import util from './utilFn'
import router from './router'
import storage from './storage'
import {isString,isUndefined} from '../utils/util'

export default {
    $setTimeFn(fn,time=500) {
        setTimeout(()=>{
            fn.apply(this,arguments)
        },time)
    },
    async $animateStart(e){
        let hideTime,showTime,setname;
        if(e.currentTarget){
            setname=util.$getData(e).setname;
            hideTime=util.$getData(e).hideTime;
            showTime=util.$getData(e).showTime;
        }else{
            hideTime=e.hideTime;
            showTime=e.showTime;
            setname=e.setname;
        }
        if(!setname) throw new Error('未填写setname字段')
        const that=this
        if(!that.data._animate) that.data._animate={};
        let _animate=that.data._animate[setname];

        if(!isUndefined(this.$animateStartBefore)){
            let backData=await this.$animateStartBefore(_animate)
            if(backData==false){
                return
            }
        }

        if(_animate&&_animate.if){
            that.data._animate[setname].start=false
            that.setData({_animate:that.data._animate})
            setTimeout(()=>{
                that.data._animate[setname].if=false
                if(!isUndefined(this.$animateStartAfter)){
                    this.$animateStartAfter(that.data._animate[setname])
                }
                that.setData({_animate: that.data._animate})
            },hideTime||300)
        }else{
            if(_animate==undefined) {
                that.data._animate[setname]={};
            }
            that.data._animate[setname].if=true;
            that.setData({_animate:that.data._animate})
            setTimeout(() => {
                that.data._animate[setname].start = true;
                that.setData({_animate: that.data._animate})
                setTimeout(_ => {
                    if (!isUndefined(this.$animateStartAfter)) {
                        this.$animateStartAfter(that.data._animate[setname])
                    }
                }, showTime || 300)

            }, 100)

        }
        // console.log(e,this,hideTime||.3)
    },
    $call(e){
        let phoneNumber=isString(e)?e:e.currentTarget.dataset.phone
        wx.makePhoneCall({phoneNumber}).catch(err=>{
            console.warn('取消拨打或错误')
        })

    },
    ...router,
    ...storage,
    $backPage(key,val,toPre=true){
        let routeArr=getCurrentPages()
        if(key&&val){
            routeArr[routeArr.length-2].data[key]=val;
        }
        if(toPre){
            wx.navigateBack({
                delta: 1,
            })
        }
    }

}
