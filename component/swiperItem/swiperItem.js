// component/swiper/swiper.js
import util from '../../utils/util.js';
import Api from '../../utils/api.js';
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    swiperimage: {
      type: Array,
      value: []
    },
    isShowDots: {
      type: Boolean,
      value: false
    },
    isShowTitle: {
      type: Boolean,
      value: false
    },
    isShowShare: {
      type: Boolean,
      value: false
    },
    isShowPage: {
      type: Boolean,
      value: false
    },
    isShowRedTag: {
      type: Boolean,
      value: false
    },
    isShowCenterTitle: {
      type: Boolean,
      value: false
    },
    isAutoPlay: {
      type: Boolean,
      value: true
    },
    tagName: {
      type: String,
      value: '试睡体验'
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    interval: 3000,
    duration: 1500,
    isLoadAll: false,
    curentImg: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    jumpToDetail(e) {
      const dataset = e.currentTarget.dataset
      if(Object.keys(dataset).length!==0) {
        const {link, wxa_link, id} = dataset
        if (wxa_link!=='') {
          if (util.isTabBar(wxa_link)) {
            wx.switchTab({
                url: wxa_link
            })
          } else {
            wx.navigateTo({
                url: wxa_link
            })
          }
        } else {
          return
        }
      }
    }
  }
})
