// pages/homestaydetail/homestaydetail.js
import util from '../../utils/util.js';
import Api from '../../utils/api.js';
import {formatDate} from '../../utils/date.js';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tags: [],
    iconList: [
      '//file.yinxinlife.com/images/icon_tiyan.png',
      '//file.yinxinlife.com/images/icon_tuan.png',
      '//file.yinxinlife.com/images/icon_cut.png'
    ],
    activitys: [],
    roomlist:[],
    support:[],
    dishList:[],
    filters: {
      id: 0
    },
    activity: [],
    detail: {},
    house: [],
    swiperimage: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      'filters.id': parseInt(options.id)
    })
    this.getHomestayDetail()
    wx.setNavigationBarTitle({ title: '民宿详情' });
  },
  jumpToActivity(e) {
    const dataset = e.currentTarget.dataset
    const {type, id} = dataset
    if(type===0) {
      wx.navigateTo({
        url: `../experienceDetail/experienceDetail?id=${dataset.id}`
      })
    } else if(type===1) {
      wx.navigateTo({
        url: `../lottery/lottery?id=${dataset.id}`
      })
    } else {
      wx.navigateTo({
        url: `../discount/discount?id=${dataset.id}`
      })
    }
  },
  jumpToRoomDetail(e) {
    const dataset = e.currentTarget.dataset
    wx.navigateTo({
      url: `../roomDetail/roomDetail?id=${dataset.id}`
    })
  },
  goToMap: function (e) {
    const dataset = e.currentTarget.dataset
    wx.openLocation({
      latitude: dataset.lat,
      longitude: dataset.long
    })
  },
  makePhoneCall(e) {
    util.callPhone(e)
  },
  jumpToBook(e){
    let dataset = e.currentTarget.dataset
    const {id, tel} = dataset
    wx.navigateTo({
      url: `../team/team?id=${id}&tel=${tel}`,
      success: function(res){
        // success
      }
    })
  },
  showImages(e){
    const _this = this
    let cnt = e.currentTarget.dataset.url
    let list = []
    _this.data.detail.dine_atlas.forEach(v=>{
      list.push('http:'+v)
    })
    wx.previewImage({
      current: 'http:'+cnt, // 当前显示图片的http链接
      urls: list // 需要预览的图片http链接列表
    })
  },
  getHomestayDetail() {
    var _this = this
    wx.showLoading({
      title: '加载中',
    })
    util._get(Api.getHomestayDetail(), this.data.filters, res => {
      wx.hideLoading()
      wx.stopPullDownRefresh()
      let ex = res.data.data
      ex.detail.atlas.forEach(e => {
      _this.data.swiperimage.push(
        {
          image:e,
          title: ex.detail.name
        })
      });
      ex.detail.create_at = formatDate(ex.detail.create_at * 1000, 'Y-m-d') 
      const {activity, detail, house} = ex
      _this.setData({
        swiperimage: _this.data.swiperimage,
        activity: activity,
        detail: detail,
        house: house
      })
      
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
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      return {
        title: `民宿详情-${this.data.detail.name}`,
        path: `pages/homestaydetail/homestaydetail?id=${this.data.detail.id}`,
        success: function (res) {
            util._getStat()
        },
        fail:function(res){
        }
      }
    }
    else {
      return {
        title: `民宿详情-${this.data.detail.name}`,
        path: `pages/homestaydetail/homestaydetail?id=${this.data.detail.id}`,
        success: function (res) {
          util._getStat()
        },
        fail:function(res){
        }
      }
    }
  }
})