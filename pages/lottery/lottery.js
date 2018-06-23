// pages/lottery/lottery.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperimage: [
      {
        type: '1',
        thumb: '//file.yinxinlife.com/images/bg_header_gift.png'
      },
      {
        type: '2',
        thumb: '//file.yinxinlife.com/images/bg_scroll_1.png'
      },
      {
        type: '3',
        thumb: '//file.yinxinlife.com/images/bg_scroll_1.png'
      }
    ],
    activity:[
      {
        icon:'//file.yinxinlife.com/images/icon_lottory_1.png',
        title:'一人发团',
      },
      {
        icon:'//file.yinxinlife.com/images/icon_lottory_2.png',
        title:'邀友助力',
      },
      {
        icon:'//file.yinxinlife.com/images/icon_lottory_3.png',
        title:'团满可抽奖',
      },
      {
        icon:'//file.yinxinlife.com/images/icon_lottory_4.png',
        title:'大奖揭晓',
      },
    ],
    friends:[
      { profile:'//file.yinxinlife.com/images/bg_profile.png', name:'咪呀' },
      { profile:'//file.yinxinlife.com/images/bg_profile_1.png', name:'咪ya呀' },
      { profile:'//file.yinxinlife.com/images/bg_profile_2.png', name:'小王' },
      { profile:'//file.yinxinlife.com/images/bg_profile_3.png', name:'妞妞' },
      { profile:'//file.yinxinlife.com/images/bg_profile.png', name:'小灰' },
      { profile:'//file.yinxinlife.com/images/bg_profile_3.png', name:'咪呀' },
      { profile:'//file.yinxinlife.com/images/bg_profile_2.png', name:'牛牛' },
      { profile:'//file.yinxinlife.com/images/bg_profile_1.png', name:'豆豆' },
      { profile:'//file.yinxinlife.com/images/bg_profile.png', name:'皮皮虾' },
      { profile:'//file.yinxinlife.com/images/bg_profile_2.png', name:'咪呀' },
    ]
  },

  jumpToRuleDetail() {
    var _this = this
    wx.navigateTo({
      url: '../rulesDetail/rulesDetail'
    })
  },
  jumpToPrizeDetail() {
    wx.navigateTo({
      url: '../experienceDetail/experienceDetail'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: '拼团抽奖' });
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