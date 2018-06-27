// pages/applyRoom/applyRoom.js
// getExperienceApply
import util from '../../utils/util.js';
import Api from '../../utils/api.js';
import {formatDate} from '../../utils/date.js';
var latitude = ''
var longitude = ''
var pos = -1
wx.getLocation({
  type: 'wgs84',
  success: function (res) {
    latitude = res.latitude
    longitude = res.longitude
  }
})
Page({
  /**
   * 页面的初始数据
   */
  data: {
    currentLength:0,
    filters: {
      id:'',
      content:'',
      images:''
    },
    imgList:[],
    isShowCard: false,
    currentDelIdx: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      'filters.id': parseInt(options.id)
    })
    wx.setNavigationBarTitle({ title: '体验活动' });
  },

  showPaneCard(){
    let _this = this;
    _this.setData({
      isShowCard: !_this.data.isShowCard
    })
  },
  showDeleteBox(e){
    let dataset = e.currentTarget.dataset
    this.setData({
      isShowCard: !this.data.isShowCard,
      currentDelIdx: dataset.key
    })
  },
  deleteImage() {
    this.data.imgList.splice(this.data.currentDelIdx, 1)
    this.setData({
      imgList: this.data.imgList,
      'filters.images': _this.data.imgList.join(',')
    })
    this.showPaneCard()
  },
  getExperienceApply() {
    var _this = this
    wx.showLoading({
      title: '加载中',
    })
    util._post(Api.getExperienceApply(), this.data.filters, res => {
      wx.hideLoading()
      wx.stopPullDownRefresh()
      let ex = res.data
      if(ex.code===200) {
        wx.showToast({
          title: '报名成功',
          icon: 'none',
          duration: 2000
        })
        _this.resetFilter()
        wx.navigateBack({
          delta: 1, // 回退前 delta(默认为1) 页面
          success: function(res){
            // success
          },
        })
      } else {
        wx.showToast({
          title: res.data.message,
          icon: 'none',
          duration: 2000
        })
        _this.resetFilter()
      }
    }, error => {
      wx.hideLoading()
      wx.stopPullDownRefresh()
      _this.resetFilter()
    })
  },
  resetFilter() {
    let _this = this
    _this.data.filters={
      id:'',
      content:'',
      images:''
    }
    _this.setData({
      filters:_this.data.filters,
      imgList:[]
    })
  },
  tapToEdit(e){
    this.setData({
      'filters.content': e.detail.value
    })
  },
  selectPic(){
    let _this = this
    if(_this.data.imgList.length > 4) return
    wx.chooseImage({
      count: 5, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        let tempFilePaths = res.tempFilePaths[0]
        wx.uploadFile({
          url: Api.postFileUpload(), //仅为示例，非真实的接口地址
          filePath: tempFilePaths,
          name: 'file',
          header: {
            'token': wx.getStorageSync('token'),
            'cityid': wx.getStorageSync('cityid'),
            'version': Api.getVersionNum(),
            'os': Api.getOsType(),
            'position': pos,
            'lng': longitude,
            'lat': latitude
          },
          formData:{
            'tp': 'screenshot'
          },
          success: function(res){
            var data = JSON.parse(res.data)
            _this.data.imgList.push(data.data.url)
            _this.setData({
              imgList: _this.data.imgList,
              'filters.images': _this.data.imgList.join(',')
            })
            //do something
          },
          fail(err) {
            console.log(err)
          }
        })


        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
      }
    })
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