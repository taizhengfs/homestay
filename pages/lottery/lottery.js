// pages/lottery/lottery.js
import util from '../../utils/util.js';
import Api from '../../utils/api.js';
import {formatDate} from '../../utils/date.js';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    swiperimage: [],
    activity:[
      {
        icon:'//file.yinxinlife.com/images/icon_lottory_1.png',
        title:'一人发团',
      },
      {
        icon:'//file.yinxinlife.com/images/icon_lottory_2.png',
        title:'邀友助力',
      },
      {
        icon:'//file.yinxinlife.com/images/icon_lottory_3.png',
        title:'团满可抽奖',
      },
      {
        icon:'//file.yinxinlife.com/images/icon_lottory_4.png',
        title:'大奖揭晓',
      },
    ],
    friends:[
      { profile:'//file.yinxinlife.com/images/bg_profile.png', name:'咪呀' },
      { profile:'//file.yinxinlife.com/images/bg_profile_1.png', name:'咪ya呀' },
      { profile:'//file.yinxinlife.com/images/bg_profile_2.png', name:'小王' },
      { profile:'//file.yinxinlife.com/images/bg_profile_3.png', name:'妞妞' },
      { profile:'//file.yinxinlife.com/images/bg_profile.png', name:'小灰' },
      { profile:'//file.yinxinlife.com/images/bg_profile_3.png', name:'咪呀' },
      { profile:'//file.yinxinlife.com/images/bg_profile_2.png', name:'牛牛' },
      { profile:'//file.yinxinlife.com/images/bg_profile_1.png', name:'豆豆' },
      { profile:'//file.yinxinlife.com/images/bg_profile.png', name:'皮皮虾' },
      { profile:'//file.yinxinlife.com/images/bg_profile_2.png', name:'咪呀' },
    ],
    filters:{
      id: 0,
      user_id: 0,
      form_id: ''
    },
    detail: [],
    ticket: {},
    members: []
  },

  getActivityGroup() {
    var _this = this
    wx.showLoading({
      title: '加载中',
    })
    util._get(Api.getActivityGroup(), this.data.filters, res => {
      wx.hideLoading()
      wx.stopPullDownRefresh()
      let ex = res.data.data
      ex.detail.starttime = formatDate(ex.detail.starttime*1000, 'Y-m-d H:i:s') 
      ex.detail.endtime = formatDate(ex.detail.endtime*1000, 'Y-m-d H:i:s') 
      _this.data.swiperimage.push({image: ex.detail.image})
      const {detail, ticket, members} = ex
      _this.setData({
        swiperimage: _this.data.swiperimage,
        detail: detail,
        ticket: ticket,
        members: members
      })
    }, error => {
      wx.hideLoading()
      wx.stopPullDownRefresh()
    })
  },
  jumpToHome() {
    wx.switchTab({
      url: '../home/home'
    })
  },

  jumpToRuleDetail() {
    wx.navigateTo({
      url: '../rulesDetail/rulesDetail'
    })
  },
  jumpToPrizeDetail(e) {
    let dataset = e.currentTarget.dataset
    wx.navigateTo({
      url: `../ticketDetail/ticketDetail?id=${dataset.id}`
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('options: ', options);
    this.setData({
      'filters.id':parseInt(options.id),
      'filters.form_id': options.form_id,
      'filters.user_id':wx.getStorageSync('userInfo').id,
    })
    wx.setNavigationBarTitle({ title: '拼团抽奖' });
    this.getActivityGroup()
  },
  jumpToRuleDetail(e) {
    wx.navigateTo({
      url: `../rulesDetail/rulesDetail?type=lottery&id=${e.currentTarget.dataset.id}`,
      success: function(res){
        // success
      }
    })
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
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})