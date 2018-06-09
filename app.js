//app.js
import util from './utils/util.js';
import Api from './utils/api.js';
App({
  onShow: function (options) {
    console.log("[onLaunch] 场景值:", options)
  },
  onLaunch: function(options) {
    util.wxAuthorize()
  },
  globalData: {
    userInfo: null,
    gloabalFomIds:[]
  }
})
