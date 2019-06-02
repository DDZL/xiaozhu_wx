// commpents/navbar/navbar.js
const app=getApp()
Component({
  properties: {
    navbarData: {   //navbarData   由父页面传递的数据，变量名字自命名
      type: Object,
      value: {},
      observer: function (newVal, oldVal) { }
    }
  },
  data: {
    section: [
      { name: '今晚特价', id: '1001' },
      { name: '速订', id: '1032' },
      { name: '先住后付', id: '1003' },
      { name: '特价', id: '1004' },
      { name: '优品', id: '1005' },
      { name: '实拍', id: '1020' },
      { name: '乡村美宿', id: '1023' },
      { name: '差旅首选', id: '1021' },
      { name: '验真', id: '1024' },
      { name: '长租优惠', id: '1025' },
      { name: '免押金', id: '1026' },
      { name: '超棒新房', id: '1027' },
      { name: '智能门锁', id: '1028' },
    ],
    top: [
      { name: '05.18-05.19', img: "/pages/img/bottom.png", id: '101' },
      { name: '位置区域', img: "/pages/img/bottom.png", id: '102' },
      { name: '更多筛选', img: "/pages/img/bottom.png", id: '103' },
      { name: '推荐排序', img: "/pages/img/bottom.png", id: '104' },
    ],
    // 自定义顶部导航栏
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: '我的附近', //导航栏 中间的标题
    },
    // 此页面 页面内容距最顶部的距离
    height: app.globalData.height * 2 + 20, 
    height: "",
    //默认值  默认显示左上角
    navbarData: {
      showCapsule: 1
    }
  },
  
  
  attached: function () {
    // 获取是否是通过分享进入的小程序
    this.setData({
      share: app.globalData.share
    })
    // 定义导航栏的高度   方便对齐
    this.setData({
      height: app.globalData.height
    })
  },
  methods: {
    // 返回上一页面
    _navback() {
      wx.switchTab({
        url: '../../pages/index/index',
      })
    },
    //返回到首页
    _backhome() {
      wx.switchTab({
        url: '../../pages/index/index',
      })
    }
  }
}) 