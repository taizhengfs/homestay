// home.js
import util from '../../utils/util.js';
import Api from '../../utils/api.js';
import dishesItem from '../../components/dishesItem.js'
var app = getApp();
var page = 1;
var pageSize = 10;
Page({
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1500,
    isLoadAll: false,
    swiperimage: [],
    curentImg: 0,
    shopList: [],
    recommend: [],
    cityList: [],
    showTips:false,
    isFirstLoad:true,
    scrollList: [],
    showScroll: false,
    isShowLocation: false,
    isShowGprs: false,
    shareCover: '',
    shareTitle: '',
    cityid: 0,
    showShareBox: false,
    ischange: 0,
    isChangeFlag: true,
    showShareBox: false,
    shareInfo: null,
    scrollLength:0,
    city_id: ''
  },
  // 切换城市
  changeCity(e) {
    var _this = this
    wx.showLoading({
      title: '加载中'
    })
    const id = e.currentTarget.dataset.id; 
    const index = e.currentTarget.dataset.index;
    console.log(_this.data.cityList)
    for (let i = 0; i < _this.data.cityList.length;i++) {
      _this.data.cityList[i].is_select = false;
    }
    _this.data.cityList[index].is_select = true;
    wx.setStorageSync('cityid', id);
    page=1
    _this.setData({
      cityid: id,
      isShowGprs: false,
      cityList: _this.data.cityList,
      ischange: index,
      isChangeFlag: false,
      curentImg: 0
    })
     _this.getHomeDetail()
  },
  // 隐藏未获取导地理位置的弹窗
  hideLocation() {
    this.setData({
      isShowLocation: false
    })
  },
  closeCity() {
    this.setData({
      isShowGprs: false
    })
  },
  goToSearch() {
    wx.navigateTo({
      url: '../search/search'
    })
  },
   // 切换城市样式改变
  selectCity() {
    var _this = this
    _this.setData({
      isShowGprs: !_this.data.isShowGprs
    })
  },
  jumpToMap: function (event) {
    var _this = this
    var Otype = event.currentTarget.dataset.type
    var Ourl = event.currentTarget.dataset.url
    var Oapp_id = event.currentTarget.dataset.app_id
    var Ounion_id = wx.getStorageSync('unionId')
    var is_login = wx.getStorageSync('isLogin');
    // 先判断是否授权
    console.log(Ounion_id)
    if (Otype == 3) {
      if (is_login == 0) {
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
         });
      }else {
        wx.navigateToMiniProgram({
          appId: Oapp_id,
          path: Ourl,
          extraData: {
            unionid: Ounion_id
          },
          envVersion: 'trial', // trial release
          success(res) {
            // 打开成功
            console.log('res', res)
          },
          fail(err) {
            console.log('err', err)
          }
        })
      } 
    } else {
      if (util.isTabBar(Ourl)) {
          wx.switchTab({
              url: Ourl
          })
      } else {
          wx.navigateTo({
              url: Ourl
          })
      }
    }
  },
  // 显示分享弹窗
  versionTip: function (event) {
    this.setData({
      shareCover: event.currentTarget.dataset.img,
      shareTitle: event.currentTarget.dataset.title,
        dishesId: event.currentTarget.dataset.id,
      showShareBox: true
    })
    this.hideVideos()
  },
  // 分享时关闭所有视频
  hideVideos() {
    var _this = this
    let dishesList = _this.data.shopList;
    for (let j = 0; j < shopList.length; j++) {
        shopList[j].is_autoplay = false    
    }
  },
  shareBoxClose: function () {
    this.setData({
      showShareBox: false
    })
  },
  //获取列表数据
  getHomeDetail(gps) {
    var _this = this;
    if (_this.data.isFirstLoad == true) {
      wx.showLoading({
        title: '加载中',
      })
    }
    util._get(Api.getHomeDetail(), {
      page: page,
      pageSize: pageSize,
      withGPS: gps
    }, function (res) {
      wx.hideLoading()
      wx.stopPullDownRefresh()
      if (res.data.code == 200) {
        console.log(res.data.data)
        
        // 菜品列表    
        var list = res.data.data.dishes;       
        for (let i = 0; i < list.length; i++) {
          list[i].is_play = false;
          list[i].is_payBut = false;
          list[i].is_autoplay = true;
          if (list[i].video_id > 0) {
            list[i].imgHeight = parseInt(list[i].video.height / list[i].video.width * 750);
          } else {
            list[i].imgHeight = 420;
          }
        }  
        if (page == 1) {
          console.log(city)
          if (_this.data.isChangeFlag) {
            // 通过小程序码或者公众号填写的链接进来，进到指定的城市
            if (_this.data.city_id !== undefined) {
              wx.setStorageSync('cityid', _this.data.city_id);
            } else {
              wx.setStorageSync('cityid', res.data.data.city_id);
            }  
            var cityIdper = wx.getStorageSync('cityid')
            //城市列表
            var city = res.data.data.cities;
            console.log(city)
            for (let i = 0; i < city.length; i++) {
              city[i]['is_select'] = false
            }    
            for (let i = 0; i < city.length; i++) {
              // 根据分享页面带的城市参数获取信息
              if (_this.data.city_id !== undefined) {
                if (_this.data.city_id == city[i].id) {
                  city[i].is_select = true
                  _this.setData({
                    cityid: _this.data.city_id,
                    isShowLocation: false,
                    ischange: i
                  });
                }   
              } else {
                // 根据gps选中城市获取信息
                if (city[i].isGPS) {
                  if (city[i]['id'] == res.data.data.city_id) {
                    city[i].is_select = true
                    _this.setData({
                      cityid: res.data.data.city_id,
                      isShowLocation: false,
                      ischange: i
                    });
                  }
                }
                // 根据缓存中的cityId获取信息 
                if (cityIdper == city[i].id) {
                  city[i].is_select = true
                  _this.setData({
                    cityid: _this.data.city_id,
                    isShowLocation: false,
                    ischange: i
                  });
                }
              }
            }
            var flag = false
            flag = city.every(v => {
              return !v.isGPS
            })
            if (flag && _this.data.isChangeFlag) {
              _this.setData({
                isShowLocation: true,
              });
            }else {
              _this.setData({
                isShowLocation: false,
              });
            }
            _this.setData({
              cityList: city
            })
          }
          // 滚动swiper列表
          // _this.setData({
          //   swiperimage: []
          // })
          console.log(city)
          _this.setData({
            isFirstLoad: false,
            shopList: list,
            swiperimage: res.data.data.topics,
            recommend: res.data.data.words,
            // cityList: city
          })
          console.log(_this.data.swiperimage) 
        } 
        else {
          if (list.length < pageSize) {
            _this.setData({
              isFirstLoad: false,
              isLoadAll: true
            });
          }
          _this.setData({
            shopList: _this.data.shopList.concat(list)
          });
        }
      }
    })
    if (_this.data.shopList.length !== 0) {
      for (let i = 0; i < _this.data.shopList.length; i++) {
        _this.data.shopList[i]['is_autoplay'] = false
      }
    }
  },
  // 弹幕滚动
  startScroll() {
    var _this = this;
    let a = _this.data.scrollList.shift()
    let b = _this.data.scrollList.push(a)
    _this.data.scrollLength += 1
    _this.setData({
      scrollLength: _this.data.scrollLength,
      scrollList: _this.data.scrollList
    })
    setTimeout(() => {
      _this.setData({
        showScroll: false
      })
    }, Api.scrollTime() - 500)
  },
  // 获取滚动消息
  getScrollMessage() {
    var _this = this
    util._get(Api.getMessage(), {}, res => {
      _this.setData({
        scrollList: res.data.data.list
      })
      if (res.data.data.list.length > 0) {
        let timer = setInterval(() => {
          if (_this.data.scrollLength >= _this.data.scrollList.length-1) {
            clearInterval(timer)
          }
          _this.setData({
            showScroll: true
          })
          _this.startScroll()
        }, Api.scrollTime())
      }
    }, error => {
    })
  },
  
  onLoad: function (options) {
    // 跳转相应的城市
    this.setData({
      city_id: options.city_id
    })
    var _this = this;
    page = 1
    _this.getHomeDetail();
    _this.saveFormIds()
    //授权地理位置
    util._post(Api.postStatLaunch(), {
      data: JSON.stringify(options)
    }, res => {
      console.log(JSON.stringify(options));
      console.log(res.data)
    })
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    util._getLocation(function (v) {  
       _this.getHomeDetail(1);
    }, function (b) {
    })
    wx.setNavigationBarTitle({ title: '二更美食地图' });
    // _this.checkStatus() 
    dishesItem.init(_this);
    wx.getStorage({
      key: 'info',
      success: function (res) {
      }
    })
    _this.getScrollMessage()
  },
  onReady: function () {
  },
  onShow: function (options) {
    var _this = this;
    _this.setData({
      isLoadAll: false
    })
  },
  onPullDownRefresh: function () {
    var _this=this;
    page = 1;
    _this.getHomeDetail()
    _this.setData({
      isChangeFlag: false
    })
  },
  onReachBottom: function () {
    var _this = this;
    if (_this.data.isLoadAll == false) {
      page = page + 1;
      _this.getHomeDetail();
    }
    console.log(page)
  },
   onShareAppMessage: function (res) {
    var _this = this
    var cityId = wx.getStorageSync('cityid')
    if (res.from === 'button') {
        return {
            title: '你看这家'+_this.data.shareInfo.title+'怎么样，约吗？',
            desc: '二更美食地图',
            path: 'pages/shopDishes/dishes?shop_id=' + _this.data.shareInfo.shop_id,
            success: function (res) {
              util._postStat('你看这家' + _this.data.shareInfo.title + '怎么样，约吗？', 'pages/shopDishes/dishes?shop_id=' + _this.data.shareInfo.shop_id)
            },
            fail:function(res){
            }
        }
    }
    else {
        return {
            title: '每晚二更 发现身边不一样的美食',
            desc: '人间美味啊',
            path: '/pages/home/home?city_id=' + cityId,
            success: function (res) {
                util._postStat('每晚二更 发现身边不一样的美食', '/pages/home/home')
            },
            fail:function(res){
            }
        }
    }
   },
  saveFormIds() {
      var formIds = app.globalData.gloabalFomIds; // 获取gloabalFomIds
      if (formIds.length) {//gloabalFomIds存在的情况下 将数组转换为JSON字符串
          // formIds = JSON.stringify(formIds);
          app.globalData.gloabalFomIds = '';
          util._post(Api.formAdd(), {
              form_ids: formIds
          }, function (response) {
              console.log(response.data)
          }, function (response) {
              console.log(response.data)
          });
      }
  },
})