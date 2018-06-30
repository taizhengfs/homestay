// pages/team/team.js

import util from '../../utils/util.js';
import Api from '../../utils/api.js';
Page({
  /**
   * 页面的初始数据
   */
  data: {

    region: ['浙江省', '衢州市', '衢江区'],
    customItem: '全部',
    specialList: [
      {
        name: 'SKU多',
        desc: '100品类1000+种玩法随你玩'
      },
      {
        name: '懂HR',
        desc: '10年HR咨询领域经验，不纯玩，融入业务场景实现企业管理目的。'
      },
      {
        name: '懂互联网',
        desc: '结合线上直播、 弹幕、话题组及 新媒体营销，共 建雇主品牌及PR传播。'
      }
    ],
    problemList: ['新老员工融合', '客户关系维护', '企业交友联谊','新人入职破冰', '公司文化建设', '部门团队建设', '企业雇主品牌', '激励犒劳员工', '公司休闲度假', '会议环节热身','互联网场景营销',],

    category: [
      {
        name:'特色类',
        desc:'城市定向挑战\n即兴喜剧表演\n民俗体验\n心理催眠体验\n烹饪、糕点教学\n国际舞、社交舞 \n咖啡品鉴+冲泡\n惊悚体验\n各类亲子活动\n各类主题联谊\n各类主题轰趴'
      },
      {
        name:'场景体验类',
        desc:'跑男撕名牌\n镭射枪大战\n水弹枪大战\n密室逃脱\n真人桌上足球\n鬼屋'
      },
      {
        name:'体育类',
        desc:'泡泡足球\n荧光躲避球\n卡丁车\n皮划艇\n骑马\n射箭\n高尔夫\n帆船\n赛车\n滑雪\n跳伞直升机'
      },
      {
        name: '户外类',
        desc: '荒野求生\n田野农场\n定向徒步\n极限挑战\n户外探险\n沙漠\n草原穿越'
      },
      {
        name: '高端定制类',
        desc: '定制旅游\n艺术品鉴\n手工扎染\n贵族礼仪\n红酒\烈酒品鉴\n茶艺\n花道\n中华武术\n国学\n中医养生w\n汉服\n旗袍\n香道\n古琴\n传统戏曲\n书画\n乐舞\n诗词\n礼仪\n易学'
      },
    ],
    sp_1:'定制旅游\n艺术品鉴\n手工扎染\n贵族礼仪\n红酒\烈酒品鉴\n茶艺\n花道\n中华武术\n国学',
    sp_2:'中医养生\n汉服\n旗袍\n香道\n古琴\n传统戏曲\n书画\n乐舞\n诗词\n礼仪\n易学',
    reco:['太真洞','完美的','运河'],
    rindex:0,
//     type	true	int	类型 1团建 2会议
// company_name	true	string	公司名称
// time	true	string	时间
// area	true	string	地区
// scale	true	string	规模
// phone	true	string	联系方式
// remark	false	string	备注
// homestay_id	false	int	民宿ID
    homestays:[],
    filters: {
      type: 1,
      company_name: '',
      time:'',
      area:'',
      scale:'',
      phone: '',
      remark:'',
      homestay_id:0
    },
    meetingType: [
      {id:1, name:'团建'},
      {id:2, name:'会议'}
    ],
    tel:''
  },
  radioChange(e) {
    this.setData({
      'filters.type': parseInt(e.detail.value)
    })
  },
  makePhoneCall(e) {
    util.callPhone(e)
  },
  bindHomestayChange(e) {
    let _this = this
    _this.setData({
      rindex: e.detail.value,
      'filters.homestay_id': _this.data.homestays[e.detail.value].id
    })
  },
  getRequireDetail(id) {
    wx.showLoading({
      title: '加载中',
    })
    util._get(Api.getRequireDetail(), {homestay_id: id}, res => {
      wx.hideLoading()
      wx.stopPullDownRefresh()
      let d = res.data.data
      console.log(d)
      
    }, error => {
      wx.hideLoading()
      wx.stopPullDownRefresh()
    })
  },
  getSujiDetail() {
    wx.showLoading({
      title: '加载中',
    })
    util._get(Api.getSearchHomestay(), {page: 1, pageSize: 20}, res => {
      wx.hideLoading()
      wx.stopPullDownRefresh()
      let d = res.data.data
      d.list = d.list.map(val=>{
        let el = {id:val.id, name:val.name}
        return el
      })
      const {list} = d
      this.setData({
        homestays:list
      })
      console.log('list: ', list);
      
    }, error => {
      wx.hideLoading()
      wx.stopPullDownRefresh()
    })
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      'filters.time': e.detail.value
    })
  },
  bindLocationChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value.join(''))
    this.setData({
      region:e.detail.value,
      'filters.area': e.detail.value.join('')
    })
  },

  editCompany(e) {
    this.setData({
      'filters.company_name': e.detail.value
    })
  },
  editScale(e) {
    this.setData({
      'filters.scale': e.detail.value
    })
  },
  editPhone(e) {
    this.setData({
      'filters.phone': e.detail.value
    })
  },
  editRemark(e) {
    this.setData({
      'filters.remark': e.detail.value
    })
  },
  resetFilter() {
    let _this = this
    _this.data.filters= {
      type: 1,
      company_name: '',
      time:'',
      area:'',
      scale:'',
      phone: '',
      remark:'',
      homestay_id:0
    }
    _this.setData({
      filters:_this.data.filters,
    })
  },
  showPaneCard(){
    let _this = this;
    _this.setData({
      isShowCard: !_this.data.isShowCard
    })
  },
  postRequireCreate() {
    var _this = this
    wx.showLoading({
      title: '加载中',
    })
    util._post(Api.postRequireCreate(), _this.data.filters, res => {
      wx.hideLoading()
      wx.stopPullDownRefresh()
      let ex = res.data
      if(ex.code===200) {
        _this.showPaneCard()
      } else {
        wx.showToast({
          title: res.data.message,
          icon: 'none',
          duration: 2000
        })
        _this.resetFilter()
      }
    }, error => {
      wx.hideLoading()
      wx.stopPullDownRefresh()
      _this.resetFilter()
    })
  },

  goBackPage() {
    let _this = this
    _this.resetFilter()
    _this.setData({
      isShowCard: !_this.data.isShowCard
    })
    wx.navigateBack({
      delta: 1, // 回退前 delta(默认为1) 页面
      success: function(res){
        // success
      },
    })
  },
  submitConsult() {
    this.postRequireCreate()
    console.log(this.data.filters)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSujiDetail()
    if(typeof options.id !== 'undefined') {
      this.getRequireDetail(options.id)
      this.setData({
        'filters.homestay_id':options.id
      })
    }
    if(typeof options.tel !== 'undefined') {
      this.setData({
        tel:options.tel
      })
    }
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
  onShareAppMessage: function () {

  }
})