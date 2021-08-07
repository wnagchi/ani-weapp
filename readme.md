## 简介
在微信小程序中可以使用类似vue 监听器功能 跨组件，页面进行实时通信，更快捷的参数传递
更简便的获取屏幕安全区域


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






