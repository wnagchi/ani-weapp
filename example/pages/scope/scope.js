const app = getApp();

const apps = app.Ani.Page({

    // 节流
    throttle: {
        // 允许再次触发时间
        time:'1200',
        dbClick() {
            console.log('throttle');
        },
    },
    // 防抖
    debounce: {
        // 允许再次触发时间
        time:'500',
        debounce() {
            console.log('debounce');
        }
    },
    //执行一次
    once: {
        todoOnce() {
            console.log('once');
        }
    },

})