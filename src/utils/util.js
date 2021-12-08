export const isObject=item=>Object.prototype.toString.call(item)==='[object Object]'
export const isFunction=item=>Object.prototype.toString.call(item)==='[object Function]'
export const isUndefined=item=>item===undefined
export const isString=item=>typeof item==='string'
export const isArray=item=>Object.prototype.toString.call(item) === '[object Array]'
