// pages/experienceDetail/experienceDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperimage: [
      {
        type: '1',
        thumb: '../../images/bg_scroll_1.png'
      },
      {
        type: '2',
        thumb: '../../images/bg_scroll_1.png'
      },
      {
        type: '3',
        thumb: '../../images/bg_scroll_1.png'
      }
    ],
    newSign:[
      {
        profile:'../../images/bg_profile_1.png',
        name:'有点痴心',
        isLike:false,
        likeMum:280,
        lasttime:'2小时前',
        desc:'从事美妆行业18年，对于这种民宿最有感情了'
      },
      {
        profile:'../../images/bg_profile_2.png',
        name:'窗口快递',
        isLike:false,
        likeMum:480,
        lasttime:'6小时前',
        desc:'喜欢这种设计感十足的民宿'
      },
      {
        profile:'../../images/bg_profile_3.png',
        name:'Silly',
        isLike:false,
        likeMum:220,
        lasttime:'12小时前',
        desc:'非常棒的名宿'
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: '体验活动' });
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