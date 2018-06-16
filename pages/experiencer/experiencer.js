// pages/experiencer/experiencer.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    experenceList: [
      {
        title: '灵隐景区和风民宿旅馆家庭套房试睡体验一晚',
        cover: '../../images/img_item_1.png',
        type: 1,
        start_time: '2018年5月11日'
      },
      {
        title: '杭州四季旅馆金沙餐厅家庭掏槽试吃一份',
        cover: '../../images/img_item_2.png',
        type: 2,
        start_time: '2018年5月11日'
      },
      {
        title: '春晓路地铁口康康谷loft日式简约精品公寓试睡一晚',
        cover: '../../images/img_item_3.png',
        type: 3,
        start_time: '2018年5月11日'
      },
      {
        title: '沐山而居，这家专治夏日高温的民宿等你来体验',
        cover: '../../images/img_item_4.png',
        type: 4,
        start_time: '2018年5月11日'
      },
      {
        title: '灵隐景区和风民宿旅馆家庭套房试睡体验一晚',
        cover: '../../images/img_item_1.png',
        type: 1,
        start_time: '2018年5月11日'
      },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: '隐心体验师' });
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