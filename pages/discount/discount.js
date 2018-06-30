// pages/discount/discount.js
import util from '../../utils/util.js';
import Api from '../../utils/api.js';
import {formatDate} from '../../utils/date.js';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    swiperimage: [],
    friends: [
      { profile: '//file.yinxinlife.com/images/bg_profile.png', name: '咪呀', number:'3.5' },
      { profile: '//file.yinxinlife.com/images/bg_profile_1.png', name: '咪ya呀', number: '13.1' },
      { profile: '//file.yinxinlife.com/images/bg_profile_2.png', name: '小王', number: '3.85' },
      { profile: '//file.yinxinlife.com/images/bg_profile_3.png', name: '妞妞', number: '1.75' },
      { profile: '//file.yinxinlife.com/images/bg_profile_2.png', name: '牛牛', number: '0.5' },
      { profile: '//file.yinxinlife.com/images/bg_profile_1.png', name: '豆豆', number: '1.5' },
      { profile: '//file.yinxinlife.com/images/bg_profile.png', name: '皮皮虾', number: '3.5' },
      { profile: '//file.yinxinlife.com/images/bg_profile_2.png', name: '咪呀', number: '2.5' },
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

  jumpToHome() {
    wx.switchTab({
      url: '../home/home'
    })
  },
  jumpToPrizeDetail(e) {
    let dataset = e.currentTarget.dataset
    wx.navigateTo({
      url: `../ticketDetail/ticketDetail?id=${dataset.id}`
    })
  },

  getActivityChop() {
    var _this = this
    wx.showLoading({
      title: '加载中',
    })
    util._get(Api.getActivityChop(), this.data.filters, res => {
      wx.hideLoading()
      wx.stopPullDownRefresh()
      let ex = res.data.data
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

  jumpToRuleDetail(e) {
    wx.navigateTo({
      url: `../rulesDetail/rulesDetail?type=discount&id=${e.currentTarget.dataset.id}`,
      success: function(res){
        // success
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('options: ', options);
    this.setData({
      'filters.id': parseInt(options.id)
    })
    this.getActivityChop()
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