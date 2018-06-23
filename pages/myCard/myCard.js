// pages/myCard/myCard.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShowCard: false,
    ticketList: [
      {
        ticketType: 1,
        title:'和风民宿旅馆家庭套房一晚房券',
        desc: '属于隐心人的最佳好礼，感受生活，享受带来的一切。回 归最本质的居住体验……',
        startTime:'2018.5.24 12:00',
        endTime:'2018.6.24 12:00',
        ticketCate:'暂不可用',
        price: 588
      },
      {
        ticketType: 2,
        title:'和风民宿旅馆家庭套房一晚房券',
        desc: '属于隐心人的最佳好礼，感受生活，享受带来的一切。回 归最本质的居住体验……',
        startTime:'2018.5.24 12:00',
        endTime:'2018.6.24 12:00',
        ticketCate:'立即使用',
        price: 500
      },
      {
        ticketType: 3,
        title:'和风民宿旅馆家庭套房一晚房券',
        desc: '属于隐心人的最佳好礼，感受生活，享受带来的一切。回 归最本质的居住体验……',
        startTime:'2018.5.24 12:00',
        endTime:'2018.6.24 12:00',
        ticketCate:'已使用',
        price: 422
      },
      {
        ticketType: 4,
        title:'和风民宿旅馆家庭套房一晚房券',
        desc: '属于隐心人的最佳好礼，感受生活，享受带来的一切。回 归最本质的居住体验……',
        startTime:'2018.5.24 12:00',
        endTime:'2018.6.24 12:00',
        ticketCate: '已过期',
        price: 380
      },
    ]
  },
  showCard(e) {
    console.log(e)
    this.setData({
      isShowCard: !this.data.isShowCard
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: '我的卡包' });
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