import {isUndefined} from "../utils/util"

export default {
    $setStorage(key, value, time) {
        let val = {
            data: typeof value === 'object' ? JSON.stringify(value) : value
        }
        if (!isUndefined(time)) {
            const seconds = parseInt(time);
            if (seconds > 0) {
                let timestamp = Date.parse(new Date());
                timestamp = timestamp / 1000 + seconds;
                val.time = timestamp;
            }
        }
        wx.setStorageSync('__'+key,val)
    },
    $getStorage(key) {
        let getVal = wx.getStorageSync('__' + key)||wx.getStorageSync( key);
        if (isUndefined(getVal) || getVal === '') return null
        if (!isUndefined(getVal.time)) {
            if (parseInt(getVal.time) > Date.parse(new Date()) / 1000) {
                if (getVal.data) {
                    try {
                        return JSON.parse(getVal.data)
                    } catch (error) {
                        return getVal.data
                    }
                }
                try {
                    return JSON.parse(getVal)
                } catch (error) {
                    return getVal
                }
            } else {
                wx.removeStorageSync(key);
                return null
            }
        } else {
            if (getVal.data) {
                try {
                    return JSON.parse(getVal.data)
                } catch (error) {
                    return getVal.data
                }
            }
            try {
                return JSON.parse(getVal)
            } catch (error) {
                return getVal
            }
        }
    },
    $removeStorage(key) {
        wx.removeStorageSync('__' + key);

    },
    $clearStorage() {
        wx.clearStorageSync();
    }
}
