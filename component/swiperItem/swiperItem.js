// component/swiper/swiper.js
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
  },

  /**
   * 组件的初始数据
   */
  data: {
    autoplay: true,
    interval: 3000,
    duration: 1500,
    isLoadAll: false,
    curentImg: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
