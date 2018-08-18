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
    filepath: '',
    filename:'',
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
        rindex:0,
        image:'',
        platform:[]
      }
    ]
    
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
        console.log('res: ', res);
        let tempFilePaths = res.tempFilePaths[0]
        wx.showLoading({
          title: '上传中',
        })
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
            wx.hideLoading()
            wx.stopPullDownRefresh()
            var data = JSON.parse(res.data)
            console.log('data: ', data);
            _this.setData({
              filepath:data.data.filepath,
              filename:data.data.name
            })
            console.log('_this.data.filepath: ', _this.data.filepath);
            //do something
          },
          fail(err) {
            wx.hideLoading()
            wx.stopPullDownRefresh()
            console.log(err)
          }
        })
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
      }
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
      filepath:_this.data.filepath,
      filename:_this.data.filename
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
      const { apply_info } = ex
      _this.setData({
        detail: ex,
        apply_info:apply_info,
      })
      if(Object.keys(apply_info).length>0) {
        _this.setData({
          truename:apply_info.truename,
          phone:apply_info.phone,
        })
        if(apply_info.experiencer.verify_status===1) {
          wx.showModal({
            title: `申请中`,
            content: '您的申请已提交，您仍然可以补充或修改您的信息!',
            confirmText:'确定',
            showCancel: false,
            success: function(res) {
              if (res.confirm) {

              }
            }
          })
        } else if(apply_info.experiencer.verify_status===3){
          wx.showModal({
            title: `申请失败`,
            content: `您的信息没有通过体验师申请，原因:【${apply_info.experiencer.remark}】,快补充或修改信息吧。`,
            confirmText:'确定',
            showCancel: false,
            success: function(res) {
              if (res.confirm) {

              }
            }
          })
        }
      }
      
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