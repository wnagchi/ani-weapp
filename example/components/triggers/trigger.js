const app=getApp()
const apps=app.Ani.Component({
  data: {
    val:0
  },
  methods: {
    setStore(){
      this.data.val++;
      apps.setStore('monitor',this.data.val)
    }
  },
})
