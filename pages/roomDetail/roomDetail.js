// pages/roomDetail/roomDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperimage: [
      {
        type: '1',
        thumb: '../../images/bg_scroll_1.png',
        title: '禾凤鸣书，西湖边四合院'
      },
      {
        type: '2',
        thumb: '../../images/bg_scroll_1.png',
        title: '禾凤鸣书，冬湖边四合院'
      },
      {
        type: '3',
        thumb: '../../images/bg_scroll_1.png',
        title: '禾凤鸣书，南湖边四合院'
      }
    ],
    decList:[
      { support:'上网:', detail:'wifi高速连接'},
      { support:'卫浴:', detail:'独立卫浴'},
      { support:'窗户:', detail:'有'},
      { support:'床型:', detail:'有大床1.8米*2.0米 1张'},
      { support:'早餐:', detail:'无早餐'},
      { support:'可住:', detail:'2人'},
      { support:'面积:', detail:'18平米'},
      { support:'楼层:', detail:'3-6楼'},
      { support:'其他:', detail:'有阳台'},
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: '可选房型' });
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