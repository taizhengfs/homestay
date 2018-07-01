// pages/experience/experience.js
import util from '../../utils/util.js';
import Api from '../../utils/api.js';
const app = getApp()
import {formatDate} from '../../utils/date.js';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    swiper: [],
    list: [],
    curentImg: 0,
    filters: {
      page: 1,
      pageSize: 10
    },
    isLoadAll: false,
    userinfo: wx.getStorageSync('userInfo'),
    form_id:'',
    isShowBox:false
  },

  getFormId (e) {
    util.getFormId(e, app)
    util.saveFormIds(app)
  },
  getExperienceList(isFirst=true) {
    var _this = this
    wx.showLoading({
      title: '加载中',
    })
    util._get(Api.getExperienceHome(), this.data.filters, res => {
      wx.hideLoading()
      wx.stopPullDownRefresh()
      let ex = res.data.data
      ex.list.forEach(val=>{
        val.starttime = formatDate(val.starttime*1000, 'Y年m月d日 H时i分') 
        val.endtime = formatDate(val.endtime*1000, 'Y年m月d日 H时i分')
      })
      const {list, swiper} = ex
      if (list.length < _this.data.filters.pageSize) {
        _this.setData({
          isLoadAll: true
        });
      }
      if (isFirst) {
        _this.setData({
          swiper: swiper,
          list: list,
        })
      } else {
        if(_this.data.filters.page>1) {
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
      console.log()
    })
  },

  closeBox() {
    this.setData({
      isShowBox: false
    })
  },

  jumpToDetail(e) {
    let tp = e.currentTarget.dataset
    console.log(this.data.userinfo)
    if(this.data.userinfo.is_experiencer===1) {
      wx.navigateTo({
        url: `../experienceDetail/experienceDetail?id=${tp.id}`
      })
    } else {
      wx.navigateTo({
        url: '../apply/apply'
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getExperienceList()
    setTimeout(v=>{
      this.setData({
        isLogin: wx.getStorageSync('isLogin'),
        isShowBox: wx.getStorageSync('isLogin')==0
      })
    },300)
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
    var _this = this;
    if (_this.data.isLoadAll == false) {
      _this.setData({
        'filters.page': _this.data.filters.page + 1
      })
      _this.getExperienceList(false);
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      return {
        title: '隐心民宿体验列表',
        path: 'pages/experience/experience',
        success: function (res) {
            util._getStat()
        },
        fail:function(res){
        }
      }
    }
    else {
      return {
        title: '隐心民宿体验列表',
        path: 'pages/experience/experience',
        success: function (res) {
          util._getStat()
        },
        fail:function(res){
        }
      }
    }
  }
})