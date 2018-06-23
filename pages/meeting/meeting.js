// pages/meeting/meeting.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    meetings:[
      {
        type: 1,
        title:'上海五道口信息科技有限公司',
        time:'将于2018-5-28   18:18开展团建',
        createtime:'2018-5-20  提交'
      },
      {
        type: 2,
        title:'上海五道口信息科技有限公司',
        time:'将于2018-5-28   18:18开展团建',
        createtime:'2018-5-20  提交'
      },
      {
        type: 3,
        title:'上海六道口信息科技有限公司',
        time:'将于2018-5-28   18:18开展团建',
        createtime:'2018-5-20  提交'
      },
      {
        type: 4,
        title:'上海七道口信息科技有限公司',
        time:'将于2018-5-28   18:18开展团建',
        createtime:'2018-5-20  提交'
      },
      {
        type: 5,
        title:'上海五道口信息科技有限公司',
        time:'将于2018-5-28   18:18开展团建',
        createtime:'2018-5-20  提交'
      }
    ]
  },
  jumpToDetail() {
    wx.navigateTo({
      url: '../meetingDetail/meetingDetail'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: '团建会议' });
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