// pages/userInfo/userInfo.js
import util from '../../utils/util.js';
import Api from '../../utils/api.js';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userDetail: {},
    userInfo: {}
  },
  jumpToPage(e) {
    let url = e.currentTarget.dataset.url
    wx.redirectTo({
      url: url
    })
  },

  getUserInfoDetail() {
    var _this = this
    wx.showLoading({
      title: '加载中',
    })
    util._get(Api.getUserInfoDetail(), {}, res => {
      wx.hideLoading()
      wx.stopPullDownRefresh()
      let ex = res.data.data
      console.log(ex)
      _this.setData({
        userInfo: ex
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
    this.getUserInfoDetail()
    this.setData({
      userDetail: wx.getStorageSync('userInfo')
    })
    wx.setNavigationBarTitle({ title: '个人信息' });
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