// pages/discount/discount.js
import util from '../../utils/util.js';
import Api from '../../utils/api.js';
import {formatDate} from '../../utils/date.js';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    swiperimage: [],
    friends: [],
    filters:{
      id: 0,
      user_id: 0,
      form_id: ''
    },
    add_filters:{
      id: 0,
      user_id: 0,
    },
    detail: [],
    ticket: {},
    members: [],
    isShowBox: false
  },

  closeBox() {
    this.setData({
      isShowBox: false
    })
    setTimeout(v=>{
      if (this.add_filters.user_id===0) {
        this.setData({
          'filters.user_id':wx.getStorageSync('userInfo').id,
        })
      }
      this.getActivityChop()
    },300)
  },
  jumpToHome() {
    wx.switchTab({
      url: '../home/home'
    })
  },
  jumpToPrizeDetail(e) {
    let dataset = e.currentTarget.dataset
    wx.navigateTo({
      url: `../ticketDetail/ticketDetail?id=${dataset.id}`
    })
  },

  getActivityChop() {
    var _this = this
    wx.showLoading({
      title: '加载中',
    })
    util._get(Api.getActivityChop(), this.data.filters, res => {
      wx.hideLoading()
      wx.stopPullDownRefresh()
      let ex = res.data.data
      _this.data.swiperimage.push({image: ex.detail.image})
      const {detail, ticket, members} = ex
      _this.setData({
        swiperimage: _this.data.swiperimage,
        detail: detail,
        ticket: ticket,
        members: members
      })
      if(_this.data.add_filters.user_id!==0){
        this.postActivityAddChop()
      }
    }, error => {
      wx.hideLoading()
      wx.stopPullDownRefresh()
    })
  },

  jumpToRuleDetail(e) {
    wx.navigateTo({
      url: `../rulesDetail/rulesDetail?type=discount&id=${e.currentTarget.dataset.id}`,
      success: function(res){
        // success
      }
    })
  },
  jumpToJoin(){
    let _this = this
    wx.redirectTo({
      url: `../discount/discount?id=${_this.data.detail.id}`,
      success: function(res){
        // success
      }
    })
  },
  postActivityAddChop() {
    let _this = this
    if(_this.data.add_filters.user_id!==0 && _this.data.add_filters.user_id!==wx.getStorageSync('userInfo').id) {
      if(_this.data.detail.is_buy===0) {
        if(_this.data.detail.is_assist==0) {
          util._post(Api.postActivityAddChop(), _this.data.add_filters, res => {
            wx.hideLoading()
            wx.stopPullDownRefresh()
            let ex = res.data
            console.log(ex)
            if(ex.code===200) {
              let point = ex.data.point
              wx.showModal({
                title: `成功帮好友砍掉${point}元`,
                content: '再次分享给好友多砍几刀吧!',
                cancelText:'取消',
                confirmText:'参与活动',
                success: function(res) {
                  if (res.confirm) {
                    wx.redirectTo({
                      url: `../discount/discount?id=${_this.data.detail.id}`,
                      success: function(res){
                        // success
                      }
                    })
                  } else if (res.cancel) {
                    console.log('用户点击取消')
                  }
                }
              })
            } else{
              wx.showToast({
                title: res.data.message,
                icon: 'none',
                duration: 2000
              })
            }
          }, error => {
            wx.hideLoading()
            wx.stopPullDownRefresh()
            _this.resetFilter()
          })
        } else {
          wx.showToast({
            title: '您已帮忙砍过',
            icon: 'none',
            duration: 2000
          })
        }
      } else {
      }
      
    } 
    // else {
      // if(_this.data.detail.is_assist==0) {
      //   util._post(Api.postActivityAddChop(), _this.data.filters, res => {
      //     wx.hideLoading()
      //     wx.stopPullDownRefresh()
      //     let ex = res.data
      //     console.log(ex)
      //     if(ex.code===200) {
      //       let point = ex.data.point
      //       wx.showModal({
      //         title: `成功砍掉${point}元`,
      //         content: '隐心帮您砍掉第一步\n分享给好友多砍几刀吧!',
      //         cancelText:'取消',
      //         confirmText:'邀请好友',
      //         success: function(res) {
      //           if (res.confirm) {
      //           } else if (res.cancel) {
      //             console.log('用户点击取消')
      //           }
      //         }
      //       })
      //     } else{
      //       wx.showToast({
      //         title: res.data.message,
      //         icon: 'none',
      //         duration: 2000
      //       })
      //     }
      //   }, error => {
      //     wx.hideLoading()
      //     wx.stopPullDownRefresh()
      //     _this.resetFilter()
      //   })
      // }
    // }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('options: ', options);
    this.setData({
      'filters.id': parseInt(options.id),
      'add_filters.id': parseInt(options.id),
      'filters.form_id': options.form_id,
    })
    setTimeout(v=>{
      this.setData({
        isLogin: wx.getStorageSync('isLogin'),
        isShowBox: wx.getStorageSync('isLogin')==0
      })
    },300)
    var uid = 0
    if(typeof options.user_id !== 'undefined') {
      uid = parseInt(options.user_id)
      if(options.user_id!==wx.getStorageSync('userInfo').id) {
        this.setData({
          'add_filters.user_id':uid,
        })
      }
    } else {
      uid = wx.getStorageSync('userInfo').id
    }
    this.setData({
      'filters.user_id':uid,
    })
    if(wx.getStorageSync('isLogin')===1) {
      this.getActivityChop()
    }
  },
  postUserChopBuy(){
    let _this = this
    util._post(Api.postUserChopBuy(), {
      activity_id: _this.data.filters.id
    }, function (res) {
      if (res.data.code == 200) {
        let data = res.data.data
        wx.requestPayment(
          {
            'timeStamp': data.timeStamp,
            'nonceStr': data.nonceStr,
            'package': data.package,
            'signType': data.signType,
            'paySign': data.paySign,
            'success': function (res) {
              wx.showToast({
                title: '购买成功',
                icon: 'none',
                duration: 2000
              })
              wx.redirectTo('../myCard/myCard')
            },
            'fail': function (res) {
              util._post(Api.postOrderCancel(), {
                order_id: data.order_id
              }, function (res) {
                wx.showToast({
                  title: '支付已取消',
                  icon: 'none',
                  duration: 2000
                })
              })
            },
            'complete': function (res) {
            }
          })
      } else {
        wx.showModal({
          title: '提示',
          content: res.data.message,
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
              _this.setData({
                disabled: false
              })
            } else if (res.cancel) {
              _this.setData({
                isDisable: false
              })
              console.log('用户点击取消')
            }
          }
        })
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
  onShareAppMessage: function (res) {
    let uid = this.data.add_filters.user_id===0?this.data.filters.user_id:this.data.add_filters.user_id
    if (res.from === 'button') {
      return {
        title: `优惠疯抢-${this.data.detail.name}`,
        path: `pages/discount/discount?id=${this.data.detail.id}&user_id=${uid}`,
        success: function (res) {
            util._getStat()
        },
        fail:function(res){
        }
      }
    }
    else {
      return {
        title: `优惠疯抢-${this.data.detail.name}`,
        path: `pages/discount/discount?id=${this.data.detail.id}&user_id=${uid}`,
        success: function (res) {
          util._getStat()
        },
        fail:function(res){
        }
      }
    }
  }
})