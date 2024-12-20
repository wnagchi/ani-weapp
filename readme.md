# Mini Program Enhancement Framework

The framework aims to provide a powerful set of enhancements for mini-program development, making development more efficient and maintenance more convenient. Inspired by some excellent designs from Vue, this framework offers the following core features:

## Core Features

- **Real-time Cross-Component Communication**: Achieves real-time state synchronization between parent and child components, making state management more intuitive and convenient.
- **WatchStore Functionality**: Similar to Vue's watch function, it can monitor changes in global state and respond reactively to data updates.
- **Simple Import Mechanism**: The framework is designed to be simple and easy to import, allowing for quick integration without extensive modifications to existing pages.
- **Mixin Functionality**: Provides a feature similar to Vue's mixin, supporting the division of page logic for easier function reuse and later maintenance.
- **Screen Safe Area Adaptation**: Built-in screen safe area functionality automatically adapts to various screen sizes, especially the bottom safe area of Apple series phones.
- **Enhanced Page Navigation**: Offers optimized page navigation functions, supporting parameterized navigation in WXML and JavaScript, simplifying the complexity of the official navigation method.
- **Functional Scope Management**: Includes practical functions such as throttling, debouncing, and single-trigger through block management to enhance code stability and performance.
- **Canvas 2D API Encapsulation**: Provides efficient encapsulation of the Canvas 2D API for quick implementation of graphic drawing, poster generation, and other functions.
- **Lifecycle Listening**: Supports deep listening of page lifecycle events such as onLoad, onReady, and onShow, facilitating the implementation of complex page logic.
- **Route Interception**: Offers comprehensive route interception functionality applicable to all navigation methods, including native navigation, enhancing page access control.

## Quick Start
# Node Version Requirement: v16.*

```shell
npm i

npm run dev
```

#### Import


 In app.js, import globally
```javascript
// app.js
import Ani from './ani'

App({
  Ani:new Ani()
})

```

---------------------


## Built-in Features


# Store:
### Synchronously listen to modifications, allowing for the addition of state using setStore() in Page or Component, and listen to state changes using watchStore. This enables real-time communication between components and pages, avoiding cumbersome operations of cross-component value passing.
![Video_2021-08-07_202608](https://z3.ax1x.com/2021/08/07/fM46OI.gif)

Trigger: Add the listening value to Store through the constructor.setStore(key, value)
```javascript
//apps refers to app.Ani.Component
apps.setStore(key,value)


```
Example:
```javascript

const app=getApp()
const apps=app.Ani.Component({
  data: {
    val:0
  },
  methods: {
    setStore(){
      this.data.val++;
       Modify store
      apps.setStore('monitor',this.data.val)
    }
  },
})

```



Listen to Store Basic Usage similar to Vue Watch:
```javascript
 watchStore: {
    'key'(news, old) {
        console.log(news,old)
    }
}
```
Example:
```javascript
// Page
const app = getApp()
const index=app.Ani.Page({
  data: {
    otherHeight:0
  },

  // Listener
  watchStore: {
    'monitor'(news, old) {
        this.setData({
            monitor: news
        })
    }
  },

})


// Other Component
// This part is tricky because when triggered in the component's watchStore, 'this' is not available for binding, so external 'this' definition must be used to access other methods temporarily.
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

Jump Direct jump in the wxml page::

```html

  <button 
  Event: $toPath
  bindtap="$toPath" 

  Jump Type: data-to-type
  data-to-type="to" 

  Jump Path: data-path
  data-path="../item/item" 

  Jump Parameters: data-to-data
  data-to-data="{{hh}}" 
>
  Jump with Parameters 
</button>
```
$toPath: Jump event name data-path: Jump path data-to-data: Jump parameters data-to-type: Jump type Note: The jump type is the same as the official WeChat jump method and supports shorthand

navigateTo: Default jump method; shorthand (to)
switchTab: Shorthand (toTab) jumps to the tabBar page and closes all other non-tabBar pages
reLaunch: Shorthand (launch) closes all pages, navigates to a page within the application
redirectTo: Shorthand (offTo) closes the current page, navigates to a page within the application. Cannot jump to tabBar page.
navigateBack: Shorthand (back) closes the current page, returns to the previous or multi-level page.
Jump event in js:
```javascript
this.$toPath({
  Jump Path: path
  path: '../item/item',

  Jump Parameters: toData
  toData: { a: 30 },

  Jump Type: toType
  toType: 'offTo'
})

```


BeforeRouter
Triggered before the jump

Note: This function applies not only to jumps executed by $toPath but also to all native WeChat jumps.
Can be globally monitored in App.js. In the callback function routerData, jump-related information is returned. You can modify jump parameters, paths, and types in it. Return false will intercept the route.
```javascript
App({
  Ani:new Ani(),
  onLaunch() {
      /*
      * Before executing route jump
      * @param {object} routerData Jump related parameters can be modified
      * */
      this.Ani.beforeRouter(function(routerData){
  	console.log(routerData);
  	// Prohibit further jumps
        // return false
        // Modify jump parameters
        // return {
        //   data: {
        //     url: '111111'
        //   },
        //   routerType: 'redirectTo'
        // }
          
      })
  }
}）
```

# AfterRouter
Triggered after the jump

Can be globally monitored in App.js In the callback function page, the instance of the page being navigated to is returned. Methods in the navigated page can be used.
```javascript
App({
  Ani:new Ani(),
  onLaunch() {
  	    /*
    * After route jump
    * @param {object} page
    * */
    this.Ani.afterRouter(function(page){
        console.log(page);
	 page.setData({ title: 'Returned Information' })
      })
  }
}）
```



---------------------
# Scope
Functional scope Write functions in the corresponding object
##### Throttle
```javascript
 throttle: {
         // Allowed retrigger time
        time:'1200',
	 // Function
        dbClick() {
            console.log('throttle');
        },
    },

```
##### Debounce
```javascript
debounce: {
        // Allowed retrigger time
        time:'500',
	 // Function
        debounce() {
            console.log('debounce');
        }
    },

```
##### Execute Once
```javascript
 once: {
 	 // Function
        todoOnce() {
            console.log('once');
        }
    },
```
---------------------
# Storage
Operate Storage Allows adding effective time to Storage

Add Storage：
```javascript
// Add a storage with a valid time of 5 seconds
this.$setStorage('key','value', 5)
```
Get Storage:
```javascript
const key= this.$getStorage('key')
```	
Delete Storage:
```javascript
this.$removeStorage('key')

```	
---------------------
# Mixin
Code Mixin
**Note: mixin js can also use $toPath and other functions**
Usage in js:
```javascript
const app=getApp();
// Import js
import one from './one'
import two from './two '
....

const apps = app.Ani.Page({
   // Add to mixins array
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
         title: 'Hello',
      })
    }
}

```
-------------------
# Page Lifecycle Listening
# Listen
Page lifecycle listening events can uniformly listen to the execution status of the lifecycle in the page. Can be used for page burying points or unified management and other related operations
#### onLoad
Listen to onLoad event

```javascript
 this.Ani.listen('onLoad',function(options){
        console.log('onLoad');
		return {
			name:'1'
		}
      })
```
options are the passed page parameters You can use return to modify the parameters received by onLoad in the page Can be used to uniformly listen to and handle page parameter-related 
Example:
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
Listen to onShow event

```javascript
 this.Ani.listen('onShow',function(options){
        console.log('onShow');
		//this即为当前显示页面中的this
		console.log(this);
      })
```
Example:
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
Listen to onReady event

The method of calling and using is the same as the onShow event.

#### onHide
Listen to onHide

The method of calling and using is the same as the onShow event.

-------------------

# Additional Features
## These methods can all be called directly in the Page wxml
### Delayed Wait $sleep(time)
```javascript
async function someAsyncFunction() {
    await this.$sleep(2000);
     console.log('Executed after a 2-second delay');
}
```

### Make a Call $call(e)
```javascript
this.$call('1234567890');
```
Use in wxml
```html
<button bindtap="$call" data-phone="024-13113141">Make a Call</button>
```
### Page Return and Pass Data $backPage(key, val, toPre)
````javascript
// Return and pass data
this.$backPage('someKey', 'someValue');
````

# Store Usage
## CreateStore

`CreateStore`  is a core class used to create application state storage. It is responsible for maintaining the application's state tree and allows updating the state through the `dispatch` method.
### Usage

```javascript
const store = new CreateStore(reducer, initialState);
```
- reducer: A function that returns a new state based on the current state and the given action.
- initialState: Optional initial state value.
## applyMiddleware
`applyMiddleware` is a higher-order function used to apply middleware to `CreateStore`. The function allows you to add middleware to the store to enhance its functionality. Middleware can be used for logging, asynchronous operation handling, etc.
### Usage

```javascript
applyMiddleware(store, [middleware1, middleware2]);
```
- store: A  `CreateStore`  instance.
- middleware1, middleware2: Middleware functions.
## logger
`logger`  is a logging middleware used to record every state change.
### Usage

```javascript
applyMiddleware(store, [logger]);
```
## thunk
`thunk` thunk is an asynchronous operation middleware used to handle asynchronous operations.
### Usage

```javascript
applyMiddleware(store, [thunk]);
```
## persistMiddleware
`persistMiddleware`  is a persistence middleware used to persist state to local storage.
### Usage

```javascript
applyMiddleware(store, [persistMiddleware]);
```
## dispatch
`dispatch` is a method used to trigger actions to update the state.
### Usage

```javascript
store.dispatch({ type: 'INCREMENT' });
```
## subscribe
`subscribe`  is a method used to subscribe to state changes to listen for state changes.
### Usage

```javascript
const unsubscribe = store.subscribe(() => console.log(store.getState()));

// Unsubscribe
unsubscribe();
```
## getState
`getState`  is a method used to get the current state.
### Usage

```javascript
store.getState();
```


### Build store
```javascript

// Import various parts of the state management library, including methods for creating stores, applying middleware, and some built-in middleware
import { CreateStore, applyMiddleware, logger, thunk, persistMiddleware, Action } from './ani.store.RD.min';

// Define the initial state, which can contain any number of key-value pairs, using userInfo as an example
const initialState = {
    userInfo: {}, // Initial user information is an empty object
};

// Define the root reducer, which handles all actions and returns a new state
function rootReducer(state = initialState, action: Action) {
    switch (action.type) {
        case 'SET_USER_INFO':  // When the action type is 'SET_USER_INFO', update userInfo
            return { ...state, userInfo: action.payload };  // Use the payload of the action to update userInfo
        default:
             console.log('No matching Action') // If there is no matching action type, print the log
            return state; // Return the unmodified state
    }
}

// Create a new store using rootReducer and initialState
const store = new CreateStore(rootReducer, initialState);

// Apply middleware to the store
// logger middleware is used to print action and state change information
// thunk middleware allows us to dispatch functions in addition to action objects
// persistMiddleware middleware is used to persist state changes to local storage
applyMiddleware(store, [logger, thunk, persistMiddleware]);

// Export the configured store for use in other parts of the application
export default store;

    
```
### Dispatch Actions
```javascript
store.dispatch({ type: 'INCREMENT' });
```
### Subscribe to State Changes
```javascript
const unsubscribe = store.subscribe(() => console.log(store.getState()));

// Unsubscribe
unsubscribe();
```
#### Other Small Function Demos

