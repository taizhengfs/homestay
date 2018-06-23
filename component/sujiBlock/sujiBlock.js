Component({
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    price: {
      type: [String, Number],
      value: 0
    },
    cover: {
      type: String,
      value: ''
    },
    title: {
      type: String,
      value: ''
    },
    tags: {
      type: Array,
      value:[]
    },
    locationName: {
      type: String,
      value: ''
    },
    distance: {
      type: String,
      value: ''
    },
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
    jumpToDetail() {
      var _this = this
      wx.navigateTo({
        url: '../homestaydetail/homestaydetail'
      })
    },
  }
})