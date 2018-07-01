// pages/myCard/myCard.js
// postUserTicketList
import util from '../../utils/util.js';
import Api from '../../utils/api.js';
import {formatDate} from '../../utils/date.js';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isShowCard: false,
    ticketList: [],
    filters:{
      page:1,
      pageSize:10
    },
    list: []
  },
  getUserTicketList() {
    var _this = this
    wx.showLoading({
      title: '加载中',
    })
    util._get(Api.getUserTicketList(), _this.data.filters, res => {
      wx.hideLoading()
      wx.stopPullDownRefresh()
      let ex = res.data.data
      ex.list.forEach(val=>{
        val.u_starttime = formatDate(val.u_starttime*1000, 'Y-m-d H:i:s') 
        val.u_endtime = formatDate(val.u_endtime*1000, 'Y-m-d H:i:s')
        if (val.use_status === 3) {
          if (val.can_use === 1) {
            val.ticketCate = '立即使用'
            val.ticketType = 2
          } else if (val.can_use === 0) {
            val.ticketCate = '暂不可用'
            val.ticketType = 1
          }
        } else if (val.use_status === 4) {
          val.ticketCate = '已使用'
          val.ticketType = 3
        } else if (val.use_status === 5) {
          val.ticketCate = '已过期'
          val.ticketType = 4
        }
      })
      const {list} = ex
      this.setData({
        list: list
      })
    }, error => {
      if(error){
        wx.hideLoading()
        wx.stopPullDownRefresh()
      }})
  },
  showCard(e) {
    console.log(e.detail.ticketId)
    console.log(e.detail.itemId)
    wx.navigateTo({
      url: `../ticketDetail/ticketDetail?id=${e.detail.ticketId}&item_id=${e.detail.itemId}`
    })
    // this.setData({
    //   isShowCard: !this.data.isShowCard
    // })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserTicketList()
    wx.setNavigationBarTitle({ title: '我的卡包' });
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