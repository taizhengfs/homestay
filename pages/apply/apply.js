// pages/apply/apply.js
// getExperienceDetail
import util from '../../utils/util.js';
import Api from '../../utils/api.js';
var latitude = ''
var longitude = ''
var pos = -1
Page({
  /**
   * 页面的初始数据
   */
  data: {
    pindex:'',
    rindex:'',
    platform: [],
    reco: [],
    isShowCard:false,
    platList: [],
    detail: {},
    truename:'',
    phone:'',
    platforms: [
      {name:'', nickname:'', fans_count:'', image:''}
    ],
    keys:[0,1],
    imgList:[],
    filters:{}
  },
  bindRecoChange(e) {
    let recoId = e.currentTarget.dataset.id
    this.setData({
      rindex: e.detail.value,
      pindex:0,
      'platforms[0].name': this.data.platList[e.detail.value].children[0].name,
      platform: this.data.platList[e.detail.value].children
    })
  },
  editNickname(e) {
    this.setData({
      'platforms[0].nickname': e.detail.value
    })
  },
  editFansCount(e) {
    this.setData({
      'platforms[0].fans_count': e.detail.value
    })
  },
  editTruename(e) {
    this.setData({
      truename: e.detail.value
    })
  },
  editPhone(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  selectPic(){
    let _this = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        let tempFilePaths = res.tempFilePaths[0]
        wx.uploadFile({
          url: Api.postFileUpload(), 
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
              imgList:_this.data.imgList,
              'platforms[0].image': data.data.filepath
            })
            console.log(_this.data.platforms)
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
  bindPlatformChange(e) {
    let platformId = e.currentTarget.dataset.id
    console.log('platformId: ', platformId);
    this.setData({
      pindex: e.detail.value,
      'platforms[0].name': this.data.platform[e.detail.value].name
    })
  },
  postExperienceApply() {
    var _this = this
    wx.showLoading({
      title: '加载中',
    })
    _this.data.filters = {
      truename:_this.data.truename,
      phone:_this.data.phone,
      platforms:JSON.stringify(_this.data.platforms)
    }
    console.log(_this.data.filters)
    util._post(Api.postExperienceApply(), _this.data.filters, res => {
      wx.hideLoading()
      wx.stopPullDownRefresh()
      let ex = res.data
      console.log(ex)
      if(ex.code===200) {
        this.setData({
          isShowCard: true
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
  goBackPage() {
    let _this = this
    _this.resetFilter()
    _this.setData({
      isShowCard: !_this.data.isShowCard
    })
    wx.navigateBack({
      delta: 1, // 回退前 delta(默认为1) 页面
      success: function(res){
        // success
      },
    })
  },
  resetFilter() {
    let _this = this
    _this.data.filters= {name:'', nickname:'', fans_count:'', image:''}
    _this.setData({
      filters:_this.data.filters,
      imgList:[]
    })
  },
  getExperienceDetail() {
    var _this = this
    wx.showLoading({
      title: '加载中',
    })
    util._get(Api.getExperienceDetail(), {}, res => {
      wx.hideLoading()
      wx.stopPullDownRefresh()
      let ex = res.data.data
      ex.platform.forEach(val => {
        _this.data.reco.push({id: val.id, name: val.name})
      });
      const {platform} = ex
      console.log(ex)
      _this.setData({
        detail: ex,
        platList: platform,
        reco: _this.data.reco,
        platform: platform[0].children
      })
      console.log(_this.data.reco)
      
    }, error => {
      wx.hideLoading()
      wx.stopPullDownRefresh()
    })
  },
  showPaneCard(){
    let _this = this;
    _this.setData({
      isShowCard: !_this.data.isShowCard
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getExperienceDetail()
    wx.setNavigationBarTitle({ title: '申请成为体验师' });
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