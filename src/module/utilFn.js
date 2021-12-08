export default {
    $getData:(e)=>e.currentTarget.dataset,
    $random:(arr)=>{
        let randomArr=arr;
        return function (){
            if(randomArr.length==0) {
                console.warn('目标数组已空')
                return
            }
            let rIndex=parseInt(Math.random()*(randomArr.length-1))
            let item=randomArr[rIndex]
            randomArr.splice(rIndex,1)
            return item
        }
    },
    $cutArray(dataArr,maxlength,triLength){
        if(triLength){
            if(dataArr.length>=triLength){
                dataArr.splice(maxlength,dataArr.length)
            }
        }else{
            dataArr.splice(maxlength,dataArr.length)
        }
        return dataArr
    },
    $dataToString(data){
        let dataArr=[];
        for(let i in data){
            let str=`${i}=${data[i]}`
            dataArr.push(str)
        }
        return dataArr.join('&')
    },
    $shinglier(str,len=5,end='..'){
        let arr=str.split('');
        let newArr=[];
        for(let i=0;i<arr.length;i++){
            if(i>=len){
                newArr.push(end)
                break;
            }
            newArr.push(arr[i])
        }
        return newArr.join('');

        let newStr=str.substring(0,len+1);
        return newStr+end;
    },
    $strSm(str,len=1,strArr=[]){
        if(str.length>len){
            let newSmStr=str.substr(0, len);
            strArr.push(newSmStr)
            let newStr=str.slice(len)
            return strSm(newStr,len,strArr)
        }
        strArr.push(str)
        return strArr
    }
}
