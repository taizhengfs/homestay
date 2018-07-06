import Api from 'api.js';
var latitude = ''
var longitude = ''
wx.setStorageSync('ishaspos', -1)
var pos = wx.getStorageSync('ishaspos')

let requestStatus = 0 // 0:未请求 1:请求中 2:请求完成 3:请求失败
wx.getLocation({
  type: 'wgs84',
  success: function (res) {
    latitude = res.latitude
    longitude = res.longitude
    if (pos ==-1){
      if (!!latitude){
        pos = 1
        wx.setStorageSync('ishaspos', 1)
      }
      else{
        pos = 0
        wx.setStorageSync('ishaspos', 0)
      }
    }
  }
})

function convert_length(length) {
    return Math.round(wx.getSystemInfoSync().windowWidth * length / 750);
}

function getFormId(e, app) {
  console.log(e)
  let formId = e.detail.formId;
  dealFormIds(formId,app); 
}

function dealFormIds(formId,app) {
  let formIds = app.globalData.gloabalFomIds;
  if (!formIds) formIds = [];
  formIds.push(formId);
  app.globalData.gloabalFomIds = formIds; 
}

function saveFormIds(app) {
    var formIds = app.globalData.gloabalFomIds; 
    console.log(formIds)
    if (formIds.length) {
        formIds = formIds.join(',');
        app.globalData.gloabalFomIds = '';
        _post(Api.postUserFormId(), {
            form_ids: formIds
        }, function (response) {
            console.log(response.data)
        }, function (response) {
            console.log(response.data)
        });
    }
}

function _getStat(){
  _get(Api.getAddShareExp(), {}, res => {
    console.log(res.data)
  }, error => {
    console.log(error)
  })
}
// 如果没有授权条授权设置
function _goSetting(success) {
  var _this = this
  wx.showModal({
    confirmText: '去设置',
    confirmColor: '#fed300',
    title: '是否要打开设置页面重授权',
    content: '需要获取您的公开信息（昵称、头像等），请到小程序的设置中打开用户信息授权',
    success: function (res) {
      if (res.confirm) {
        wx.openSetting({
          success: (res) => {
            console.log(res)
            console.log(res.authSetting['scope.userInfo'])
            if (res.authSetting['scope.userInfo'] == true) {
              wx.showToast({
                title: '授权成功',
                icon: 'success',
                duration: 1000
              })
              success(res)
              // _this.checkStatus()
            }
            else {
              wx.showToast({
                title: '授权失败',
                icon: 'success',
                duration: 1000
              })
              // fail()
              // _this.goSetting()
            }
          }
        })
      } else if (res.cancel) {
        // fail()
        // _this.goSetting()
        console.log('用户点击取消')
      }
    }
  })
}

function _getLocation(success,fail){
  wx.getLocation({
    type: 'wgs84',
    success: function (res) {//todo 上线前修改
      latitude = res.latitude//30.656225
      longitude = res.longitude//104.066620
      if (pos ==-1){
        if (!!latitude){
          pos = 1
          wx.setStorageSync('ishaspos', 1)
        }
        else{
          pos = 0
          wx.setStorageSync('ishaspos', 0)
        }
      }
      success(res)
    },
    fail:function(error){
      console.log('error: ', error);
    }
  })
}

function _login(success, fail) {
  wx.login({
    success: function (res) {
     success(res)
    },
    fail: function (error) {
      fail(error)
    }
  })
}

function _getUserInfo(success,fail){
  wx.getUserInfo({
    withCredentials: true,
    lang: 'zh_CN',
    success: function (res) {
      success(res)
    },
    fail:function(error){
      fail(error)
    }
  })
}

function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function _get(url, data, success, fail) {
  wx.request({
    url: url,
    header: {
      'content-type': 'application/json',
      'token': wx.getStorageSync('token'),
      'cityid': wx.getStorageSync('cityid'),
      'version': Api.getVersionNum(),
      'os': Api.getOsType(),
      'position': wx.getStorageSync('ishaspos'),
      'lng': longitude,
      'lat': latitude
    },
    data: data,
    success: function (res) {
      success(res);
    },
    fail: function (res) {
      fail(res);
    }
  });
}

/**
* url 请求地址
* success 成功的回调
* fail 失败的回调
*/
function _post(url, data, success, fail) {
  wx.request({
    url: url,
    header: {
      'content-type': 'application/x-www-form-urlencoded',
      'token': wx.getStorageSync('token'),
      'platid': '24',
      'version': Api.getVersionNum(),
      'os': Api.getOsType(),
      'position': wx.getStorageSync('ishaspos'),
      'lng': longitude,
      'lat': latitude
    },
    method: 'POST',
    data: data,
    success: function (res) {
      success(res);
    },
    fail: function (res) {
      fail(res);
    }
  });
}

// 判断是否为tabbar
function isTabBar (url) {
  // tabbar配置
  var tabBarArr = [
    'pages/home/home',
    '/pages/home/home',
    'pages/suji/suji',
    '/pages/suji/suji',
    'pages/experience/experience',
    '/pages/experience/experience',
    '/pages/user/user',
    'pages/user/user'
  ];
  if (tabBarArr.indexOf(url) != -1) {
    return true;
  } else {
    return false;
  }
}
 //-------------------------2.4重写授权-------------------------------
const getToken = function () {
  wx.login({
    success: function (res) {
      _get(Api.getUserInfo(), {
        code: res.code
      }, function (res) {
        if (res.data.code == 200) {
          var isLogin = res.data.data.is_login;
          wx.setStorageSync('isLogin', isLogin);
          wx.setStorageSync('token', res.data.data.token);
        }
      })
    }
  });  
}
// 小程序入口第一次授权
const wxAuthorize = function (callback) {
  requestStatus = 1
  wx.login({
    success: function (res) {
      _get(Api.getUserInfo(), {
        code: res.code
      }, function (res) {
        if (res.data.code == 200) {
          var isLogin = res.data.data.login;
          wx.setStorageSync('isLogin', isLogin);
          wx.setStorageSync('userInfo', res.data.data.user);
          wx.setStorageSync('token', res.data.data.token);
          if (isLogin!==1) {
            wx.getUserInfo({
              lang: 'zh_CN',
              withCredentials: true,
              success: function (res) {
                console.log('res: ', res);
                // 请求用户信息接口
                setMember(res)
              },
              fail: function (fail) {
                console.log(fail)
                requestStatus = 0
                // 写入缓存
                // 弹出“授权说明”弹窗
                // openWxAuth()
              }
            })           
          }else {
            // wx.setStorageSync('unionId', res.data.data.info.union_id);
          }
        }
      })      
    }
  });
}
// 设置用户信息
const setMember = function (res, callback) {
  _post(Api.postUserInfo(), {
    rawData: res.rawData,
    signature: res.signature,
    encryptedData: res.encryptedData,
    iv: res.iv
  }, function (res) {
    console.log('res: ', res);
    // 更新用户过期时间
    if (res.data.code === 200) {
      console.log(2222)
      requestStatus = 2
      // 写入缓存
      wx.setStorageSync('isLogin', 1);
      wx.setStorageSync('info', res.user);
    } else {
      requestStatus = 3
    }
  }, (err) => {
    console.log(err)
    wx.hideLoading()
    requestStatus = 3
  })
}
// 第二次打开微信授权
const openWxAuth = function () {
  wx.showModal({
    title: '微信授权',
    content: '需要获取您的公开信息（昵称、头像等），请到小程序的设置中打开用户信息授权',
    confirmText: '去设置',
    success: function (res) {
      if (res.confirm) {
        // 跳转到用户授权设置页面
        wx.openSetting({
          success: (res) => {
            if (res.authSetting['scope.userInfo'] == true) {
              wxAuthorize()
            } else {
              console.log('第二次授权弹窗 - 取消了授权');
            }
          }
        })
      } else if (res.cancel) {
        console.log('第二次授权弹窗点 - 击了取消')
      }
    }
  })
}
// 页面OnShow方法
const pageOnShowFn = function (callback) {
  let token = wx.getStorageSync('token')
  // 判断用户是否授权
  wx.getSetting({
    success: (res) => {
      if (res.authSetting['scope.userInfo'] == true) {
        if (parseInt(token.is_login) === 1) {
          wx.hideLoading()
        }
        // 当接口没有请求，或者请求失败时，重新请求授权、设置用户信息接口
        if ((requestStatus == 0 || requestStatus == 3) && parseInt(token.is_login) === 0) {
          wx.login({
            success: function (res) {
              console.log('Auth2')
              wx.getUserInfo({
                lang: 'zh_CN',
                withCredentials: true,
                success: function (res) {
                  console.log('Auth3')
                  // 请求用户信息接口
                  setMember(res, callback)
                },
                fail: function (fail) {
                  console.log('Auth4')
                  requestStatus = 0
                  // 写入缓存
                  wx.setStorageSync('is_authSum', 1)
                  // 弹出“授权说明”弹窗
                  openWxAuth()
                }
              })
            }
          });
        }
        // 如果设置用户信息接口请求中，则等待，调自身方法
        if (requestStatus == 1) {
          console.log('requestStatus1')
          pageOnShowFn(callback)
        }
        // 如果设置用户信息接口已请求完成，则返回回调函数
        if (requestStatus == 2) {
          console.log('requestStatus2')
          if (callback && typeof callback == 'function') {
            callback.apply(this);
          }
        }
      } else {
        wx.hideLoading()
        // 第一次打开页面，弹出微信授权时，没有点击确定取消按钮
        if (callback && typeof callback == 'function' && requestStatus == 1) {
          console.log('first');
          pageOnShowFn(callback)
        }
      }
    }
  })
}

//----------------------------重写授权结束---------------------------------------

const callPhone = function(e) {
  var tel = e.currentTarget.dataset.tel
  wx.makePhoneCall({
    phoneNumber: tel
  })
}

module.exports = {
  formatTime: formatTime,
  _get: _get,
  _post: _post,
  _login: _login,
  _getUserInfo: _getUserInfo,
  _getLocation: _getLocation,
  _goSetting: _goSetting,
  _getStat: _getStat,
  isTabBar: isTabBar,
  wxAuthorize: wxAuthorize,
  setMember: setMember,
  openWxAuth: openWxAuth,
  pageOnShowFn: pageOnShowFn,
  getToken: getToken,
  callPhone: callPhone,
  getFormId:getFormId,
  saveFormIds:saveFormIds
}