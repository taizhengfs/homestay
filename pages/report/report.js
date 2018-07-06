// pages/report/report.js
import util from '../../utils/util.js';
import Api from '../../utils/api.js';
Page({
  // getExperienceReport
  /**
   * 页面的初始数据
   */
  data: {
    content:'',
    title:'',
    filters:{
      id:''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(typeof options.id!=='undefined') {
      this.setData({
        'filters.id':options.id
      })
    }
    this.getExperienceReport()
  },
  getExperienceReport() {
    var _this = this
    wx.showLoading({
      title: '加载中',
    })
    util._get(Api.getExperienceReport(), this.data.filters, res => {
      wx.hideLoading()
      wx.stopPullDownRefresh()
      let ex = res.data.data
      if(Object.keys(ex).length>0){
        ex.content = ex.content.replace(/<img /g, '<img style="max-width:100%;"');
        const {title, content} =ex
        wx.setNavigationBarTitle({ title: title });
        _this.setData({
          title: title,
          content: content
        })
      }
    }, error => {
      wx.hideLoading()
      wx.stopPullDownRefresh()
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