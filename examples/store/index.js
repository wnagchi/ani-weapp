import { observable, action } from 'mobx-miniprogram'

export const store = observable({

  list: [],

  setList: action(function (list) {
    this.list = list
  }),

})
