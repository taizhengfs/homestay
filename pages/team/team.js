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
      time:[],
      area:'',
      scale:'',
      phone: '',
      remark:'',
      homestay_id:0,
      time_affirm: 1,
      time_span:1,
      name:'',
      email:'',
      desc:'',
      budget:'',
      dining:'',
      stay:''
    },
    areaMap:[],
    meetingType: [
      {id:1, name:'团建',checked:true},
      {id:2, name:'会议'}
    ],
    timeType: [
      {id:1, name:'日期确定',checked:true},
      {id:0, name:'日期暂定'}
    ],
    timeSpanType: [
      {id:1, name:'全天',checked:true},
      {id:0, name:'半天'}
    ],
    tel:'',
    // multiArray: [['无脊柱动物', '脊柱动物'], ['扁性动物', '线形动物', '环节动物', '软体动物', '节肢动物']],
    multiArray: [[],[]],
    multiIndex: [0, 0],
  },

  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
  },
  mettingChange(e) {
    this.setData({
      'filters.type': parseInt(e.detail.value)
    })
  },
  timeChange(e) {
    this.setData({
      'filters.time_affirm': parseInt(e.detail.value)
    })
  },
  timeSpanChange(e) {
    this.setData({
      'filters.time_span': parseInt(e.detail.value)
    })
  },

  bindDateChangeStart: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      'filters.time[0]': e.detail.value
    })
  },
  bindDateChangeEnd: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      'filters.time[1]': e.detail.value
    })
  },
  bindLocationChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value.join(''))
    this.setData({
      region:e.detail.value,
      'filters.area': e.detail.value.join('')
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
    let _this = this
    wx.showLoading({
      title: '加载中',
    })
    util._get(Api.getRequireDetail(), {homestay_id: id}, res => {
      wx.hideLoading()
      wx.stopPullDownRefresh()
      let d = res.data.data
      _this.data.multiArray = [[],[]]
      d.areaMap.forEach(v => {
        _this.data.multiArray[0].push(v.name)
      })
      d.areaMap[0].children.forEach(value => {
        _this.data.multiArray[1].push(value.name)
      })
      _this.setData({
        multiArray:_this.data.multiArray,
        areaMap:d.areaMap,
        'filters.homestay_id': d.homestay_id
      })
      console.log('_this.data.multiArray: ', _this.data.multiArray);
      console.log('this.areaMap: ', _this.data.areaMap)
    }, error => {
      wx.hideLoading()
      wx.stopPullDownRefresh()
    })
  },
  bindMultiPickerColumnChange: function (e) {
    const _this = this
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: _this.data.multiArray,
      multiIndex: _this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    if (e.detail.column === 0) {
      data.multiArray[1] = []
      _this.data.areaMap[e.detail.value].children.forEach(value => {
        data.multiArray[1].push(value.name)
      })
    }
    _this.data.area = data.multiArray[0][data.multiIndex[0]]+','+data.multiArray[1][data.multiIndex[1]]
    _this.setData(data);
    console.log('_this.data.area: ', _this.data.area);
    _this.setData({
      area:_this.data.area
    })

  },
  getSujiDetail() {
    let _this = this
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
      _this.setData({
        homestays:list
      })
      _this.data.homestays.forEach((v,i) => {
        console.log(v.id,_this.data.filters.homestay_id)
        if(parseInt(v.id)===parseInt(_this.data.filters.homestay_id)){
          _this.setData({
            rindex:i
          })
        }
      });
      
    }, error => {
      wx.hideLoading()
      wx.stopPullDownRefresh()
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
  editName(e) {
    this.setData({
      'filters.name': e.detail.value
    })
  },
  editDesc(e) {
    this.setData({
      'filters.desc': e.detail.value
    })
  },
  editPhone(e) {
    this.setData({
      'filters.phone': e.detail.value
    })
  },
  editBudget(e) {
    this.setData({
      'filters.budget': e.detail.value
    })
  },
  editDining(e) {
    this.setData({
      'filters.dining': e.detail.value
    })
  },
  editStay(e) {
    this.setData({
      'filters.stay': e.detail.value
    })
  },
  editEmail(e) {
    this.setData({
      'filters.email': e.detail.value
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
    console.log(this.data.filters)
    // this.postRequireCreate()
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

  }
})