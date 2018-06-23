// pages/suji/suji.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sortObj: [
      {
        title: '距离',
        type:'distant',
        isPositive: false
      },
      {
        title: '价格',
        type:'price',
        isPositive: false
      },
      {
        title: '类型',
        type:'category',
        isPositive: false
      },
    ],
    sujiList:[
      {
        price: '588',
        cover: '//file.yinxinlife.com/images/bg_suji_item.png',
        title: '和风民宿，西湖边的四合院',
        tags: [
          '四星酒店', '招募体验', '拼团', '促销', '断桥','宝石山','西湖','优惠疯抢'
        ],
        locationName:'杨公堤27号',
        distance:'27'
      },
      {
        price: '588',
        cover: '//file.yinxinlife.com/images/bg_suji_item.png',
        title: '和风民宿，西湖边的四合院',
        tags: [
          '四星酒店', '招募体验', '拼团', '促销', '断桥','宝石山','西湖','优惠疯抢'
        ],
        locationName:'杨公堤27号',
        distance:'27'
      },
      {
        price: '588',
        cover: '//file.yinxinlife.com/images/bg_suji_item.png',
        title: '和风民宿，西湖边的四合院',
        tags: [
          '四星酒店', '招募体验', '拼团', '促销', '断桥','宝石山','西湖','优惠疯抢'
        ],
        locationName:'杨公堤27号',
        distance:'27'
      },
      {
        price: '588',
        cover: '//file.yinxinlife.com/images/bg_suji_item.png',
        title: '和风民宿，西湖边的四合院',
        tags: [
          '四星酒店', '招募体验', '拼团', '促销', '断桥','宝石山','西湖','优惠疯抢'
        ],
        locationName:'杨公堤27号',
        distance:'27'
      },
      {
        price: '588',
        cover: '//file.yinxinlife.com/images/bg_suji_item.png',
        title: '和风民宿，西湖边的四合院',
        tags: [
          '四星酒店', '招募体验', '拼团', '促销', '断桥','宝石山','西湖','优惠疯抢'
        ],
        locationName:'杨公堤27号',
        distance:'27'
      },
    ],
    sortDetail:[
      {
        id:1,
        title:'热门景点'
      },{
        id:2,
        title:'四星酒店'
      },{
        id:3,
        title:'招募体验'
      },{
        id:4,
        title:'拼团'
      }, {
        id: 5,
        title:'促销'
      },{
        id:6,
        title:'断桥'
      },{
        id:7,
        title:'宝石山'
      }, {
        id: 8,
        title: '西湖'
      },{
        id:9,
        title: '优惠疯抢'
      }
    ],
    isShowSortCard:false
  },
  showSelect(){
    this.setData({
      isShowSortCard:!this.data.isShowSortCard
    })
  },
  tapToSort(e){
    let _this = this
    let tar = e.currentTarget.dataset.type
    _this.setData({
      sortObj:_this.data.sortObj.map((v)=>{
        v.isPositive = v.type === tar
        return v
      })
    })
  },
  tapToSelect(e) {
    let _this = this
    let id = e.currentTarget.dataset.id
    _this.setData({
      sortDetail:_this.data.sortDetail.map(v => {
        v.isSelected = v.id === id
          ? !v.isSelected
          : v.isSelected
        return v
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this
    _this.setData({
      sortDetail:_this.data.sortDetail.map(v => {
        v.isSelected = false
        return v
      })
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