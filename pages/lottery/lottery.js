// pages/lottery/lottery.js
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
    activity:[
      {
        icon:'//file.yinxinlife.com/images/icon_lottory_1.png',
        title:'一人发团',
      },
      {
        icon:'//file.yinxinlife.com/images/icon_lottory_2.png',
        title:'邀友助力',
      },
      {
        icon:'//file.yinxinlife.com/images/icon_lottory_3.png',
        title:'团满可抽奖',
      },
      {
        icon:'//file.yinxinlife.com/images/icon_lottory_4.png',
        title:'大奖揭晓',
      },
    ],
    friends:[],
    filters:{
      id: 0,
      user_id: 0,
      form_id: ''
    },
    add_filters: {
      id: 0,
      user_id: 0
    },
    detail: [],
    ticket: {},
    homestay:{},
    members: [],
    isShowCard:false,
    isShowBox: false,
    isShowAll: false,
    selfId: '',
    inUserId: 0
  },
  showAll() {
    let _this = this
    _this.setData({
      isShowAll: !_this.data.isShowAll
    })
  },

  goToMap: function (e) {
    const dataset = e.currentTarget.dataset
    wx.openLocation({
      latitude: dataset.lat,
      longitude: dataset.long
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
        })
      } else {
        if(_this.data.add_filters.user_id!==wx.getStorageSync('userInfo').id) {
          this.setData({
            'filters.user_id':_this.data.add_filters.user_id,
          })
        }
      }
      _this.getActivityGroup()
    },500)
  },
  showPaneCard(){
    let _this = this;
    _this.setData({
      isShowCard: !_this.data.isShowCard
    })
  },
  postActivityAddGroup() {
    let _this = this
    if(_this.data.add_filters.user_id!==0) {
      if(_this.data.add_filters.user_id!==wx.getStorageSync('userInfo').id) {
        if(_this.data.detail.time_status===1 && typeof wx.getStorageSync('userInfo').id !== 'undefined'){
          util._post(Api.postActivityAddGroup(), _this.data.add_filters, res => {
            wx.hideLoading()
            wx.stopPullDownRefresh()
            let ex = res.data
            console.log(ex)
            if(ex.code===200) {
              let self = {
                avatar:wx.getStorageSync('userInfo').avatar,
                nickname:wx.getStorageSync('userInfo').nickname
              }
              _this.data.members.unshift(self)
              _this.data.lessList.unshift(self)
              _this.data.lessList = _this.data.lessList.slice(0, 10)
              _this.setData({
                members:_this.data.members,
                lessList:_this.data.lessList
              })
              wx.showModal({
                title: '助力成功',
                content: '您的助力，使您的好友离大奖更近一步了！\n来参与活动跟您的好友比比手气吧!',
                cancelText:'算了',
                confirmText:'参与活动',
                success: function(res) {
                  if (res.confirm) {
                    wx.redirectTo({
                      url: `../lottery/lottery?id=${_this.data.detail.id}&user_id=${wx.getStorageSync('userInfo').id}`,
                      success: function(res){
                        // success
                      }
                    })
                  } else if (res.cancel) {
                    console.log('用户点击取消')
                  }
                }
              })
            } else if(ex.code===401){
              wx.showModal({
                title: '拼团已达成',
                content: '您的好友已经达成了拼团目标！\n来参与活动跟您的好友比比手气吧!',
                cancelText:'算了',
                confirmText:'参与活动',
                success: function(res) {
                  if (res.confirm) {
                    wx.redirectTo({
                      url: `../lottery/lottery?id=${_this.data.detail.id}&user_id=${wx.getStorageSync('userInfo').id}`,
                      success: function(res){
                        // success
                      }
                    })
                  } else if (res.cancel) {
                    console.log('用户点击取消')
                  }
                }
              })
            } else if(ex.code===420){
              wx.showModal({
                title: '注意',
                content: '7天内只能帮助其他每个用户1次。快去邀请更多好友参与活动吧',
                showCancel: false,
                confirmText:'参与活动',
                success: function(res) {
                  if (res.confirm) {
                    wx.redirectTo({
                      url: `../lottery/lottery?id=${_this.data.detail.id}&user_id=${wx.getStorageSync('userInfo').id}`,
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
        }
      }
    }
  },

  showImages(e){
    const _this = this
    let cnt = e.currentTarget.dataset.url
    let list = []
    _this.data.homestay.dine_atlas.forEach(v=>{
      list.push('http:'+v)
    })
    wx.previewImage({
      current: 'http:'+cnt, // 当前显示图片的http链接
      urls: list // 需要预览的图片http链接列表
    })
  },

  getActivityGroup() {
    var _this = this
    wx.showLoading({
      title: '加载中',
    })
    util._get(Api.getActivityGroup(), _this.data.filters, res => {
      wx.hideLoading()
      wx.stopPullDownRefresh()
      let ex = res.data.data
      ex.detail.lottery_at = formatDate(ex.detail.lottery_at*1000, 'Y-m-d H:i:s') 
      ex.detail.starttime = formatDate(ex.detail.starttime*1000, 'Y-m-d H:i:s') 
      ex.detail.endtime = formatDate(ex.detail.endtime*1000, 'Y-m-d H:i:s') 
      ex.homestay.create_at = formatDate(ex.homestay.create_at*1000, 'Y-m-d H:i:s') 
      ex.ticket.content = ex.ticket.content.replace(/<img /g, '<img style="max-width:100%;"');
      ex.ticket.u_starttime = formatDate(ex.ticket.u_starttime*1000, 'Y-m-d H:i:s') 
      ex.ticket.u_endtime = formatDate(ex.ticket.u_endtime*1000, 'Y-m-d H:i:s') 
    
      _this.data.swiperimage.push({image: ex.detail.image})
      let lessList = ex.members.slice(0, 10)
      const {detail, ticket, members,homestay, express} = ex
      _this.setData({
        swiperimage: _this.data.swiperimage,
        detail: detail,
        ticket: ticket,
        homestay: homestay,
        express: express,
        members: members,
        lessList: lessList,
        isShowAll: false
      })
      if(_this.data.add_filters.user_id===0){
        if (detail.time_status===2) { // 当前活动已结束
          if(detail.is_assist===1){ // 用户已参与
            if(detail.is_win===0) { // 判断用户是否中奖
              wx.showModal({
                title: '继续努力',
                content: '很遗憾，您没有中奖。\n其他活动持续进行中去看看吧！',
                cancelText:'知道了',
                confirmText:'去看看',
                success: function(res) {
                  if (res.confirm) {
                    wx.switchTab({
                      url: '../home/home',
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
              if(_this.data.detail.is_express===0) {
                if(_this.data.ticket.is_entity===1 && _this.data.detail.is_win===1) {
                  wx.showModal({
                    title: '恭喜中奖',
                    content: `您获得了[${_this.data.ticket.name}]\n确认收货信息后，我们将为您送达`,
                    showCancel: false,
                    confirmText:'填写收货地址',
                    success: function(res) {
                      if (res.confirm) {
                        if(_this.data.express.consignee===0) {
                          wx.showModal({
                            title: '请填写收货信息',
                            content: `该奖品为实体物品，请填写收货信息，以便我们为您送达`,
                            showCancel: false,
                            confirmText:'填写信息',
                            success: function(res) {
                              if (res.confirm) {
                                wx.navigateTo({
                                  url: `../addressEdit/addressEdit?id=${_this.data.detail.id}&from=lottery&address=${JSON.stringify(_this.data.express)}`,
                                  success: function(res){
                                    // success
                                  }
                                })
                              } else if (res.cancel) {
                                console.log('用户点击取消')
                              }
                            }
                          })
                        }else {
                          let addInfo = `姓名：${_this.data.express.consignee_name}\n联系方式：${_this.data.express.consignee_phone}\n收货地址：${_this.data.express.consignee_address}`
                          wx.showModal({
                            title: '确认收货信息',
                            content: `您的收货信息为：\n${addInfo}`,
                            cancelText: '去修改',
                            confirmText:'已确认',
                            success: function(res) {
                              if (res.confirm) {
                                util._post(Api.postAddExpress(),
                                {
                                  activity_id:_this.data.filters.id
                                }, res => {
                                  wx.showToast({
                                    title: '已收到您的信息，工作人员会在72小时内与您联系，您有任何问题也可联系客服：yinxinxiaobian',
                                    icon: 'none',
                                    duration: 2000
                                  })
                                  setTimeout(()=>{
                                    wx.navigateTo({
                                      url: `../myGift/myGift`,
                                      success: function(res){
                                        // success
                                      }
                                    })
                                  }, 1500)
                                  console.log('res: ', res)
                                },error=>{
                                  console.log(error)
                                })
                              } else if (res.cancel) {
                                wx.navigateTo({
                                  url: `../addressEdit/addressEdit?id=${_this.data.detail.id}&from=lottery&address=${JSON.stringify(_this.data.express)}`,
                                  success: function(res){
                                    // success
                                  }
                                })
                              }
                            }
                          })
                        }
                      } else if (res.cancel) {
                        console.log('用户点击取消')
                      }
                    }
                  })
                } else {
                  wx.showModal({
                    title: '恭喜中奖',
                    content: `您获得了[${_this.data.ticket.name}]\n快去您的卡包看看吧`,
                    cancelText:'知道了',
                    confirmText:'前往查看',
                    success: function(res) {
                      if (res.confirm) {
                        wx.navigateTo({
                          url: '../myCard/myCard',
                          success: function(res){
                            // success
                          }
                        })
                      } else if (res.cancel) {
                        console.log('用户点击取消')
                      }
                    }
                  })
                }
              }
            }
          }
        }
      } else {
        _this.postActivityAddGroup()
      }
    }, error => {
      wx.hideLoading()
      wx.stopPullDownRefresh()
    })
  },
  jumpToHome() {
    wx.switchTab({
      url: '../home/home'
    })
  },

  jumpToRuleDetail() {
    wx.navigateTo({
      url: '../rulesDetail/rulesDetail'
    })
  },
  jumpToPrizeDetail(e) {
    let dataset = e.currentTarget.dataset
    wx.navigateTo({
      url: `../ticketDetail/ticketDetail?id=${dataset.id}`
    })
  },
  getFormId (e) {
    util.getFormId(e, app)
    util.saveFormIds(app)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this
    _this.setData({
      'add_filters.id':parseInt(options.id),
      'filters.id':parseInt(options.id),
      'filters.form_id': options.form_id,
    })
    var uid = 0
    setTimeout(v=>{
      _this.setData({
        isLogin: wx.getStorageSync('isLogin'),
        isShowBox: wx.getStorageSync('isLogin')==0
      })
    },300)
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
      uid = wx.getStorageSync('userInfo').id
      _this.setData({
        'filters.user_id':uid,
      })
    }
    if(wx.getStorageSync('isLogin')===1) {
      _this.getActivityGroup()
    }
    wx.setNavigationBarTitle({ title: '拼团抽奖' });
  },
  jumpToRuleDetail(e) {
    wx.navigateTo({
      url: `../rulesDetail/rulesDetail?type=lottery&id=${e.currentTarget.dataset.id}`,
      success: function(res){
        // success
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
        title: `0元住-${this.data.detail.name}`,
        path: `pages/lottery/lottery?id=${this.data.detail.id}&user_id=${uid}`,
        success: function (res) {
            util._getStat()
        },
        fail:function(res){
        }
      }
    }
    else {
      return {
        title: `0元住-${this.data.detail.name}`,
        path: `pages/lottery/lottery?id=${this.data.detail.id}&user_id=${uid}`,
        success: function (res) {
          util._getStat()
        },
        fail:function(res){
        }
      }
    }
  }
})