// pages/addressEdit/addressEdit.js
import util from '../../utils/util.js';
import Api from '../../utils/api.js';
import {formatDate} from '../../utils/date.js';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    filters: {
      consignee_address:"",
      consignee_name:"",
      consignee_phone:""
    },
    backPage:'',
    actId:0
  },
  getName(e) {
    this.setData({
      'filters.consignee_name': e.detail.value
    })
  },
  getPhoneNum(e) {
    this.setData({
      'filters.consignee_phone': e.detail.value
    })
  },
  getAddress(e) {
    this.setData({
      'filters.consignee_address': e.detail.value
    })
  },
  saveInfo(){
    console.log(this.data.filters)
    console.log('111: ', 111)
    this.postUserEdit()
  },
  postUserEdit() {
    var _this = this
    wx.showLoading({
      title: '保存中',
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
          url: _this.data.backPage,
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
    console.log(JSON.parse(options.address))
    console.log(options.from)
    if(typeof options.id !== 'undefined') {
      this.setData({
        actId:options.id,
        backPage:`../${options.from}/${options.from}?id=${options.id}`
      })
    } else {
      this.setData({
        actId:options.id,
        backPage:`../${options.from}/${options.from}`
      })
    }
    let ex = JSON.parse(options.address)
    if (Object.keys(ex).length>0) {
      this.setData({
        'filters.consignee_name': ex.consignee_name,
        'filters.consignee_address': ex.consignee_address,
        'filters.consignee_phone': ex.consignee_phone
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
  
  }
})