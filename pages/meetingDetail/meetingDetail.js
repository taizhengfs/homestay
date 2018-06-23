// pages/meetingDetail/mettingInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mettingInfo:[
      { category: '公司', info:'上海大咖有限公司'},
      { category: '需求', info:'会议'},
      { category: '时间', info:'2018-06-18'},
      { category: '地区', info:'浙江-杭州'},
      { category: '规模', info:'200人以上'},
      { category: '联系方式', info:'15998479888'},
      { category: '名宿（选填）', info:'和风名宿'},
      { category: '备注（选填）', info:'希望场地的设施比较齐全，有KTV、大圆桌、草坪、 游戏厅、游泳池等等。'},
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: '会议详情' });
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