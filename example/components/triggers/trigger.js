const app=getApp()
Component({
  data: {
    val:0
  },
  methods: {
    setStore(){
      this.data.val++;
      this.$setStore('monitor',this.data.val)
    }
  },
})
