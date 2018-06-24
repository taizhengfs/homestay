// pages/suji/suji.js
import util from '../../utils/util.js';
import Api from '../../utils/api.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sortObj: [
      {
        title: '距离',
        type:'distance',
        isPositive: false
      },
      {
        title: '价格',
        type:'price',
        isPositive: false
      },
      {
        title: '类型',
        type:'type',
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
    isShowSortCard:false,
    filters: {
      page: 1,
      pageSize: 2,
      keyword: '',
      distance: '',
      price: '',
      tag: '',
      type: ''
    },
    distance: [],
    list: [],
    price: [],
    tags: [],
    type: [],
    currentPane: '',
    isLoadAll:false
  },
  showSelect(){
    this.setData({
      isShowSortCard:!this.data.isShowSortCard
    })
  },
  getKeyword(e) {
    if(e.detail.isClear) {
      this.setData({
        'filters.keyword':e.detail.inputVal
      })
      this.getSujiDetail(false)
    } else {
      if(e.detail.inputVal!=='') {
        this.setData({
          'filters.keyword':e.detail.inputVal
        })
        this.getSujiDetail(false)
      }
    }
  },
  tapToSort(e){
    let _this = this
    let tar = e.currentTarget.dataset.type
    switch(tar) {
      case 'distance':
        _this.setData({
          sortDetail:_this.data.distance
        })
        break;
      case 'price':
        _this.setData({
          sortDetail:_this.data.price
        })
        break;
      case 'tags':
        _this.setData({
          sortDetail:_this.data.tags
        })
        break;
      case 'type':
        _this.setData({
          sortDetail:_this.data.type
        })
        break;
    }
    let isSameTar = tar===_this.data.currentPane
    _this.setData({
      isShowSortCard: isSameTar?!this.data.isShowSortCard:true,
      currentPane: tar,
      sortObj:_this.data.sortObj.map((v)=>{
        if(v.type === tar) {
          v.isPositive = !v.isPositive
        } else {
          v.isPositive = false
        }
        return v
      })
    })
  },
  formateArray(val) {
    let m = []
    for (let i in val) {
      m.push(
        {
          name: val[i],
          isSelected: false,
          id: parseInt(i)
        })
    }
    return m
  },
  formate(val) {
    return val.map(v=>{
      v.isSelected = false
      return v
    })
  },
  getSujiDetail(isFirst=true) {
    var _this = this
    wx.showLoading({
      title: '加载中',
    })
    util._get(Api.getSearchHomestay(), this.data.filters, res => {
      wx.hideLoading()
      wx.stopPullDownRefresh()
      const {distance, list, price, tags, type} = res.data.data
      if (list.length < _this.data.filters.pageSize) {
        _this.setData({
          isLoadAll: true
        });
      }
      if (isFirst) {
        _this.setData({
          distance: _this.formate(distance),
          list: list,
          price: _this.formate(price),
          tags: _this.formateArray(tags),
          type: _this.formate(type)
        })
      } else {
        if(_this.data.filters.page>1) {
          _this.setData({
            list: _this.data.list.concat(list)
          })
        } else {
          _this.setData({
            list: list
          })
        }
      }
      console.log(_this.data.list)
    }, error => {
      wx.hideLoading()
      wx.stopPullDownRefresh()
      console.log()
    })
  },
  sortDistance() {
    let _this = this;
    let distance=_this.data.distance.find(element => {
      return element.isSelected == true
    })
    if(typeof distance !== 'undefined') {
      _this.setData({
        'filters.distance':distance.id
      })
    } else {
      _this.setData({
        'filters.distance':''
      })
    }
  },
  sortPrice() {
    let _this = this;
    let price=_this.data.price.find(element => {
      return element.isSelected == true
    })
    if(typeof price !== 'undefined') {
      _this.setData({
        'filters.price':price.id
      })
    } else {
      _this.setData({
        'filters.price':''
      })
    }
  },
  sortTags() {
    let _this = this;
    let arr =[]
    _this.data.tags.find(element => {
      if(element.isSelected == true) {
        arr.push(element.name)
      }
    })
    _this.setData({
      'filters.tags':arr.join(',')
    })
  },
  sortType() {
    let _this = this;
    let type=_this.data.type.find(element => {
      return element.isSelected == true
    })
    if(typeof type !== 'undefined') {
      _this.setData({
        'filters.type':type.id
      })
    } else {
      _this.setData({
        'filters.type':''
      })
    }
  },
  tapToSelect(e) {
    let _this = this
    let id = e.currentTarget.dataset.id
    _this.setData({
      sortDetail:_this.data.sortDetail.map(v => {
        v.isSelected = v.id === id
          ? !v.isSelected
          : _this.data.currentPane == 'tags'
            ? v.isSelected
            : false
        return v
      })
    })
    _this.setData({
      'filters.page': 1,
      isLoadAll:false
    })
    switch(_this.data.currentPane) {
      case 'distance':
        _this.setData({
          distance:_this.data.sortDetail
        })
        _this.sortDistance()
        break;
      case 'price':
        _this.setData({
          price:_this.data.sortDetail
        })
        _this.sortPrice()
        break;
      case 'tags':
        _this.setData({
          tags:_this.data.sortDetail
        })
        _this.sortTags()
        break;
      case 'type':
        _this.setData({
          type:_this.data.sortDetail
        })
        _this.sortType()
        break;
    }
    this.getSujiDetail(false)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this
    this.getSujiDetail()
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
    var _this = this;
    if (_this.data.isLoadAll == false) {
      _this.setData({
        'filters.page': _this.data.filters.page + 1
      })
      _this.getSujiDetail(false);
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})