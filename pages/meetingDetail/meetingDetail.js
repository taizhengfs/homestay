// pages/meetingDetail/mettingInfo.js
import util from '../../utils/util.js';
import Api from '../../utils/api.js';
import {formatDate} from '../../utils/date.js';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    mettingInfo:[],
    filters: {
      id:''
    }
  },
  getUserRequireDetail() {
    var _this = this
    wx.showLoading({
      title: '加载中',
    })
    util._get(Api.getUserRequireDetail(), _this.data.filters, res => {
      wx.hideLoading()
      wx.stopPullDownRefresh()
      let ex = res.data.data.detail
      if (Object.keys(ex).length>0) {
        _this.data.mettingInfo = [
          { category: '公司', info: ex.company_name},
          { category: '需求', info: ex.type_name},
          { category: '时间', info: ex.time},
          { category: '地区', info: ex.area},
          { category: '规模', info: ex.scale},
          { category: '联系方式', info: ex.phone},
          { category: '名宿（选填）', info: ex.homestay_name},
          { category: '备注（选填）', info: ex.remark},
        ]
        _this.data.mettingInfo.forEach((v, i)=>{
          if (v.info==='') {
            _this.data.mettingInfo.splice(i, 1)
          }
        })
      }
      _this.setData({
        detail: ex,
        mettingInfo: _this.data.mettingInfo
      })
    }, error => {
      if(error){
        wx.hideLoading()
        wx.stopPullDownRefresh()
      }})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id)
    if(typeof options.id !=='undefined') {
      this.setData({
        'filters.id':options.id
      })
    }
    this.getUserRequireDetail()
    wx.setNavigationBarTitle({ title: '会议详情' });
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