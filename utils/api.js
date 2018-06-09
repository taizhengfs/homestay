const HOST_URI = 'https://cate.ergengtv.com';
const ACT_URI = 'https://act.ergengtv.com';
const VERSION = '0.3';

const GET_USER_INFO = '/api/auth/wxapp/login';//获取注册用户TOKEN
const GET_UPDATA_USER_INFO = '/api/auth/wxapp/update';//更新用户TOKEN
const POST_USER_INFO = '/api/auth/wxapp/setUserInfo'
const SCROLL_TIME = 5000

module.exports = {
  //获取手机系统系统
  getOsType() {
    var type = '';
    wx.getSystemInfo({
      success(res) {
        type = res.system.split(' ')[0].toLowerCase()
      }
    })
    return type;
  },
  getVersionNum() {
    return '0.0.1'
  },
  updataToken() {
    return HOST_URI + GET_UPDATA_USER_INFO
  },
  // 获取用户信息
  getUserInfo() {
    return HOST_URI + GET_USER_INFO;
  },
  // 提交用户信息
  postUserInfo() {
    return HOST_URI + POST_USER_INFO;
  },
  scrollTime(){
    return SCROLL_TIME
  },
};