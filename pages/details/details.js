// pages/details/details.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 自定义顶部导航栏
    nvabarData:{
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: '我的附近', //导航栏 中间的标题
    },
    // 此页面 页面内容距最顶部的距离
    height: app.globalData.height * 2 + 20, 

    list:[],
    
  },
  goToNext2: function () {
    wx.navigateTo({
      url: '/pages/detail_one/detail_one',
    })
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.detailslist();
  },
  detailslist() {
    // 指定各个服务的默认环境，配置数据库 API 默认环境
    var that = this;
    wx.showLoading({
      title: '正在加载中...',
    });
    wx.cloud.init({ env: 'wx-sever-p12r2' });
    this.db = wx.cloud.database('xiaozhu_detail')
    this.db.collection('xiaozhu_detail').get({
      success: res => {
        // console.log(res)
        if (res.data[0].list[2].data != null) {
          that.setData({
            list: res.data[0].list[2].data
          });
          // console.log(that.data.list);
          console.log("成功了");
        } else {
          console.log("setdata里的值为空");
        }
      }
    })
    wx.hideLoading();
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