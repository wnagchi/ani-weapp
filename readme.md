# 小程序在组件化开发的时候可能没有达到vue那样的便捷，例如跨组件状态同步等。

### 这个插件可以：
- #### 1.通过代理的方式，为小程序添加了跨组件实时通信；父子组件实时同步状态功能；
- #### 2.与vue相似的WatchStore功能，监听全局状态的变化；
- #### 3.更加简单的引入，还内置了如同Vue中的mixin 功能， 将页面中复杂的功能拆解开，使后期维护更加方便；
- #### 4.内置了屏幕安全域功能 直接方便避免苹果系列手机下方黑条；
- #### 5.内置封装的跳转功能 可以直接在wxml中实现带参跳转，js带参跳转 ，封装成为比官方更加简便的调用方式，参数传递 ；同时也增加了 类似Vue中的路由拦截功能。
- #### 6.功能性作用域内置了节流，防抖，只允许触发一次等作用区域。区块化的管理功能函数。




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
#### 使用
页面中使用
```javascript
const app = getApp()
Page({
	data:{
	
	},
	.....
})

将Page替换为app.Ani.Page

const app = getApp()
const index=app.Ani.Page({
  data: {
    otherHeight:0
  },
})

```





组件中使用

```javascript
const app = getApp()
Component({
	properties:{
	
	},
	.....
})

Component替换为app.Ani.Component

const app=getApp()
const apps=app.Ani.Component({
  properties: {

  },

  watchStore:{

  }
})

```


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

# ListenPage
监听当前显示的页面信息 
该方法会在首次进入小程序 及发生跳转后触发

```javascript
Ani.listenPage(fn(page,routerName))
```
###### listenPage回调函数中会带回两个参数 :
page:当前显示的页面栈实例
routerName：在发生跳转后会返回跳转类型

例子：
```javascript
// app.js
import Ani from './ani'
App({
  Ani:new Ani(),
  onLaunch() {
      this.Ani.listenPage(function(page,routerName){
          console.log(page,routerName);
      })
  },
})

```

#### 其他小功能贱Demo




