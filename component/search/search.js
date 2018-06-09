Component({
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    innerText: {
      type: String,
      value: 'default value',
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
    // 跳转搜索
    jumpToSearch() {
      console.log('let\'s go search')
    },
    clearInput(){
      var _this = this;
      _this.setData({
        inputVal: '',
        isShowDel: false
      });
    },
    inputTyping(e) {
      var _this = this;
      _this.setData({
        inputVal: e.detail.value,
        isShowDel: !!e.detail.value
      });
    },
  }
})