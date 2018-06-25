const HOST_URI = 'https://api.yinxinlife.com';
// const HOST_URI = 'https://api.test.yinxinlife.com';
const VERSION = '0.3';
const GET_UPDATA_USER_INFO = '/wxapp/update';//更新用户TOKEN
const POST_USER_INFO = '/wxapp/setUserInfo'
const GET_USER_INFO = '/wxapp/login'
const GET_USER_TICKET_LIST = '/user/ticketList'
const POST_USER_EDIT = '/user/edit'
const GET_USER_HOME = '/user/home'
const GET_TICKET_DETAIL = '/ticket/detail'
const POST_REQUIRE_CREATE = '/require/create'
const GET_REQUIRE_DETAIL = '/require/detail'
const GET_EXPERIENCE_ACTIVITY = '/experience/activity'
const POST_USER_FORM_ID = '/search/homestay'
const GET_SEARCH_HOMESTAY = '/search/homestay'
const POST_FILE_UPLOAD = '/file/upload'
const POST_EXPERIENCE_APPLY = '/experience/apply'
const GET_EXPERIENCE_DETAIL = '/experience/detail'
const GET_EXPERIENCE_HOME = '/experience/home'
const GET_HOMESTAY_DETAIL = '/homestay/detail'
const GET_HOUSE_DETAIL = '/house/detail'
const POST_ACTIVITY_ADD_CHOP = '/activity/addChop'
const POST_ACTIVITY_ADD_GROUP = '/activity/addGroup'
const GET_HOME_HOME = '/home/home'
const GET_ACTIVITY_CHOP = '/activity/chop'
const GET_ACTIVITY_GROUP = '/activity/group'
const GET_USER_INFO_DETAIL = '/user/info'
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
  getUserInfo() {
    return HOST_URI + GET_USER_INFO
  },
  postUserInfo() {
    return HOST_URI + POST_USER_INFO
  },
  getVersionNum() {
    return '0.0.1'
  },
  // 我的票券
  getUserTicketList() {
    return HOST_URI + GET_USER_TICKET_LIST
  },
  // 编辑个人信息
  postUserEdit() {
    return HOST_URI + POST_USER_EDIT
  },
  // 我的首页
  getUserHome() {
    return HOST_URI + GET_USER_HOME
  },
  // 票券详情
  getTicketDetail() {
    return HOST_URI + GET_TICKET_DETAIL
  },
  // 申请团建会议
  postRequireCreate() {
    return HOST_URI + POST_REQUIRE_CREATE
  },
  // 团建会议申请页
  getRequireDetail() {
    return HOST_URI + GET_REQUIRE_DETAIL
  },
  // 体验活动详情页
  getExperienceActivity() {
    return HOST_URI + GET_EXPERIENCE_ACTIVITY
  },
  // 收集用户FORMID
  postUserFormId() {
    return HOST_URI + POST_USER_FORM_ID
  },
  // 民宿搜索列表页
  getSearchHomestay() {
    return HOST_URI + GET_SEARCH_HOMESTAY
  },
  // 文件上传
  postFileUpload() {
    return HOST_URI + POST_FILE_UPLOAD
  },
  // 申请成为体验师
  postExperienceApply() {
    return HOST_URI + POST_EXPERIENCE_APPLY
  },
  // 体验申请页
  getExperienceDetail() {
    return HOST_URI + GET_EXPERIENCE_DETAIL
  },
  // 体验首页
  getExperienceHome() {
    return HOST_URI + GET_EXPERIENCE_HOME
  },
  // 民宿详情
  getHomestayDetail() {
    return HOST_URI + GET_HOMESTAY_DETAIL
  },
  // 房型详情页
  getHouseDetail() {
    return HOST_URI + GET_HOUSE_DETAIL
  },
  // 帮忙砍价
  postActivityAddChop() {
    return HOST_URI + POST_ACTIVITY_ADD_CHOP
  },
  // 加入拼团
  postActivityAddGroup() {
    return HOST_URI + POST_ACTIVITY_ADD_GROUP
  },
  // 首页
  getHomeHome() {
    return HOST_URI + GET_HOME_HOME
  },
  // 砍价活动详情页
  getActivityChop() {
    return HOST_URI + GET_ACTIVITY_CHOP
  },
  // 拼团活动详情页
  getActivityGroup() {
    return HOST_URI + GET_ACTIVITY_GROUP
  },
  // 获取个人信息详情
  getUserInfoDetail() {
    return HOST_URI + GET_USER_INFO_DETAIL
  }
};