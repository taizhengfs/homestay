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
    ticketList: [
      {
        ticketType: 1,
        title:'和风民宿旅馆家庭套房一晚房券',
        desc: '属于隐心人的最佳好礼，感受生活，享受带来的一切。回 归最本质的居住体验……',
        startTime:'2018.5.24 12:00',
        endTime:'2018.6.24 12:00',
        ticketCate:'暂不可用',
        price: 588
      },
      {
        ticketType: 2,
        title:'和风民宿旅馆家庭套房一晚房券',
        desc: '属于隐心人的最佳好礼，感受生活，享受带来的一切。回 归最本质的居住体验……',
        startTime:'2018.5.24 12:00',
        endTime:'2018.6.24 12:00',
        ticketCate:'立即使用',
        price: 500
      },
      {
        ticketType: 3,
        title:'和风民宿旅馆家庭套房一晚房券',
        desc: '属于隐心人的最佳好礼，感受生活，享受带来的一切。回 归最本质的居住体验……',
        startTime:'2018.5.24 12:00',
        endTime:'2018.6.24 12:00',
        ticketCate:'已使用',
        price: 422
      },
      {
        ticketType: 4,
        title:'和风民宿旅馆家庭套房一晚房券',
        desc: '属于隐心人的最佳好礼，感受生活，享受带来的一切。回 归最本质的居住体验……',
        startTime:'2018.5.24 12:00',
        endTime:'2018.6.24 12:00',
        ticketCate: '已过期',
        price: 380
      },
    ],
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