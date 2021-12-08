import {isUndefined} from "../utils/util";

export default {
    $onTab(e){
        let {parents,index}=e.currentTarget.dataset;
        if(isUndefined(parents)) parents='tab';
        this.setData({
            [parents]: index
        })
        isUndefined()
    },
    $selectItem(e){
        let {parents,index,setname,radio}=e.currentTarget.dataset;
        if(isUndefined(setname)) setname='select'
        if(radio){
            this.data[parents].forEach((x,i)=>x[setname]=i==index)
        }else{
            this.data[parents][index][setname]=!arr[index][setname]
        }
        this.setData({[parents]:this.data[parents]})
    }
}
