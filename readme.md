# 小程序在组件化开发的时候可能没有达到vue那样的便捷，例如跨组件状态同步等。

### 这个插件：
- #### 1.为小程序添加了跨组件实时通信；父子组件实时同步状态功能；
- #### 2.与vue相似的WatchStore功能，监听全局状态的变化；
- #### 3.更加简单的引入，还内置了如同Vue中的mixin 功能， 将页面中复杂的功能拆解开，使后期维护更加方便；
- #### 4.内置了屏幕安全域功能 直接方便避免苹果系列手机下方黑条；
- #### 5.内置封装的跳转功能 可以直接在wxml中实现带参跳转，js带参跳转 ，封装成为比官方更加简便的调用方式，参数传递 ；同时也增加了 类似Vue中的路由拦截功能。
- #### 6.功能性作用域内置了节流，防抖，只允许触发一次等作用区域。区块化的管理功能函数。
- # 7.引入简单 只需要在app.js中进行引入 无需修改页面 即可使用相关功能




## 开始


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


#### 内置功能


# Store:
同步监听修改
![Video_2021-08-07_202608](https://z3.ax1x.com/2021/08/07/fM46OI.gif)

触发：通过  构造器.setStore(key,value)  将监听值加入Store
```javascript
//apps为app.Ani.Component函数
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



监听Store:
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


#### 其他小功能贱Demo

