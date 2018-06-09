// pages/homestaydetail/homestaydetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: false,
    autoplay: true,
    interval: 3000,
    duration: 1500,
    isLoadAll: false,
    swiperimage: [
      {
        type: '1',
        thumb: '../../images/bg_scroll_1.png',
        title:'禾凤鸣书，西湖边四合院'
      },
      {
        type: '2',
        thumb: '../../images/bg_scroll_1.png',
        title: '禾凤鸣书，冬湖边四合院'
      },
      {
        type: '3',
        thumb: '../../images/bg_scroll_1.png',
        title: '禾凤鸣书，南湖边四合院'
      }
    ],
    tags: [
      '四星酒店', '招募体验', '拼团', '促销', '断桥', '宝石山', '西湖', '优惠疯抢'
    ],
    activitys: [
      {
        type:'拼团',
        title:'和风民宿旅馆家庭套房一晚',
        url:'../../images/icon_tuan.png',
        number:3875,
      },
      {
        type:'砍价',
        title:'和风民宿旅馆情侣房一晚',
        url:'../../images/icon_cut.png',
        number:1888,
      },
      {
        type:'体验',
        title:'和风民宿旅馆家庭套房一晚',
        url:'../../images/icon_tiyan.png',
        number:2100,
      }
    ],
    roomlist:[
      {
        type:'大床房A',
        desc:'不含早 | 有窗',
        area:'18',
        price:588
      },
      {
        type:'大床房B',
        desc:'含早 | 有窗',
        area:'25',
        price:1088
      }
    ],
    support:[
      { tag:'客房WIFI',special:true },
      { tag:'免费停车场',special:false },
      { tag:'接机服务',special:true },
      { tag:'代客泊车',special:false },
      { tag:'叫车服务',special:false },
      { tag: '茶室', special: true },
      { tag:'24小时前台服务',special:false },
      { tag:'行李寄存',special:false },
      { tag: '免费旅游交通图', special: true },
      { tag:'旅游票务',special:false },
      { tag:'叫醒服务',special:false },
      { tag:'邮政服务',special:false },
      { tag:'前台保险柜',special:false },
      { tag:'信用卡结算',special:false },
    ],
    dishList:[
      { cover: '../../images/img_disher_1.png', title:'宋嫂鱼羹'},
      { cover: '../../images/img_disher_2.png', title:'西湖藕韵'},
      { cover: '../../images/img_disher_3.png', title:'青菜油豆腐'},
      { cover: '../../images/img_disher_4.png', title:'珍珠娃娃菜'},
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: '民宿详情' });
  },

  jumpToRoomDetail() {
    var _this = this
    wx.redirectTo({
      url: '../roomDetail/roomDetail'
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
  onShareAppMessage: function () {
  
  }
})