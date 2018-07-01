// pages/userEdit/userEdit.js
// postUserEdit
import util from '../../utils/util.js';
import Api from '../../utils/api.js';
import {formatDate} from '../../utils/date.js';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    sexs:['男','女'],
    sex:0,
    region: ['浙江省', '衢州市', '衢江区'],
    customItem: '全部',
    birthday: '1993-02-14',
    filters: {
      truename:'',
      gender: 1,
      phone: '',
      birth_at:'',
      province:'',
      city:'',
      region:''
    },
    userInfo: {},
    isFirstLoad:true
  },
  getName(e) {
    this.setData({
      'filters.truename': e.detail.value
    })
  },
  getPhoneNum(e) {
    this.setData({
      'filters.phone': e.detail.value
    })
  },
  bindSexChange(e) {
    console.log(e.detail.value)
    this.setData({
      sex: e.detail.value,
      'filters.gender': parseInt(e.detail.value)+1
    })
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    let region = e.detail.value
    this.setData({
      region: region,
      'filters.province': region[0],
      'filters.city': region[1],
      'filters.region': region[2]
    })
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', )
    const date = e.detail.value.split('-')
    const newDate = new Date(date[0],parseInt(date[1])-1,date[2]);
    this.setData({
      birthday: e.detail.value,
      'filters.birth_at': newDate.getTime()/1000
    })
  },
  getUserInfoDetail() {
    var _this = this
    wx.showLoading({
      title: '加载中',
    })
    util._get(Api.getUserInfoDetail(), {}, res => {
      wx.hideLoading()
      wx.stopPullDownRefresh()
      let ex = res.data.data
      const {truename, birth_at, city, province, phone, gender, region} = ex
      _this.setData({
        sex: parseInt(gender)-1,
        'filters.gender': gender,
        'filters.truename': truename,
        'filters.birth_at': birth_at,
        'filters.phone': phone,
        'filters.city': city,
        'filters.region': region,
        'filters.province': province
      })
      if(!!birth_at) {
        _this.setData ({
          birthday: formatDate(birth_at*1000, 'Y-m-d') 
        })
      }
      if(!!province) {
        _this.setData ({
          region: [province, city, region]
        })
      }
    }, error => {
      wx.hideLoading()
      wx.stopPullDownRefresh()
    })
  },
  saveInfo(){
    console.log(this.data.filters)
    this.postUserEdit()
  },
  postUserEdit() {
    var _this = this
    wx.showLoading({
      title: '加载中',
    })
    util._post(Api.postUserEdit(), _this.data.filters, res => {
      wx.hideLoading()
      wx.stopPullDownRefresh()
      wx.showToast({
        title: '修改成功',
        icon: 'none',
        duration: 2000
      })
      setTimeout(v=>{
        wx.redirectTo({
          url: '../userInfo/userInfo',
          success: function(res){
            // success
          }
        })
      },500)
    }, error => {
      wx.hideLoading()
      wx.stopPullDownRefresh()
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(this.data.isFirstLoad) {
      this.getUserInfoDetail()
      this.setData({
        isFirstLoad: false,
        userDetail: wx.getStorageSync('userInfo')
      })
    }
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
    if(!this.data.isFirstLoad) {
      this.getUserInfoDetail()
      this.setData({
        isFirstLoad: false,
        userDetail: wx.getStorageSync('userInfo')
      })
    }
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