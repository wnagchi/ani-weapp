const app=getApp();
let that;
app.Ani.beforeRouter(function (data) {
    console.log(this)
    // console.log('hhhhhhhhh')
    return true
  })
Page({
  data: {
    hh: 10,
    otherHeight: 100
  },
  onLoad() {
    that = this
  },
  onShow() {
    console.log('页面中的onShow')
    console.log(this)
  },
  onReady() {
    // apps.setStore('cc', 23233)
  },
  //初始化完成事件
  onInit() {
    console.log('获取到了高度', this.data.windowHeight);
  },
  $beforeRouter(){
    console.log(this);
    console.log(1111111111111);
  },
  toItem1() {
    this.$toPath({
      path: './item',
      toData: {a: 10},
      toType: 'to'
    })
  },
  toItem2() {
    this.$toPath({
      path: './item',
      toData: {a: 20},
      toType: 'offTo'
    })
  },
  promise() {
    return new Promise(res => {
      setTimeout(_ => {
        res(10)
      }, 1000)
    })
  },
  // 路由拦截
  $toPathBefore(e) {
    if (!e.pageTo && e.toType === 'to') {
      return {
        toData: 'toPathBefore'
      }
    }

    return true
  },
  // 同步路由拦截
  async $toPathBeforeAsync(e) {

    if (!e.pageTo && e.toType === 'to') {
      await this.promise()
      return {
        toData: 'toPathBeforeAsync'
      }
    }
    return true
  },
  // 监听store
  watchStore: {
    'monitor'(news, old) {
      console.log('new', news, 'old', old);
        this.setData({
            monitor: news
        })
    }
  },
  // 节流
  throttle: {
      dbClick() {
          console.log('throttle');
      },
  },
    // 防抖
    debounce: {
        debounce() {
            console.log('debounce');
        }
    },
    once: {
        todoOnce() {
            console.log('once');
        }
    },
    setStorage() {
        // 设置有效时长为5秒的storage
        this.$setStorage('once', {
            Storage1: 10
        }, 5)
    },
    getStorage() {
        const once = this.$getStorage('once')
        console.log(once);
    },
  removetStorage() {
    this.$removeStorage('once')
  },
  randomArr() {

  },
  //$animateStart动画执行完成时触发
  $animateStartAfter() {
    console.log('动画已经执行完成');
    //获取元素高度
    this.$getHeight('#animateView').then(res => {
      console.log(res);
    })
  }


})
