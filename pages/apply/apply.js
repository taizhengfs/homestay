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
    reco: [],
    isShowCard:false,
    platList: [],
    detail: {},
    truename:'',
    phone:'',
    platforms: [
      {
        name:'',
        nickname:'',
        fans_count:'',
        image:''
      }
    ],
    keys:[0],
    filters:{},
    uuid:0,
    formPayload:[
      {
        pindex:'',
        nickname:'',
        fans_count:'',
        rindex:'',
        image:'',
        platform:[]
      }
    ]
    
  },
  bindRecoChange(e) {
    let _this = this
    const dataset = e.currentTarget.dataset
    const {id ,index} = dataset
    _this.data.platforms[index].name=_this.data.platList[e.detail.value].children[0].name
    _this.data.formPayload[index].pindex=0
    _this.data.formPayload[index].rindex=e.detail.value
    _this.data.formPayload[index].platform=_this.data.platList[e.detail.value].children

    _this.setData({
      platforms:_this.data.platforms,
      formPayload:_this.data.formPayload
    })
  },
  editNickname(e) {
    let _this = this
    const dataset = e.currentTarget.dataset
    const {index} = dataset
    _this.data.formPayload[index].nickname=e.detail.value
    _this.data.platforms[index].nickname=e.detail.value
    _this.setData({
      platforms:_this.data.platforms,
      formPayload:_this.data.formPayload,
    })
  },
  editFansCount(e) {
    let _this = this
    const dataset = e.currentTarget.dataset
    const {index} = dataset
    _this.data.formPayload[index].fans_count=e.detail.value
    _this.data.platforms[index].fans_count=e.detail.value
    _this.setData({
      platforms:_this.data.platforms,
      formPayload:_this.data.formPayload,
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
  selectPic(e){
    let _this = this
    const dataset = e.currentTarget.dataset
    const {index} = dataset
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
            _this.data.formPayload[index].image=data.data.url
            _this.data.platforms[index].image=data.data.filepath
            _this.setData({
              platforms:_this.data.platforms,
              formPayload:_this.data.formPayload,
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
  bindPlatformChange(e) {
    let _this = this
    const dataset = e.currentTarget.dataset
    const {id, index} = dataset
    _this.data.formPayload[index].pindex=e.detail.value
    _this.data.platforms[index].name=_this.data.formPayload[index].platform[e.detail.value].name
    this.setData({
      platforms:_this.data.platforms,
      formPayload:_this.data.formPayload,
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
    util._post(Api.postExperienceApply(), _this.data.filters, res => {
      wx.hideLoading()
      wx.stopPullDownRefresh()
      let ex = res.data
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
      filters:_this.data.filters
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
      _this.setData({
        detail: ex,
        platList: platform,
        reco: _this.data.reco,
        'formPayload[0].platform': platform[0].children
      })
      
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
  addMoreInfo() {
    let _this = this
    _this.data.formPayload.push(
      {
        pindex:'',
        nickname:'',
        fans_count:'',
        rindex:'',
        image:''
      }
    )
    _this.data.platforms.push(
      {
        name:'',
        nickname:'',
        fans_count:'',
        image:''
      }
    )
    _this.setData({
      platforms: _this.data.platforms,
      formPayload: _this.data.formPayload
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this
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
  
  }
})