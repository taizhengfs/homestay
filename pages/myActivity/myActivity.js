// pages/meetingDetail/mettingInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activityList: [
      {
        type: 0, // 0 未开始 1 进行中 2 已结束
        startTime: '10:00',
        endTime: '2018.8:18',
        price: 832,
        realPrice: 0.01,
        participateNum: 0,
        cover: '../../images/home_bg_item_1.png',
        activityDesc: '夏日来袭，隐心民宿首批福利大放送福利大放送福利大放送'
      },
      {
        type: 1, // 0 未开始 1 进行中 2 已结束
        startTime: '2018.5.27',
        endTime: '10:00',
        price: 200,
        realPrice: 0.01,
        participateNum: 100,
        cover: '../../images/home_bg_item_2.png',
        activityDesc: '这个民宿可以说是业界良心了'
      },
      {
        type: 2, // 0 未开始 1 进行中 2 已结束
        startTime: '2018.5.27',
        endTime: '2018.06.1',
        price: 832,
        realPrice: 0.01,
        participateNum: 5671,
        cover: '../../images/home_bg_item_3.png',
        activityDesc: '夏日来袭，隐心民宿首批福利大放送福利大放送福利大放送'
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: '我的活动' });
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