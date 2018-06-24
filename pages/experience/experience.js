// pages/experience/experience.js
import util from '../../utils/util.js';
import Api from '../../utils/api.js';
import {formatDate} from '../../utils/date.js';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    swiper: [
      {
        type:'1',
        thumb:'//file.yinxinlife.com/images/bg_scroll_1.png'
      },
      {
        type:'2',
        thumb:'//file.yinxinlife.com/images/bg_scroll_1.png'
      },
      {
        type:'3',
        thumb:'//file.yinxinlife.com/images/bg_scroll_1.png'
      }
    ],
    list: [
      {
        title:'灵隐景区和风民宿旅馆家庭套房试睡体验一晚',
        cover:'//file.yinxinlife.com/images/img_item_1.png',
        type:1,
        start_time:'2018年5月11日'
      },
      {
        title:'杭州四季旅馆金沙餐厅家庭掏槽试吃一份',
        cover:'//file.yinxinlife.com/images/img_item_2.png',
        type:2,
        start_time:'2018年5月11日'
      },
      {
        title:'春晓路地铁口康康谷loft日式简约精品公寓试睡一晚',
        cover:'//file.yinxinlife.com/images/img_item_3.png',
        type:1,
        start_time:'2018年5月11日'
      },
      {
        title:'沐山而居，这家专治夏日高温的民宿等你来体验',
        cover:'//file.yinxinlife.com/images/img_item_4.png',
        type:2,
        start_time:'2018年5月11日'
      },
      {
        title:'灵隐景区和风民宿旅馆家庭套房试睡体验一晚',
        cover:'//file.yinxinlife.com/images/img_item_1.png',
        type:1,
        start_time:'2018年5月11日'
      },
    ],
    curentImg: 0,
    filters: {
      page: 1,
      pageSize: 10
    },
    isLoadAll: false
  },

  getExperienceList(isFirst=true) {
    var _this = this
    wx.showLoading({
      title: '加载中',
    })
    util._get(Api.getExperienceHome(), this.data.filters, res => {
      wx.hideLoading()
      wx.stopPullDownRefresh()
      let ex = res.data.data
      ex.list.forEach(val=>{
        val.starttime = formatDate(val.starttime*1000, 'yyyy-MM-dd') 
        val.endtime = formatDate(val.endtime*1000, 'yyyy-MM-dd')
      })
      const {list, swiper} = ex
      if (list.length < _this.data.filters.pageSize) {
        _this.setData({
          isLoadAll: true
        });
      }
      if (isFirst) {
        _this.setData({
          swiper: swiper,
          list: list,
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
      console.log()
    })
  },

  jumpToBe(e) {
    var _this = this
    let tp = e.currentTarget.dataset.type
    if (tp===2) {
      wx.navigateTo({
        url: '../experienceDetail/experienceDetail'
      })
    } else{
      wx.navigateTo({
        url: '../apply/apply'
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getExperienceList()
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
      _this.getExperienceList(false);
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})