/**
 * 菜品列表
 * author：  Jing
 * time：    2017.11.10
 */

// 引入API
import util from '../utils/util.js'
import Api from '../utils/api.js';
var app = getApp();
// 主入口
function init (self) {
    var _this = self;
    _this.videoPlay = videoPlay;
    _this.videoPlayEnd = videoPlayEnd;
    _this.videoPlayTime = videoPlayTime;
    _this.handleDishes = handleDishes;
    _this.tapNavigator = tapNavigator;
    _this.ticketNavigator = ticketNavigator;
    _this.showShareDialog = shareBox;
    _this.closeShareDialog = shareBoxClose;
    _this.postShare = toShare;
    _this.getFormId = getFormId;
}
// 播放视频
function videoPlay (e) {
    var id = e.currentTarget.dataset.id,
        ind = e.currentTarget.dataset.index,
        _this = this,
        list = _this.data.shopList.map(v => {
            v.is_payBut = false;
            if (v.id === id) {
                v.is_play = true
                v.is_autoplay = true
            } else {
                v.is_play = false
                v.is_autoplay = false
            }
            return v
        });

    _this.setData({
        shopList: list
    })
}

function getFormId(e) {
    let formId = e.detail.formId;
    dealFormIds(formId); //处理保存推送码
}
function dealFormIds(formId) {
    let formIds = app.globalData.gloabalFomIds;//获取全局数据中的推送码gloabalFomIds数组
    if (!formIds) formIds = [];
    formIds.push(formId);//将data添加到数组的末尾
    app.globalData.gloabalFomIds = formIds; //保存推送码并赋值给全局变量
}
// 播放完成
function videoPlayEnd (e) {
    var id = e.currentTarget.dataset.id,
        ind = e.currentTarget.dataset.index,
        _this = this,
        thisDishesVideo = wx.createVideoContext('dishes_video_'+ind); 
    thisDishesVideo.exitFullScreen();
    var list = _this.data.shopList.map(v => {
        v.is_payBut = false;
        v.is_play = false;
        return v
    });
    _this.setData({
        shopList: list
    })
}
// 播放时间
function videoPlayTime (e) {
    var _this = this,
        time = parseFloat(e.detail.currentTime),
        id = e.currentTarget.dataset.id;
    if (time >= 3) {
        var list = _this.data.shopList.map(v => {
            if (v.id === id) {
                v.is_payBut = true
            }
            return v
        });
        _this.setData({
            shopList: list
        })
    }
}
// 想吃 or 取消想吃
function handleDishes (e) {
    var _this = this,
        id = e.currentTarget.dataset.dishesid,
        ind = e.currentTarget.dataset.index,
        status = e.currentTarget.dataset.status,
        isLogin = wx.getStorageSync('isLogin');
    
    // // 判断是否登录
    if (parseInt(isLogin) != 0) {
        // 取消想吃
      if (status === 1) {
          util._post(Api.postDishesDel(), {dishes_id:id}, (res) => {
              wx.hideLoading()
              if (res.data.code == 200) {
                  _this.data.shopList[ind].toeat.status = 0;
                  _this.setData({
                      shopList: _this.data.shopList
                  });
                  wx.showToast({
                      title: '已取消想吃！',
                      icon: 'success',
                      duration: 2000
                  })
              }
          });
      } else {
          util._post(Api.postDishesAdd(), {dishes_id: id}, (res) => {
              wx.hideLoading()
              if (res.data.code == 200) {
                  _this.data.shopList[ind].toeat.status = 1;
                  _this.setData({
                      shopList: _this.data.shopList
                  });
                  wx.showToast({
                      title: '已想吃！',
                      icon: 'success',
                      duration: 2000
                  })
              }
          })
      }
    } else {
        util._goSetting(function () {
            // 更新用户信息
            util._getUserInfo(function (m) {
                util._post(Api.postUserInfo(), {
                    rawData: m.rawData,
                    signatrue: m.signature,
                    encryptedData: m.encryptedData,
                    iv: m.iv
                }, function (z) {
                    if (z.data.code == 200) {
                        wx.setStorageSync('isLogin', 1);
                        wx.setStorageSync('info', z.data.data.info);
                    }
                })
            }, function (error) {

            })
        });
    }
}
// 跳转事件
function tapNavigator (e) {
    var url = e.currentTarget.dataset.url
    console.log(url)
    wx.navigateTo({
      url: url
    })
}
function ticketNavigator (e) {
  // var shopId = e.currentTarget.dataset.shopid;
  var ticketId = e.currentTarget.dataset.ticketid;
    wx.reportAnalytics('home_click_discountguide', {
        click_discountguide: 0,
    });
  console.log(ticketId)
    wx.navigateTo({
      url: '../ticketDetail/ticketDetail?ticket_id=' + ticketId
    })
}
// 弹出分享框
function shareBox(e) {
  console.log(e)
    var _this = this,
        info = {
            cover: e.currentTarget.dataset.cover,
            title: e.currentTarget.dataset.title,
            id: e.currentTarget.dataset.id,
            shop_id: e.currentTarget.dataset.shop_id
        };
    _this.setData({
        shareInfo: info,
        showShareBox: true
    })
    // this.hideVideos()
}
// 关闭分享框
function shareBoxClose() {
    var _this = this;
    _this.setData({
        shareInfo: null,
        showShareBox: false
    })
}

// 生成海报
function toShare(e) {
    var _this = this,
        dishesId = e.currentTarget.dataset.id;

    wx.showLoading({
        title: '生成中',
    })
    util._post(Api.getDishesPoster(), {
        id: dishesId
    }, function (res) {
        if (res.data.code == 200) {
            wx.hideLoading()
            wx.previewImage({
                current: 'http:'+res.data.data.url,
                urls: ['http:' +res.data.data.url]
            })
        }
        else {
            wx.showToast({
                title: '生成失败',
                icon: 'success',
                duration: 1000
            })
            setTimeout(function(){
                wx.hideLoading()
            },1000)
        }
    })
}
// 暴露入口
module.exports = {
    init: init
}
  