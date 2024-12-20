# 小程序增强框架

本框架旨在为小程序开发提供一套强大的增强功能，使得开发更加高效，维护更加便捷。借鉴了 Vue 的一些优秀设计，本框架提供了以下核心特性：

## 核心特性

- **跨组件实时通信**：实现了父子组件间的实时状态同步，让状态管理变得更加直观和便捷。
- **WatchStore 功能**：类似于 Vue 的 watch 功能，能够监听全局状态的变化，响应式地处理数据更新。
- **简便的引入机制**：框架设计简洁，易于引入，无需对现有页面进行大量修改即可快速集成。
- **Mixin 功能**：提供了类似于 Vue 中的 mixin 功能，支持将页面逻辑拆分，便于功能复用和后期维护。
- **屏幕安全域适配**：内置屏幕安全域功能，自动适配各种屏幕尺寸，特别是苹果系列手机的底部安全区域。
- **增强的页面跳转**：提供了封装优化后的页面跳转功能，支持在 WXML 和 JavaScript 中实现带参跳转，简化了官方跳转方式的复杂度。
- **功能性作用域管理**：内置了节流、防抖、单次触发等实用功能，通过区块化管理，提升代码的稳定性和性能。
- **Canvas 2D API 封装**：提供了 Canvas 2D API 的高效封装，快速实现图形绘制、海报生成等功能。
- **生命周期监听**：支持对 onLoad、onReady、onShow 等页面生命周期事件的深度监听，便于实现复杂的页面逻辑。
- **路由拦截**：提供了全面的路由拦截功能，适用于所有跳转方式，包括原生跳转，增强页面访问控制。

## 快速开始
# node版本要求：v16.*

```shell
npm i

npm run dev
```

#### 引入


 在app.js中全局引入
```javascript
// app.js
import Ani from './ani'

App({
  Ani:new Ani()
})

```

---------------------


## 内置功能


# Store:
### 同步监听修改，可以在Page或者Component使用setStore()新增状态，并使用watchStore监听状态变化;从而实现组件与组件，组件与页面间的实时通信，避免了跨组件传值的麻烦操作
![Video_2021-08-07_202608](https://z3.ax1x.com/2021/08/07/fM46OI.gif)

触发：通过  构造器.setStore(key,value)  将监听值加入Store
```javascript
//apps为app.Ani.Component
apps.setStore(key,value)


```
例子：
```javascript

const app=getApp()
const apps=app.Ani.Component({
  data: {
    val:0
  },
  methods: {
    setStore(){
      this.data.val++;
      修改store
      apps.setStore('monitor',this.data.val)
    }
  },
})

```



监听Store 基本用法同Vue Watch:
```javascript
 watchStore: {
    'key'(news, old) {
        console.log(news,old)
    }
}
```
例子：
```javascript
//页面
const app = getApp()
const index=app.Ani.Page({
  data: {
    otherHeight:0
  },

  // 监听器
  watchStore: {
    'monitor'(news, old) {
        this.setData({
            monitor: news
        })
    }
  },

})


//其他组件
//这个地方很捞 组件的watchStore中触发时没拿到this无法绑定 所以暂时只能通过外部定义this来使用其他方法
const app=getApp()
let that;
app.Ani.Component({
  data: {

  },
  ready(){
    that=this
  },

  watchStore:{
    'monitor'(news){
      that.setData({ monitor:news })
    }
  }
})
```
---------------------

# Router

跳转
wxml页面中直接跳转:

```html

  <button 
  		事件：$toPath
        bindtap="$toPath" 
		
		跳转类型：data-to-type
        data-to-type="to" 
		
		跳转路径：data-path
        data-path="../item/item" 
		
		跳转参数：data-to-data
        data-to-data="{{hh}}" 
    >
        带参数跳转 
    </button>
```
$toPath：跳转事件名称
data-path：跳转路径
data-to-data：跳转参数
data-to-type：跳转类型
**注：跳转类型同微信官方跳转方式，并支持简写**
 - navigateTo：默认跳转方式；简写（to）
 - switchTab：简写（toTab）跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
 - reLaunch：简写（launch）关闭所有页面，打开到应用内的某个页面
 - redirectTo：简写（offTo）关闭当前页面，跳转到应用内的某个页面。但是不允许跳转到 tabbar 页面。
 - navigateBack：简写（back）关闭当前页面，返回上一页面或多级页面。

js中的跳转事件:
```javascript
this.$toPath({

     跳转路径：path
      path: '../item/item',
	  
	  跳转参数：toData
      toData: {a:30},
	  
	  跳转类型：toData
      toType: 'offTo'
    })

```


# BeforeRouter
执行跳转之前触发
## 注：该功能不仅针对$toPath执行的跳转功能，而是对所有wx原生跳转同样生效
可以在App.js中进行全局侦听
在回调函数routerData中会返回跳转相关信息
可以在其中进行修改跳转参数，跳转路径，以及跳转类型
return false 则会进行路由拦截
```javascript
App({
  Ani:new Ani(),
  onLaunch() {
      /*
      * 执行路由跳转之前
      * @param {object} routerData 跳转相关参数 可进行修改
      * */
      this.Ani.beforeRouter(function(routerData){
	  
          console.log(routerData);
          // 禁止继续跳转
          // return false
          //修改跳转参数
          // return {
          //   data:{
          //     url:'111111'
          //   },
          //   routerType:'redirectTo'
          // }
          
      })
  }
}）
```

# AfterRouter
执行跳转之后触发

可以在App.js中进行全局侦听
在回调函数page中会返回跳转到的页面实例
可以使用被跳转页面中的方法
```javascript
App({
  Ani:new Ani(),
  onLaunch() {
  	  /*
      * 执行路由跳转之后
      * @param {object} page
      * */
    this.Ani.afterRouter(function(page){
        console.log(page);
		page.setData({title:'返回信息'})
      })
  }
}）
```



---------------------
# Scope
功能性作用域 在对应对象中书写函数 即可
##### 节流
```javascript
 throttle: {
        // 允许再次触发时间
        time:'1200',
		//函数
        dbClick() {
            console.log('throttle');
        },
    },

```
##### 防抖
```javascript
debounce: {
        // 允许再次触发时间
        time:'500',
		//函数
        debounce() {
            console.log('debounce');
        }
    },

```
##### 执行一次
```javascript
 once: {
 		//函数
        todoOnce() {
            console.log('once');
        }
    },
```
---------------------
# Storage
操作Storage 允许添加Storage的有效时间

添加Storage：
```javascript
//添加一条有效时间为5秒的存储
this.$setStorage('key','value', 5)
```
获取Storage：
```javascript
const key= this.$getStorage('key')
```	
删除Storage：
```javascript
this.$removeStorage('key')

```	
---------------------
# Mixin
代码混入
**注：mixin js中一样可以使用$toPath等功能**
js中使用方法：
```javascript
const app=getApp();
//引入js
import one from './one'
import two from './two '
....

const apps = app.Ani.Page({
    //加入到mixins数组中
    mixins:[one,two ],
	
    onLoad(options){
       
    }
})
```
one.js ：
```javascript
export default{
	data:{

	},
    onReady(){
       	...
    },
	onShow(){
	    ...
	},
    showToast(){
      wx.showToast({
        title: '你好',
      })
    }
}

```
-------------------
# 页面生命周期侦听
# Listen
页面生命周期侦听事件 可以统一侦听页面中的生命周期执行情况
可以用来参与页面埋点或页面统一管理等相关操作
#### onLoad
侦听onLoad事件

```javascript
 this.Ani.listen('onLoad',function(options){
        console.log('onLoad');
		return {
			name:'1'
		}
      })
```
options 为带过来的页面参数
可以通过return 进行修改页面中onLoad接收到的参数
可以用来统一侦听处理页面参数相关
例子：
```javascript
// app.js
App({
  Ani:new Ani(),
  onLaunch() {
       this.Ani.listen('onLoad',function(options){
			console.log('onLoad');
			return {
				name:'1'
			}
      })
  },
})

```

#### onShow
侦听onShow事件

```javascript
 this.Ani.listen('onShow',function(options){
        console.log('onShow');
		//this即为当前显示页面中的this
		console.log(this);
      })
```
例子：
```javascript
// app.js
App({
  Ani:new Ani(),
  onLaunch() {
       this.Ani.listen('onShow',function(options){
			console.log('onShow');
      })
  },
})

```

#### onReady
侦听onReady事件

调用方法及使用同上onShow事件

#### onHide
侦听onHide

调用方法及使用同上onShow事件

-------------------

# 附加功能
## 这些方法都可以在Page wxml中直接进行调用
### 延时等待 $sleep(time)
```javascript
async function someAsyncFunction() {
    await this.$sleep(2000);
    console.log('延时2秒后执行');
}
```

### 拨打电话 $call(e)
```javascript
this.$call('1234567890');
```
wxml中使用
```html
<button bindtap="$call" data-phone="024-13113141">拨打电话</button>
```
### 页面返回并传递数据 $backPage(key, val, toPre)
````javascript
// 返回并传递数据
this.$backPage('someKey', 'someValue');
````

# store 使用方法
## CreateStore

`CreateStore` 是一个核心类，用于创建应用的状态存储。它负责维护应用的状态树，并允许通过 `dispatch` 方法更新状态。
### 使用方法

```javascript
const store = new CreateStore(reducer, initialState);
```
- reducer: 一个函数，根据当前状态和给定的动作返回新状态。
- initialState: 可选，初始状态值。
## applyMiddleware
`applyMiddleware` 是一个高阶函数，用于将中间件应用于 `CreateStore`。 函数使你可以向存储添加中间件，以增强其功能。中间件可以用于日志记录、异步操作处理等。
### 使用方法

```javascript
applyMiddleware(store, [middleware1, middleware2]);
```
- store: 一个 `CreateStore` 实例。
- middleware1, middleware2: 中间件函数。
## logger
`logger` 是一个日志记录中间件，用于记录每次状态变更。
### 使用方法

```javascript
applyMiddleware(store, [logger]);
```
## thunk
`thunk` 是一个异步操作中间件，用于处理异步操作。
### 使用方法

```javascript
applyMiddleware(store, [thunk]);
```
## persistMiddleware
`persistMiddleware` 是一个持久化中间件，用于将状态持久化到本地存储。
### 使用方法

```javascript
applyMiddleware(store, [persistMiddleware]);
```
## dispatch
`dispatch` 是一个用于触发动作的方法，用于更新状态。
### 使用方法

```javascript
store.dispatch({ type: 'INCREMENT' });
```
## subscribe
`subscribe` 是一个用于订阅状态变更的方法，用于监听状态变更。
### 使用方法

```javascript
const unsubscribe = store.subscribe(() => console.log(store.getState()));

// 取消订阅
unsubscribe();
```
## getState
`getState` 是一个用于获取当前状态的方法。
### 使用方法

```javascript
store.getState();
```


### 构建store
```javascript

// 引入状态管理库的各个部分，包括创建存储的方法、应用中间件的方法以及一些内置中间件
import { CreateStore, applyMiddleware, logger, thunk, persistMiddleware, Action } from './ani.store.RD.min';

// 定义初始状态，可以包含任意多个键值对，此处以 userInfo 为例
const initialState = {
    userInfo: {}, // 初始用户信息为空对象
};

// 定义根 reducer，它负责处理所有的动作并返回新的状态
function rootReducer(state = initialState, action: Action) {
    switch (action.type) {
        case 'SET_USER_INFO': // 当动作类型为 'SET_USER_INFO' 时，更新 userInfo
            return { ...state, userInfo: action.payload }; // 使用 action 的 payload 更新 userInfo
        default:
            console.log('无匹配的Action') // 若无匹配的动作类型，打印日志
            return state; // 返回未修改的状态
    }
}

// 使用 rootReducer 和 initialState 创建一个新的存储
const store = new CreateStore(rootReducer, initialState);

// 应用中间件到存储
// logger 中间件用于打印动作和状态的变化信息
// thunk 中间件允许我们派发函数而不仅仅是动作对象
// persistMiddleware 中间件用于将状态的变化持久化到本地存储
applyMiddleware(store, [logger, thunk, persistMiddleware]);

// 导出配置好的存储，以便在应用的其他部分使用
export default store;

    
```
### 调度动作
```javascript
store.dispatch({ type: 'INCREMENT' });
```
### 订阅状态变更
```javascript
const unsubscribe = store.subscribe(() => console.log(store.getState()));

// 取消订阅
unsubscribe();
```
#### 其他小功能贱Demo

