import {distanceDate, formatDate} from '../../utils/date.js';
Component({
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    // "time_status": 1 //活动状态 0未开始 1进行中 2已结束
    type: {
      type: [String,Number],
      value: 0,
    },
    type_name: {
      type: String,
      value: '',
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
    inputVal: '',
    duration:'00:00:00'
  },
  ready(){
    this.endFormatTime()
    setInterval(()=>{
      this.endFormatTime()
    },1000)
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
    padWithZero (number) {
      if(typeof number !== 'undefined') {
        return number.toFixed(0).padStart(2, '0')
      }
    },
    endFormatTime () {
      let now = Date.now()
      let duration = {}
      if (this.properties.type === 0 ) {
        duration = distanceDate(this.properties.startTime*1000, now)
      } else if(this.properties.type === 1) {
        duration = distanceDate(this.properties.endTime*1000, now)
      }
      let { day, hour, min, second } = duration
      let padWithZero = this.padWithZero
      let showTime = `${day !== 0 ? day + '天' : ''}${padWithZero(hour)}:${padWithZero(min)}:${padWithZero(second)}`
      this.setData({
        duration: showTime
      })
    }
  }
})