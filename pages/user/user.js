// pages/user/user.js
import util from '../../utils/util.js';
import Api from '../../utils/api.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ticketList:[
      {
        id:1,
        ticket_name:'和风民宿房券'
      },
      {
        id:2,
        ticket_name:'和风民宿房券'
      },
      {
        id:3,
        ticket_name:'和风民宿房券'
      },
      {
        id:4,
        ticket_name:'和风民宿房券'
      },
      {
        id:5,
        ticket_name:'和风民宿房券'
      }
    ],
    userDetail: {},
    user_info: {},
    operations: [],
    welfare: [],
    detail:{},
    experiencer_title:''
  },
  jumpToPage(e) {
    const dataset = e.currentTarget.dataset
    let url = dataset.url
    if (typeof dataset.level !== 'undefined') {
      if (dataset.level===0) {
        wx.navigateTo({
          url: '../apply/apply'
        })
      } else {
        wx.navigateTo({
          url: url
        })
      }
    } else {
      wx.navigateTo({
        url: url
      })
    }
  },
  jumpToUpgrade(){
    wx.navigateTo({
      url: '../upgrade/upgrade',
      success: function(res){
        // success
      }
    })
  },
  getUserHome() {
    var _this = this
    wx.showLoading({
      title: '加载中',
    })
    util._get(Api.getUserHome(), {}, res => {
      wx.hideLoading()
      wx.stopPullDownRefresh()
      let ex = res.data.data
      const {user_info, operations, welfare} = ex
      wx.setStorageSync('upgrade', operations)
      _this.setData({
        detail: ex,
        user_info: user_info,
        operations: operations,
        welfare: welfare,
        experiencer_title:`(${user_info.experiencer_level_name}体验师)`
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
    this.setData({
      userDetail: wx.getStorageSync('userInfo')
    })
    this.getUserHome()
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