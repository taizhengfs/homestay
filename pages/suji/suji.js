// pages/suji/suji.js
import util from '../../utils/util.js';
import Api from '../../utils/api.js';
const app = getApp();
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
    sujiList:[],
    sortDetail:[],
    isShowSortCard:false,
    filters: {
      page: 1,
      pageSize: 10,
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
    isLoadAll:false,
    innerText:'',
    isShowBox:false
  },
  resetFilter(){
    this.setData({
      filters:{
        page: 1,
        pageSize: 10,
        keyword: '',
        distance: '',
        price: '',
        tag: '',
        type: ''
      }
    })
  },
  showSelect(){
    this.setData({
      isShowSortCard:!this.data.isShowSortCard
    })
  },
  getKeyword(e) {
    if(e.detail.isClear) {
      this.setData({
        'filters.page':1,
        'filters.keyword':e.detail.inputVal,
        isLoadAll:false
      })
      this.getSujiDetail(false)
    } else {
      // if(e.detail.inputVal!=='') {
        this.setData({
          'filters.page':1,
          'filters.keyword':e.detail.inputVal,
          isLoadAll:false
        })
        this.getSujiDetail(false)
      // }
    }
  },
  tapToSort(e){
    let _this = this
    let tar = e.currentTarget.dataset.type
    switch(tar) {
      case 'distance':
        if(wx.getStorageSync('ishaspos')===-1) {
          wx.showModal({
            title: '是否授权当前位置',
            content: '需要获取您的地理位置，请确认授权，否则地图功能将无法使用',
            success: function (res) {
              if (res.cancel) {
                console.info("1授权失败返回数据");
 
              } else if (res.confirm) {
                wx.openSetting({
                  success: function (data) {
                    if (data.authSetting["scope.userLocation"] == true) {
                      wx.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 5000
                      })
                      wx.setStorageSync('ishaspos', 1)
                    }else{
                      wx.showToast({
                        title: '授权失败',
                        icon: 'null',
                        duration: 2000
                      })
                      wx.setStorageSync('ishaspos', -1)
                    }
                  }
                })
              }
            }
          })
          return
        }
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
    }, error => {
      wx.hideLoading()
      wx.stopPullDownRefresh()
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

  closeBox() {
    this.setData({
      isShowBox: false
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(' app.globalData.keyword: ',  app.globalData.keyword);
    if(app.globalData.keyword!=='') {
      this.setData(
        {'filters.keyword':app.globalData.keyword}
      )
    }
    let _this = this
    this.getSujiDetail()
    _this.setData({
      sortDetail:_this.data.sortDetail.map(v => {
        v.isSelected = false
        return v
      })
    })
    setTimeout(v=>{
      this.setData({
        isLogin: wx.getStorageSync('isLogin'),
        isShowBox: wx.getStorageSync('isLogin')==0
      })
    },300)
  },
  /**
   * 生命周期函数--监听页面显示
   */
  clearKeyword(){
    this.setData({
      innerText:''
    })
  },
  onShow: function () {
    setTimeout(v=>{
      this.setData({
        isShowBox: wx.getStorageSync('isLogin')===0
      })
    },1000)
    if(app.globalData.isEditFilter) {
      if(app.globalData.keyword!=='') {
        this.resetFilter()
        this.setData(
          {
            innerText:app.globalData.keyword,
            'filters.keyword':app.globalData.keyword
          }
        )
        let _this = this
        this.getSujiDetail()
        _this.setData({
          sortDetail:_this.data.sortDetail.map(v => {
            v.isSelected = false
            return v
          })
        })
      }
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
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
    let _this = this
    // this.resetFilter()
    _this.setData(
      {
        'filters.page': 1,
        isLoadAll:false
      }
    )
    _this.getSujiDetail()
    // _this.setData({
    //   sortDetail:_this.data.sortDetail.map(v => {
    //     v.isSelected = false
    //     return v
    //   })
    // })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let _this = this;
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
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      return {
        title: '隐心民宿列表',
        path: 'pages/suji/suji',
        success: function (res) {
            util._getStat()
        },
        fail:function(res){
        }
      }
    }
    else {
      return {
        title: '隐心民宿列表',
        path: 'pages/suji/suji',
        success: function (res) {
          util._getStat()
        },
        fail:function(res){
        }
      }
    }
  }
})