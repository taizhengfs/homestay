// pages/experiencer/experiencer.js
// getUserExperienceList
import util from '../../utils/util.js';
import Api from '../../utils/api.js';
import { formatDate } from '../../utils/date.js';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    experenceList: [],
    filters: {
      page: 1,
      pageSize: 10
    },
    greetings: '',
    detail: {},
    list: [],
    userinfo: wx.getStorageSync('userInfo')
  },
  greeting() {
    const now = new Date()
    const hour = now.getHours()
    let greetings
    if (hour < 6) { greetings = "凌晨好！" }
    else if (hour < 9) { greetings = "早上好！" }
    else if (hour < 12) { greetings = "上午好！" }
    else if (hour < 14) { greetings = "中午好！" }
    else if (hour < 17) { greetings = "下午好！" }
    else if (hour < 19) { greetings = "傍晚好！" }
    else if (hour < 22) { greetings = "晚上好！" }
    else { greetings = "夜里好！"}
    this.setData({
      greetings:greetings
    })
  },
  jumpToDetail(e){
    const dataset = e.currentTarget.dataset
    const {type,id} = dataset
    wx.navigateTo({
      url: `../experienceDetail/experienceDetail?id=${id}`
    })
  },
  getUserExperienceList(isFirst = true) {
    var _this = this
    wx.showLoading({
      title: '加载中',
    })
    util._get(Api.getUserExperienceList(), this.data.filters, res => {
      wx.hideLoading()
      wx.stopPullDownRefresh()
      let ex = res.data.data
      ex.list.forEach(val=>{
        val.e_starttime = formatDate(val.e_starttime*1000, 'Y-m-d H:i:s') 
        val.e_endtime = formatDate(val.e_endtime*1000, 'Y-m-d H:i:s') 
      })
      const { detail, list } = ex
      if (list.length < _this.data.filters.pageSize) {
        _this.setData({
          isLoadAll: true
        });
      }
      if (isFirst) {
        _this.setData({
          list: list,
          detail: detail
        })
      } else {
        if (_this.data.filters.page > 1) {
          _this.setData({
            list: _this.data.list.concat(list)
          })
        } else {
          _this.setData({
            list: list
          })
        }
      }
    }, error => {
      wx.hideLoading()
      wx.stopPullDownRefresh()
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserExperienceList()
    this.greeting()
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
    let _this = this;
    if (_this.data.isLoadAll == false) {
      _this.setData({
        'filters.page': _this.data.filters.page + 1
      })
      _this.getUserExperienceList(false);
    }
  }
})