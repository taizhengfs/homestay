
import util from '../../utils/util.js';
import Api from '../../utils/api.js';
Component({
  properties: {  
    isShowBox: {
      type: Boolean,
      value: false
    },
    isShowCancel: {
      type: Boolean,
      value: true
    }
  },
  data: {
  },
  ready() {
  },
  methods: {
    onTap() {
      var myEventDetail = {} // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      this.triggerEvent('myevent', myEventDetail, myEventOption)
    },
    tapToCancel() {
      var myEventDetail = {} // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      this.triggerEvent('closeAuth', myEventDetail, myEventOption)
    },
    getUserInfo(e) {
      console.log(e)
      util.setMember(e.detail)
      this.tapToCancel()
    }
  }
})