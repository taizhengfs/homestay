// pages/homestaydetail/homestaydetail.js
import util from '../../utils/util.js';
import Api from '../../utils/api.js';
import {formatDate} from '../../utils/date.js';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // swiperimage: [
    //   {
    //     type: '1',
    //     thumb: '//file.yinxinlife.com/images/bg_scroll_1.png',
    //     title:'禾凤鸣书，西湖边四合院'
    //   },
    //   {
    //     type: '2',
    //     thumb: '//file.yinxinlife.com/images/bg_scroll_1.png',
    //     title: '禾凤鸣书，冬湖边四合院'
    //   },
    //   {
    //     type: '3',
    //     thumb: '//file.yinxinlife.com/images/bg_scroll_1.png',
    //     title: '禾凤鸣书，南湖边四合院'
    //   }
    // ],
    tags: [
      '四星酒店', '招募体验', '拼团', '促销', '断桥', '宝石山', '西湖', '优惠疯抢'
    ],
    iconList: [
      '//file.yinxinlife.com/images/icon_tiyan.png',
      '//file.yinxinlife.com/images/icon_tuan.png',
      '//file.yinxinlife.com/images/icon_cut.png'
    ],
    activitys: [
      {
        type:'拼团',
        title:'和风民宿旅馆家庭套房一晚',
        url:'//file.yinxinlife.com/images/icon_tuan.png',
        number:3875,
      },
      {
        type:'砍价',
        title:'和风民宿旅馆情侣房一晚',
        url:'//file.yinxinlife.com/images/icon_cut.png',
        number:1888,
      },
      {
        type:'体验',
        title:'和风民宿旅馆家庭套房一晚',
        url:'//file.yinxinlife.com/images/icon_tiyan.png',
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
      { cover: '//file.yinxinlife.com/images/img_disher_1.png', title:'宋嫂鱼羹'},
      { cover: '//file.yinxinlife.com/images/img_disher_2.png', title:'西湖藕韵'},
      { cover: '//file.yinxinlife.com/images/img_disher_3.png', title:'青菜油豆腐'},
      { cover: '//file.yinxinlife.com/images/img_disher_4.png', title:'珍珠娃娃菜'},
    ],
    filters: {
      id: 0
    },
    activity: [],
    detail: {},
    house: [],
    swiperimage: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      'filters.id': parseInt(options.id)
    })
    this.getHomestayDetail()
    wx.setNavigationBarTitle({ title: '民宿详情' });
  },
  jumpToActivity(e) {
    const dataset = e.currentTarget.dataset
    const {type, id} = dataset
    if(type===0) {
      wx.navigateTo({
        url: `../experienceDetail/experienceDetail?id=${dataset.id}`
      })
    } else if(type===1) {
      wx.navigateTo({
        url: `../lottery/lottery?id=${dataset.id}`
      })
    } else {
      wx.navigateTo({
        url: `../discount/discount?id=${dataset.id}`
      })
    }
  },
  jumpToRoomDetail(e) {
    const dataset = e.currentTarget.dataset
    wx.navigateTo({
      url: `../roomDetail/roomDetail?id=${dataset.id}`
    })
  },
  goToMap: function (e) {
    const dataset = e.currentTarget.dataset
    wx.openLocation({
      latitude: dataset.lat,
      longitude: dataset.long
    })
  },
  makePhoneCall(e) {
    util.callPhone(e)
  },
  jumpToBook(e){
    let dataset = e.currentTarget.dataset
    const {id, tel} = dataset
    wx.navigateTo({
      url: `../team/team?id=${id}&tel=${tel}`,
      success: function(res){
        // success
      }
    })
  },
  getHomestayDetail() {
    var _this = this
    wx.showLoading({
      title: '加载中',
    })
    util._get(Api.getHomestayDetail(), this.data.filters, res => {
      wx.hideLoading()
      wx.stopPullDownRefresh()
      let ex = res.data.data
      ex.detail.atlas.forEach(e => {
      _this.data.swiperimage.push(
        {
          image:e,
          title: ex.detail.name
        })
      });
      ex.detail.create_at = formatDate(ex.detail.create_at * 1000, 'yyyy-MM-dd') 
      const {activity, detail, house} = ex
      _this.setData({
        swiperimage: _this.data.swiperimage,
        activity: activity,
        detail: detail,
        house: house
      })
      
    }, error => {
      wx.hideLoading()
      wx.stopPullDownRefresh()
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