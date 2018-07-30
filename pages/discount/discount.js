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
    isShowBox: false,
    isShowAll: false,
    selfId: '',
    inUserId: 0,
    calcPrice:0
  },
  showAll() {
    let _this = this
    _this.setData({
      isShowAll: !_this.data.isShowAll
    })
  },

  closeBox() {
    let _this = this
    _this.setData({
      isShowBox: false
    })
    setTimeout(v=>{
      _this.setData({
        'add_filters.user_id':_this.data.inUserId,
      })
      if (_this.data.add_filters.user_id===0) {
        _this.setData({
          'filters.user_id':wx.getStorageSync('userInfo').id,
          selfId:wx.getStorageSync('userInfo').id
        })
      } else {
        if(_this.data.add_filters.user_id!==wx.getStorageSync('userInfo').id) {
          this.setData({
            'filters.user_id':_this.data.add_filters.user_id,
            selfId:wx.getStorageSync('userInfo').id
          })
        }
      }
      _this.getActivityChop()
    },500)
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
    console.log('_this.data.filters: ', _this.data.filters);
    util._get(Api.getActivityChop(), _this.data.filters, res => {
      wx.hideLoading()
      wx.stopPullDownRefresh()
      let ex = res.data.data
      console.log('ex: ', ex);
      _this.data.swiperimage.push({image: ex.detail.image})
      let lessList = ex.members.slice(0, 10)
      const {detail, ticket, members, express} = ex
      _this.setData({
        swiperimage: _this.data.swiperimage,
        detail: detail,
        ticket: ticket,
        express: express,
        members: members,
        lessList: lessList,
        isShowAll: false,
        calcPrice: (parseFloat(ex.ticket.price) - parseFloat(ex.detail.chop_price)).toFixed(2)
      })
      if(_this.data.add_filters.user_id!==0 && _this.data.add_filters.user_id!==wx.getStorageSync('userInfo').id){
        _this.postActivityAddChop()
      } else {
        if(_this.data.detail.is_express===0) {
          if (_this.data.ticket.is_entity===1 && _this.data.detail.is_buy===1 && _this.data.express.consignee===0) {
            wx.showModal({
              title: '请填写收货信息',
              content: `该奖品为实体物品，请填写收货信息，以便我们为您送达`,
              showCancel: false,
              confirmText:'填写信息',
              success: function(res) {
                if (res.confirm) {
                  wx.navigateTo({
                    url: `../addressEdit/addressEdit?id=${_this.data.detail.id}&from=discount&address=${JSON.stringify(_this.data.express)}`,
                    success: function(res){
                      // success
                    }
                  })
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
          } else if(_this.data.ticket.is_entity===1 && _this.data.detail.is_buy===1 && _this.data.express.consignee===1) {
            let addInfo = `姓名：${_this.data.express.consignee_name}\n联系方式：${_this.data.express.consignee_phone}\n收货地址：${_this.data.express.consignee_address}`
            wx.showModal({
              title: '确认收货信息',
              content: `您的收货信息未为：\n${addInfo}`,
              cancelText: '去修改',
              confirmText:'已确认',
              success: function(res) {
                if (res.confirm) {
                  util._post(Api.postAddExpress(),
                  {
                    activity_id:_this.data.filters.id
                  }, res => {
                    console.log('res: ', res)
                    wx.navigateTo({
                      url: `../myGift/myGift`,
                      success: function(res){
                        // success
                      }
                    })
                  },error=>{
                    console.log(error)
                  })
                } else if (res.cancel) {
                  wx.navigateTo({
                    url: `../addressEdit/addressEdit?id=${_this.data.detail.id}&from=discount&address=${JSON.stringify(_this.data.express)}`,
                    success: function(res){
                      // success
                    }
                  })
                }
              }
            })
          }
        }
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
              let self = {
                avatar:wx.getStorageSync('userInfo').avatar,
                nickname:wx.getStorageSync('userInfo').nickname,
                chop_price:point
              }
              _this.data.members.push(self)
              _this.data.lessList.push(self)
              _this.data.lessList = _this.data.lessList.slice(0, 10)
              let num = parseFloat(_this.data.detail.chop_price)+parseFloat(point)
              _this.setData({
                members:_this.data.members,
                lessList:_this.data.lessList,
                'detail.chop_price': num.toFixed(2),
                calcPrice: (parseFloat(_this.data.ticket.price) - num).toFixed(2)
              })
              wx.showModal({
                title: `成功帮好友砍掉${point}元`,
                content: '再次分享给好友多砍几刀吧!',
                cancelText:'取消',
                confirmText:'参与活动',
                success: function(res) {
                  if (res.confirm) {
                    wx.redirectTo({
                      url: `../discount/discount?id=${_this.data.detail.id}&user_id=${wx.getStorageSync('userInfo').id}`,
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
              if(ex.code===400) {
                let status = _this.data.detail.is_buy
                wx.showModal({
                  title: status === 0 ? '已经砍到底了' : '您来晚了',
                  content: status === 0 ? '您的好友已经砍到底了，不能再砍了' : '您的好友已经完成了砍价',
                  showCancel: false,
                  confirmText:'参与活动',
                  success: function(res) {
                    if (res.confirm) {
                      wx.redirectTo({
                        url: `../discount/discount?id=${_this.data.detail.id}&user_id=${wx.getStorageSync('userInfo').id}`,
                        success: function(res){
                          // success
                        }
                      })
                    } else if (res.cancel) {
                      console.log('用户点击取消')
                    }
                  }
                })
              } else {
                wx.showToast({
                  title: res.data.message,
                  icon: 'none',
                  duration: 2000
                })
              }
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
    let _this = this
    _this.setData({
      'filters.id': parseInt(options.id),
      'add_filters.id': parseInt(options.id),
      'filters.form_id': options.form_id,
    })
    setTimeout(v=>{
      _this.setData({
        isLogin: wx.getStorageSync('isLogin'),
        isShowBox: wx.getStorageSync('isLogin')==0,
      })
    },300)
    if(typeof wx.getStorageSync('userInfo').id !== 'undefined') {
      _this.setData({
        selfId:wx.getStorageSync('userInfo').id
      })
    }
    var uid = 0
    if(typeof options.user_id !== 'undefined') {
      _this.setData({
        inUserId: parseInt(options.user_id)
      })
      uid = parseInt(options.user_id)
      if (typeof wx.getStorageSync('userInfo').id !== 'undefined') {
        if(options.user_id!==wx.getStorageSync('userInfo').id) {
          _this.setData({
            'add_filters.user_id':uid,
            'filters.user_id': uid
          })
        }
      } else {
        _this.setData({
          isShowBox: wx.getStorageSync('isLogin')==0,
        })
      }
    } else {
      console.log(1111)
      uid = wx.getStorageSync('userInfo').id
      _this.setData({
        'filters.user_id':uid,
      })
    }
    if(wx.getStorageSync('isLogin')===1) {
      _this.getActivityChop()
    }
  },
  jumpToCard(){
    let _this = this
    if(_this.data.ticket.is_entity===1){
      wx.navigateTo({
        url:'../myGift/myGift'
      })
    } else {
      wx.navigateTo({
        url:'../myCard/myCard'
      })
    }
  },
  payRequest() {
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
              _this.setData({
                'detail.is_buy':1
              })
              if(_this.data.ticket.is_entity===1) {
                console.log('_this.data.express: ', _this.data.express);
                if(_this.data.express.consignee===0) {
                  wx.showModal({
                    title: '请填写收货信息',
                    content: `该奖品为实体物品，请填写收货信息，以便我们为您送达`,
                    showCancel: false,
                    confirmText:'填写信息',
                    success: function(res) {
                      if (res.confirm) {
                        wx.navigateTo({
                          url: `../addressEdit/addressEdit?id=${_this.data.detail.id}&from=discount&address=${JSON.stringify(_this.data.express)}`,
                          success: function(res){
                            // success
                          }
                        })
                      } else if (res.cancel) {
                        console.log('用户点击取消')
                      }
                    }
                  })
                } else {
                  let addInfo = `姓名：${_this.data.express.consignee_name}\n联系方式：${_this.data.express.consignee_phone}\n收货地址：${_this.data.express.consignee_address}`
                  wx.showModal({
                    title: '确认收货信息',
                    content: `您的收货信息未为：\n${addInfo}`,
                    cancelText: '去修改',
                    confirmText:'已确认',
                    success: function(res) {
                      if (res.confirm) {
                        util._post(Api.postAddExpress(),
                        {
                          activity_id:_this.data.filters.id
                        }, res => {
                          console.log('res: ', res)
                          wx.navigateTo({
                            url: `../myGift/myGift`,
                            success: function(res){
                              // success
                            }
                          })
                        },error=>{
                          console.log(error)
                        })
                      } else if (res.cancel) {
                        wx.navigateTo({
                          url: `../addressEdit/addressEdit?id=${_this.data.detail.id}&from=discount&address=${JSON.stringify(_this.data.express)}`,
                          success: function(res){
                            // success
                          }
                        })
                      }
                    }
                  })
                }
              }
              else {
                wx.navigateTo({
                  url:'../myCard/myCard'
                })
              }
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
    let uid = this.data.add_filters.user_id===0?wx.getStorageSync('userInfo').id:this.data.add_filters.user_id
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