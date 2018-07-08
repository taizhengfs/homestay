import {distanceDate, formatDate} from '../../utils/date.js';
import util from '../../utils/util.js';
const app = getApp();
var isRefresh = false
import Api from '../../utils/api.js';
Component({
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    // "time_status": 1 //活动状态 0未开始 1进行中 2已结束
    timeStatus: {
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
    },
    isWin: {
      type: Boolean,
      value: false
    },
    isSelf: {
      type: Boolean,
      value: false
    },
    type: {
      type: [String, Number],
      value: 1
    },
    activityId: {
      type: [String, Number],
      value: 0
    }
  },
  data:{
    isShowDel: false,
    inputVal: '',
    duration:'00:00:00',
    form_id:[],
    hasRefresh: false
  },
  ready(){
    this.endFormatTime()
    setInterval(()=>{
      this.endFormatTime()
    },1000)
  },
  methods: {
    onTap(form_id) {
      var myEventDetail = {} // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      setTimeout(v=>{
        if (this.properties.type===2) {
          let url = `../discount/discount?id=${this.properties.activityId}&form_id=${form_id}`
          wx.navigateTo({
            url: url
          })
        } else {
          let url = `../lottery/lottery?id=${this.properties.activityId}&form_id=${form_id}`
          wx.navigateTo({
            url: url
          })
        }
      },350)
      this.triggerEvent('myevent', myEventDetail, myEventOption)
    },
    
    padWithZero (number) {
      if(typeof number !== 'undefined') {
        return ('00' + number).slice(-2);
      }
    },
    endFormatTime () {
      let now = Date.now()
      let duration = {}
      let _this = this
      if (_this.properties.timeStatus === 0 ) {
        duration = distanceDate(this.properties.startTime*1000, now)
      } else if(this.properties.timeStatus === 1) {
        duration = distanceDate(this.properties.endTime*1000, now)
      }
      if(!isRefresh){
        if(_this.properties.startTime===parseInt(now/1000) || _this.properties.endTime===parseInt(now/1000)) {
          isRefresh = true
          _this.triggerEvent('timeToRefresh')
        }
      }
      let { day, hour, min, second } = duration
      let padWithZero = _this.padWithZero
      let showTime = `${day !== 0 ? day + '天' : ''}${padWithZero(hour)}:${padWithZero(min)}:${padWithZero(second)}`
      if(typeof day !=='undefined') {
        _this.setData({
          duration: showTime
        })
      }
    },
    getFormId (e) {
      this.setData({
        form_id:e.detail.formId
      })
      this.onTap(e.detail.formId)
      util.getFormId(e, app)
      util.saveFormIds(app)
    }
  }
})