// pages/roomDetail/roomDetail.js
import util from '../../utils/util.js';
import Api from '../../utils/api.js';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    swiperimage: [],
    decList:[],
    filters:{
      id: 0
    },
    detail: {}
  },

  getHouseDetail() {
    var _this = this
    wx.showLoading({
      title: '加载中',
    })
    util._get(Api.getHouseDetail(), this.data.filters, res => {
      wx.hideLoading()
      wx.stopPullDownRefresh()
      let ex = res.data.data
      ex.detail.atlas.forEach(e => {
      _this.data.swiperimage.push({ image:e })
      });
      const {detail} = ex
      _this.data.decList.push(
        {support:'上网:', detail: detail.network},
        {support:'卫浴:', detail: detail.toilet},
        {support:'窗户:', detail: detail.window},
        {support:'床型:', detail: detail.bed},
        {support:'早餐:', detail: detail.breakfast},
        {support:'可住:', detail: detail.people_no},
        {support:'面积:', detail: detail.space},
        {support:'楼层:', detail: detail.floor},
        {support:'其他:', detail: detail.other}
      )
      console.log(_this.data.decList)
      _this.setData({
        detail: detail,
        decList: _this.data.decList,
        swiperimage: _this.data.swiperimage
      })
    }, error => {
      wx.hideLoading()
      wx.stopPullDownRefresh()
    })
  },

  makePhoneCall(e) {
    util.callPhone(e)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: '可选房型' });
    this.setData({
      'filters.id':options.id
    })
    this.getHouseDetail()
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
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      return {
        title: `房型详情-${this.data.detail.name}`,
        path: `pages/roomDetail/roomDetail?id=${this.data.detail.id}`,
        success: function (res) {
            util._getStat()
        },
        fail:function(res){
        }
      }
    }
    else {
      return {
        title: `房型详情-${this.data.detail.name}`,
        path: `pages/roomDetail/roomDetail?id=${this.data.detail.id}`,
        success: function (res) {
          util._getStat()
        },
        fail:function(res){
        }
      }
    }
  }
})