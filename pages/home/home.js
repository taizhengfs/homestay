// pages/home.js
import util from '../../utils/util.js';
import Api from '../../utils/api.js';
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isShowDel: false,
    inputVal: '',
    currentTab: 0,
    isShowBox: false,
    swiper: [],
    today: [],
    tomorrow: []
  },
  closeBox() {
    this.setData({
      isShowBox: false
    })
  },
  clearKeyword(){
    this.setData({
      innerText:''
    })
  },
  goSearch(e){
    let key = e.detail.inputVal
    if(key ==app.globalData.keyword) {
      app.globalData.isEditFilter = false
    } else {
      app.globalData.isEditFilter = true
    }
    app.globalData.keyword=key;
    wx.switchTab({
      url: '../suji/suji',
      success: function(res){
        console.log(res)
        // success
      },
    })
  },
  goRefresh() {
    var _this = this
    _this.setData({
      today: [],
      tomorrow: []
    })
    util._get(Api.getHomeHome(), {}, res => {
      const {swiper, today, tomorrow} = res.data.data
      _this.setData({
        today: today,
        tomorrow: tomorrow,
        swiper: swiper
      })
    }, error => {
    })
  },
  getHomeDetail() {
    var _this = this
    wx.showLoading({
      title: '加载中',
    })
    util._get(Api.getHomeHome(), {}, res => {
      wx.hideLoading()
      wx.stopPullDownRefresh()
      const {swiper, today, tomorrow} = res.data.data
      _this.setData({
        today: today,
        tomorrow: tomorrow,
        swiper: swiper
      })
    }, error => {
    })
  },
  // 跳转搜索
  jumpToSearch() {
    console.log('let\'s go search')
  },

  inputTyping(e) {
    var _this = this;
    _this.setData({
      inputVal: e.detail.value,
      isShowDel: !!e.detail.value
    });
  },

  changeTab(e) {
    let _this = this
    let cur = e.currentTarget.dataset.index
    _this.setData({
      currentTab: e.currentTarget.dataset.index
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getHomeDetail()
    setTimeout(v=>{
      this.setData({
        isShowBox: wx.getStorageSync('isLogin')===0
      })
    },1000)
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
    setTimeout(v=>{
      this.setData({
        isShowBox: wx.getStorageSync('isLogin')===0
      })
    },1000)
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
    var _this = this
    if (res.from === 'button') {
      return {
        title: '隐心民宿',
        path: 'pages/home/home',
        success: function (res) {
            util._getStat()
        },
        fail:function(res){
        }
      }
    }
    else {
      return {
        title: '隐心民宿',
        path: 'pages/home/home',
        success: function (res) {
          util._getStat()
        },
        fail:function(res){
        }
      }
    }
  },
})