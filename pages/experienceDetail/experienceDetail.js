// pages/experienceDetail/experienceDetail.js
import util from '../../utils/util.js';
import Api from '../../utils/api.js';
import {formatDate} from '../../utils/date.js';
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    swiperimage: [],
    newSign:[],
    detail:{},
    homestay: {},
    apply: [],
    win: [],
    btnText:'',
    btnStyle:'',
    isShowBox: false,
    userinfo:wx.getStorageSync('userInfo')
  },
  closeBox() {
    this.setData({
      isShowBox: false
    })
    setTimeout(v=>{
      this.getExperienceActivity()
    },300)
  },

  jumpToSuji() {
    wx.switchTab({
      url: '../suji/suji'
    })
  },
  goToMap: function (e) {
    const dataset = e.currentTarget.dataset
    wx.openLocation({
      latitude: dataset.lat,
      longitude: dataset.long
    })
  },
  getExperienceActivity() {
    var _this = this
    wx.showLoading({
      title: '加载中',
    })
    util._get(Api.getExperienceActivity(), this.data.filters, res => {
      wx.hideLoading()
      wx.stopPullDownRefresh()
      let ex = res.data.data
      console.log(ex)
      ex.detail.content = ex.detail.content.replace(/<img /g, '<img style="max-width:100%;"');
      ex.detail.e_starttime = formatDate(ex.detail.e_starttime*1000, 'Y-m-d H:i:s') 
      ex.detail.e_endtime = formatDate(ex.detail.e_endtime*1000, 'Y-m-d H:i:s') 
      ex.detail.a_starttime = formatDate(ex.detail.a_starttime*1000, 'Y-m-d H:i:s') 
      ex.detail.a_endtime = formatDate(ex.detail.a_endtime*1000, 'Y-m-d H:i:s') 
      _this.data.swiperimage.push({image: ex.detail.image})
      const {detail, homestay, apply, win} = ex
      if (detail.time_status==1) {
        if (detail.is_apply==0) {
          _this.data.btnText='立即报名'
          _this.data.btnStyle = 'btn_color_red'
        } else {
          _this.data.btnText='已报名'
          _this.data.btnStyle = 'btn_color_light_red'
        }
      } else if(detail.time_status==2) {
          _this.data.btnText='报名结束'
          _this.data.btnStyle = 'btn_color_end'
          if(win.length>0) {
            _this.showPaneCard()
          }
      } else if(detail.time_status==3) {
        _this.data.btnText='活动已结束'
        _this.data.btnStyle = 'btn_color_end'
        if(win.length>0) {
          _this.showPaneCard()
        }
      } else if(detail.time_status==0) {
        _this.data.btnText='活动未开始'
        _this.data.btnStyle = 'btn_color_end'
      }
      _this.setData({
        btnText:_this.data.btnText,
        btnStyle:_this.data.btnStyle,
        swiperimage: _this.data.swiperimage,
        detail: detail,
        homestay: homestay,
        apply: apply,
        win: win
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
  jumpToJoin(e) {
    let _this = this
    if(_this.data.detail.time_status === 1) {
      if(_this.data.detail.is_apply==0) {
        if(wx.getStorageSync('userInfo').is_experiencer===1) {
          wx.navigateTo({
            url: `../applyRoom/applyRoom?id=${e.currentTarget.dataset.id}`,
            success: function(res){
              // success
            },
          })
        } else {
          wx.navigateTo({
            url: '../apply/apply'
          })
        }
      } else {
        wx.showToast({
          title: '您已报名',
          icon: 'none',
          duration: 1500
        })
      }
    } else if(_this.data.detail.time_status==2){
      if(_this.data.detail.is_apply==0) {
        wx.showToast({
          title: '报名已结束',
          icon: 'none',
          duration: 1500
        })
      } else {
        wx.showToast({
          title: '您已报名',
          icon: 'none',
          duration: 1500
        })
      }
    } else if(_this.data.detail.time_status==3) {
      wx.showToast({
        title: '活动已结束',
        icon: 'none',
        duration: 1500
      })
    } else if(_this.data.detail.time_status==0) {
      wx.showToast({
        title: '活动未开始',
        icon: 'none',
        duration: 1500
      })
    }
  },
  jumpToHome() {
    wx.switchTab({
      url: '../home/home'
    })
  },
  jumpToHomestay(e) {
    wx.navigateTo({
      url: `../homestaydetail/homestaydetail?id=${e.currentTarget.dataset.id}`,
      success: function(res){
        // success
      },
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      'filters.id':parseInt(options.id)
    })
    setTimeout(v=>{
      this.setData({
        isLogin: wx.getStorageSync('isLogin'),
        isShowBox: wx.getStorageSync('isLogin')==0
      })
    },300)
    if(wx.getStorageSync('isLogin')===1) {
      this.getExperienceActivity()
    }
    wx.setNavigationBarTitle({ title: '体验活动' });
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
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      return {
        title: `体验详情-${this.data.detail.name}`,
        path: `pages/experienceDetail/experienceDetail?id=${this.data.detail.id}`,
        success: function (res) {
            util._getStat()
        },
        fail:function(res){
        }
      }
    }
    else {
      return {
        title: `体验详情-${this.data.detail.name}`,
        path: `pages/experienceDetail/experienceDetail?id=${this.data.detail.id}`,
        success: function (res) {
          util._getStat()
        },
        fail:function(res){
        }
      }
    }
  }
})