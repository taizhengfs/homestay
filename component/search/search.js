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
    searchSubmit: function(){
      var myEventDetail = {
        inputVal: this.data.inputVal
      } // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      this.triggerEvent('getKeyword', myEventDetail, myEventOption)
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
      var myEventDetail = {
        inputVal: _this.data.inputVal,
        isClear: true
      } 
      var myEventOption = {} 
      _this.triggerEvent('getKeyword', myEventDetail, myEventOption)
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