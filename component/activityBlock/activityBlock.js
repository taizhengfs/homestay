Component({
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    type: {
      type: [String,Number],
      value: 0,
    },
    startTime: {
      type: [String, Number],
      value: '0000.00.00'
    },
    endTime: {
      type: [String, Number],
      value: '0000.00.00'
    },
    price: {
      type: [String, Number],
      value: 0
    },
    realPrice: {
      type: [String, Number],
      value: 0
    },
    participateNum: {
      type: [String, Number],
      value: 0
    },
    activityDesc: {
      type: [String, Number],
      value: '非常棒的民宿'
    },
    cover: {
      type: String,
      value: ''
    },
    isJoin: {
      type: Boolean,
      value: false
    }
  },
  data:{
    isShowDel: false,
    inputVal: ''
  },
  methods: {
    onTap: function () {
      var myEventDetail = {} // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      if (this.properties.type===0) {
        let url = '../discount/discount'
        wx.navigateTo({
          url: url
        })
      } else {
        let url = '../lottery/lottery'
        wx.navigateTo({
          url: url
        })
      }
      this.triggerEvent('myevent', myEventDetail, myEventOption)
    },
  }
})