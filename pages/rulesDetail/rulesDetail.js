// pages/rulesDetail/rulesDetail.js
import util from '../../utils/util.js';
import Api from '../../utils/api.js';
import {formatDate} from '../../utils/date.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rules:[],
    filters: {
      id:''
    },
    apiLink:'',
    type:''
  },
  getRuleDetail() {
    var _this = this
    wx.showLoading({
      title: '加载中',
    })
    util._get(_this.data.apiLink, this.data.filters, res => {
      wx.hideLoading()
      wx.stopPullDownRefresh()
      let ex = res.data.data
      if (_this.data.type==='lottery' || _this.data.type==='discount') {
        _this.data.rules=[
          {
            type:'活动时间：',
            desc:`${formatDate(ex.starttime*1000, 'Y年m月d日 H时i分')}至${formatDate(ex.endtime*1000, 'Y年m月d日 H时i分')}`
          },
          {
            type:'活动参与方式：',
            desc:ex.part_desc
          },
          {
            type:`${_this.data.type==='lottery'?'奖品与获奖公布':'支付说明'}`,
            desc:ex.prize_desc
          },
          {
            type:'其他说明：',
            desc:ex.description
          },
        ]
        if(_this.data.type==='lottery') {
          _this.data.rules.splice(1,0,
            {
              type:'开奖时间：',
              desc:formatDate(ex.lottery_at*1000, 'Y年m月d日 H时i分')
            }
          )
        }
      } else {
        _this.data.rules=[
          {
            type:'票券名称：',
            desc:ex.name
          },
          {
            type:'适用商家：',
            desc:ex.homestay_name
          },
          {
            type:'票券类型：',
            desc:ex.type_name
          },
          {
            type:'使用时间：',
            desc:`${formatDate(ex.u_starttime*1000, 'Y年m月d日 H时i分')}至${formatDate(ex.u_endtime*1000, 'Y年m月d日 H时i分')}`
          },
          {
            type:'使用规则：',
            desc:ex.use_rule
          }
        ]
      }
      _this.setData({
        rules: _this.data.rules
      })
    }, error => {
      wx.hideLoading()
      wx.stopPullDownRefresh()
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (typeof options.type !== 'undefined') {
      if (options.type==='lottery' || options.type==='discount') {
        this.setData({
          type:options.type,
          apiLink: Api.getActivityRuleDetail()
        })
      } else {
        this.setData({
          type:options.type,
          apiLink: Api.getTicketRuleDetail()
        })
      }
    }
    if (typeof options.id !== 'undefined') {
      this.setData({
        'filters.id':options.id
      })
      this.getRuleDetail()
    }
    wx.setNavigationBarTitle({ title: '规则详情' });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  }
})