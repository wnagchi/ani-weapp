export const throttle=(fn,durTime=1500)=>{
    let time=false;
    return function (){
        let args=arguments;
        if(time){
            return false
        }else{
            fn.apply(this, args)
        }
        time=setTimeout(()=>{
            time=false
        },durTime)
    }
}

export const debounce=(fn,durTime=1500)=>{
    let todo=false;
    let time;
    return function (){
        let args=arguments;
        if(!todo){
            todo = true;
            fn.apply(this, args)
        }
        clearTimeout(time)
        time = setTimeout(() => {
            todo = false
        }, durTime)
    }
}

export const once = (fn) => {
    let todo = false;
    return function () {
        if (!todo) {
            todo = true;
            let args = arguments;
            fn.apply(this, args)
        }
    }
}
