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
    newSign: [],
    filters:{
      id: 0,
      item_id: 0
    },
    user_ticket:{},
    detail:{},
    homestay:{},
    isShowCard:false,
    formateCode:'',
    isShowBar:false
  },
  jumpToRuleDetail(e) {
    wx.navigateTo({
      url: `../rulesDetail/rulesDetail?type=ticket&id=${e.currentTarget.dataset.id}`,
      success: function(res){
        // success
      }
    })
  },
  ensureBtn(){
    this.postUserOffTicket()
  },
  showPaneCard(){
    let _this = this;
    if(_this.data.user_ticket.use_status===3) {
      _this.setData({
        isShowCard: !_this.data.isShowCard
      })
    }
  },
  postUserOffTicket(){
    let _this = this
    wx.showLoading({
      title: '加载中',
    })
    util._post(Api.postUserOffTicket(), {id: _this.data.user_ticket.id}, res => {
      wx.hideLoading()
      wx.stopPullDownRefresh()
      let ex = res.data
      wx.showToast({
        title: ex.message,
        icon: 'none',
        duration: 1000
      })
      _this.setData({
        'user_ticket.use_status':4,
        isShowCard: !_this.data.isShowCard
      })
      this.showPaneCard()
    }, error => {
      wx.showToast({
        title: ex.message,
        icon: 'none',
        duration: 1000
      })
      wx.hideLoading()
      wx.stopPullDownRefresh()
    })
  },
  jumpToSuji() {
    wx.switchTab({
      url: '../suji/suji'
    })
  },
  getTicketDetail() {
    let _this = this
    wx.showLoading({
      title: '加载中',
    })
    util._get(Api.getTicketDetail(), this.data.filters, res => {
      wx.hideLoading()
      wx.stopPullDownRefresh()
      let ex = res.data.data
      ex.detail.content = ex.detail.content.replace(/<img /g, '<img style="max-width:100%;"');
      ex.detail.u_starttime = formatDate(ex.detail.u_starttime*1000, 'Y-m-d H:i:s') 
      ex.detail.u_endtime = formatDate(ex.detail.u_endtime*1000, 'Y-m-d H:i:s') 
      _this.data.swiperimage.push({image: ex.detail.image})
      const {detail, homestay, user_ticket} = ex
      if (Object.keys(user_ticket).length===0) {
        _this.setData({
          isShowBar: false
        })
      }
      _this.setData({
        swiperimage: _this.data.swiperimage,
        detail: detail,
        homestay: homestay,
        user_ticket: user_ticket
      })
      if(typeof ex.user_ticket.code !== 'undefined') {
        _this.setData({
          formateCode: ex.user_ticket.code.replace(/\s/g,'').replace(/(.{4})/g,"$1 ")
        })
      }
    }, error => {
      wx.hideLoading()
      wx.stopPullDownRefresh()
    })
  },

  goToMap: function (e) {
    const dataset = e.currentTarget.dataset
    wx.openLocation({
      latitude: dataset.lat,
      longitude: dataset.long
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      'filters.id': options.id,
      'filters.item_id': options.item_id
    })
    if(typeof options.item_id!=='undefined') {
      this.setData({
        isShowBar:true
      })
    }
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

  }
})