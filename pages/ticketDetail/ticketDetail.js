// pages/experienceDetail/experienceDetail.js
import util from '../../utils/util.js';
import Api from '../../utils/api.js';
import {formatDate} from '../../utils/date.js';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    swiperimage: [],
    newSign: [
      {
        profile: '//file.yinxinlife.com/images/bg_profile_1.png',
        name: '有点痴心',
        isLike: false,
        likeMum: 280,
        lasttime: '2小时前',
        desc: '从事美妆行业18年，对于这种民宿最有感情了'
      },
      {
        profile: '//file.yinxinlife.com/images/bg_profile_2.png',
        name: '窗口快递',
        isLike: false,
        likeMum: 480,
        lasttime: '6小时前',
        desc: '喜欢这种设计感十足的民宿'
      },
      {
        profile: '//file.yinxinlife.com/images/bg_profile_3.png',
        name: 'Silly',
        isLike: false,
        likeMum: 220,
        lasttime: '12小时前',
        desc: '非常棒的名宿'
      },
    ],
    filters:{
      id: 0
    },
    user_ticket:{},
    detail:{},
    homestay:{}
  },

  jumpToSuji() {
    wx.switchTab({
      url: '../suji/suji'
    })
  },
  getTicketDetail() {
    var _this = this
    wx.showLoading({
      title: '加载中',
    })
    util._get(Api.getTicketDetail(), this.data.filters, res => {
      wx.hideLoading()
      wx.stopPullDownRefresh()
      let ex = res.data.data
      console.log(ex)
      ex.detail.u_starttime = formatDate(ex.detail.u_starttime*1000, 'yyyy-MM-dd HH:mm:ss') 
      ex.detail.u_endtime = formatDate(ex.detail.u_endtime*1000, 'yyyy-MM-dd HH:mm:ss') 
      _this.data.swiperimage.push({image: ex.detail.image})
      const {detail, homestay, user_ticket} = ex
      _this.setData({
        swiperimage: _this.data.swiperimage,
        detail: detail,
        homestay: homestay,
        user_ticket: user_ticket
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
    this.setData({
      'filters.id': options.id
    })
    this.getTicketDetail()
    wx.setNavigationBarTitle({ title: '票券详情' });
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