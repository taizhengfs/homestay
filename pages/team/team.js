// pages/team/team.js
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
    rindex:0
  },

  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      rindex: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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