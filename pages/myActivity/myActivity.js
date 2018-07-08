// pages/meetingDetail/mettingInfo.js
// getUserActivityList
import util from '../../utils/util.js';
import Api from '../../utils/api.js';
import {formatDate} from '../../utils/date.js';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    activityList: [],
    list:[],
    filters:{
      page: 1,
      pageSize: 50
    },
    isSelf:true
  },
  getUserActivityList() {
    var _this = this
    wx.showLoading({
      title: '加载中',
    })
    util._get(Api.getUserActivityList(), this.data.filters, res => {
      wx.hideLoading()
      wx.stopPullDownRefresh()
      let ex = res.data.data
      const {list} = ex
      _this.setData({
        list:list
      })
      console.log('ex: ', ex);
    }, error => {
      wx.hideLoading()
      wx.stopPullDownRefresh()
    })
  },
  goRefresh() {
    var _this = this
    _this.setData({
      list: []
    })
    util._get(Api.getUserActivityList(), _this.data.filters, res => {
      wx.hideLoading()
      wx.stopPullDownRefresh()
      let ex = res.data.data
      const {list} = ex
      _this.setData({
        list:list
      })
      console.log('ex: ', ex);
    }, error => {
      wx.hideLoading()
      wx.stopPullDownRefresh()
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserActivityList()
    wx.setNavigationBarTitle({ title: '我的活动' });
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