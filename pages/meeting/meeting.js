// pages/meeting/meeting.js
// getUserRequireList
import util from '../../utils/util.js';
import Api from '../../utils/api.js';
import {formatDate} from '../../utils/date.js';
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
    ],
    list:[],
    filters: {
      page: 1,
      pageSize: 10
    }
  },
  jumpToDetail() {
    wx.navigateTo({
      url: '../meetingDetail/meetingDetail'
    })
  },
  getUserRequireList() {
    var _this = this
    wx.showLoading({
      title: '加载中',
    })
    util._get(Api.getUserRequireList(), _this.data.filters, res => {
      wx.hideLoading()
      wx.stopPullDownRefresh()
      let ex = res.data.data
      console.log(ex)
      ex.list.forEach(val=>{
        val.create_at = formatDate(val.create_at*1000, 'yyyy-MM-dd HH:mm') 
      })
      const {list} = ex
      this.setData({
        list: list
      })
    }, error => {
      if(error){
        wx.hideLoading()
        wx.stopPullDownRefresh()
      }})
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserRequireList()
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