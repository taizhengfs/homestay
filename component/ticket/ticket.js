// component/ticket/ticket.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    ticketType: {
      type: Number,
      value: 1
    },
    title: {
      type: String,
      value: ''
    },
    price: {
      type: Number,
      value: 0
    },
    desc: {
      type: String,
      value: ''
    },
    startTime: {
      type: String,
      value: '2018.5.24 12:00'
    },
    endTime: {
      type: String,
      value: '2018.6.24 12:00'
    },
    ticketCate: {
      type: String,
      value: '立即使用'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
