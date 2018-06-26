// component/ticket/ticket.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    type: {
      type: Number,
      value: 1
    },
    typeName: {
      type: String,
      value: ''
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
      type: Number,
      value: 1527782400
    },
    endTime: {
      type: Number,
      value: 1530288000
    },
    ticketId: {
      type: Number,
      value: 0
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
    showCard: function () {
      var myEventDetail = {id: this.properties.ticketId} // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      this.triggerEvent('myevent', myEventDetail, myEventOption)
    }
  }
})
