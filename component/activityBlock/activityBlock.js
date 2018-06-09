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
    }
  },
  data:{
    isShowDel: false,
    inputVal: ''
  },
  methods: {
    onTap: function(){
      this.triggerEvent('customevent', {}) // 只会触发 pageEventListener2
      this.triggerEvent('customevent', {}, { bubbles: true }) // 会依次触发 pageEventListener2 、 pageEventListener1
      this.triggerEvent('customevent', {}, { bubbles: true, composed: true }) // 会依次触发 pageEventListener2 、 anotherEventListener 、 pageEventListener1
    },
  }
})