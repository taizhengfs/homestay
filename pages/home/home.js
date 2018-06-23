// pages/home.js
import util from '../../utils/util.js';
import Api from '../../utils/api.js';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isShowDel: false,
    inputVal: '',
    currentTab: 0,
    swiper: [
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
    today: [
      {
        type: 0, // 0 未开始 1 进行中 2 已结束
        startTime: '10:00',
        endTime: '2018.8:18',
        price: 832,
        realPrice: 0.01,
        participateNum: 0,
        cover:'../../images/home_bg_item_1.png',
        activityDesc:'夏日来袭，隐心民宿首批福利大放送福利大放送福利大放送'
      },
      {
        type: 1, // 0 未开始 1 进行中 2 已结束
        startTime: '2018.5.27',
        endTime: '10:00',
        price: 200,
        realPrice: 0.01,
        participateNum: 100,
        cover:'../../images/home_bg_item_2.png',
        activityDesc:'这个民宿可以说是业界良心了'
      },
      {
        type: 2, // 0 未开始 1 进行中 2 已结束
        startTime: '2018.5.27',
        endTime: '2018.06.1',
        price: 832,
        realPrice: 0.01,
        participateNum: 5671,
        cover:'../../images/home_bg_item_3.png',
        activityDesc:'夏日来袭，隐心民宿首批福利大放送福利大放送福利大放送'
      },
    ]
  },
  getHomeDetail() {
    var _this = this
    util._get(Api.getHomeHome(), {}, res => {
      const {swiper, today, tommorrow} = res.data
      _this.setData({
        today: today,
        tommorrow: tommorrow,
        swiper: swiper
      })
      // _this.setData({
      //   scrollList: res.data.data.list
      // })
      // if (res.data.data.list.length > 0) {
      //   let timer = setInterval(() => {
      //     if (_this.data.scrollLength >= _this.data.scrollList.length-1) {
      //       clearInterval(timer)
      //     }
      //     _this.setData({
      //       showScroll: true
      //     })
      //     _this.startScroll()
      //   }, Api.scrollTime())
      // }
    }, error => {
    })
  },
  // 跳转搜索
  jumpToSearch() {
    console.log('let\'s go search')
  },

  inputTyping(e) {
    var _this = this;
    _this.setData({
      inputVal: e.detail.value,
      isShowDel: !!e.detail.value
    });
  },

  changeTab(e) {
    this.setData({
      currentTab: e.currentTarget.dataset.index
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getHomeDetail()  
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