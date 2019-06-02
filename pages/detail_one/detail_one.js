// pages/detail_one/detail_one.js
const app=getApp();
var QQMapWX = require('../../qqmap-wx-jssdk.js');
var demo;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 地图
    longitude: 116.4965075,
    latitude: 40.006103,
    speed: 0,
    accuracy: 0,

    currentData: 0,
    chooseSize: false,
    animationData: {},
    list:[],

    // 自定义顶部导航栏
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: '', //导航栏 中间的标题
    },
    // 此页面 页面内容距最顶部的距离
    height: app.globalData.height * 2 + 20, 
  },
  //事件处理函数--地图组件
  bindViewTap: function () {

  },
  //选项卡-获取当前滑块的index
  bindchange: function (e) {
    const that = this;
    that.setData({
      currentData: e.detail.current
    });
  },
  // 选项卡-点击切换，滑块index赋值
  checkCurrent: function (e) {
    const that = this;
    if (that.data.currentData === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentData: e.target.dataset.current
      })
    }
  },
  // 优惠弹窗组件
  chooseSezi: function (e) {
    // 用that取代this，防止不必要的情况发生
    var that = this;
    // 创建一个动画实例
    var animation = wx.createAnimation({
      // 动画持续时间
      duration: 200,
      // 定义动画效果，当前是匀速
      timingFunction: 'linear'
    })
    // 将该变量赋值给当前动画
    that.animation = animation
    // 先在y轴偏移，然后用step()完成一个动画
    animation.translateY(200).step()
    // 用setData改变当前动画
    that.setData({
      // 通过export()方法导出数据
      animationData: animation.export(),
      // 改变view里面的Wx：if
      chooseSize: true
    })
    // 设置setTimeout来改变y轴偏移量，实现有感觉的滑动
    setTimeout(function () {
      animation.translateY(0).step()
      that.setData({
        animationData: animation.export()
      })
    }, 100)
  },
  // 优惠信息隐藏弹窗
  hideModal: function (e) {
    var that = this;
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'linear'
    })
    that.animation = animation
    animation.translateY(200).step()
    that.setData({
      animationData: animation.export(),
      chooseSize: false
    })
    setTimeout(function () {
      animation.translateY(0).step()
      that.setData({
        animationData: animation.export(),
      })
    }, 100)
  },
  // 退订须知
  know:function(){
    wx.navigateTo({
      url: '/pages/know/know',
    })
  },
  // 查看全部描述
  describe:function(){
    wx.navigateTo({
      url: '/pages/describe/descride',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.donelist();
    // 地图组件
    demo = new QQMapWX({
        key: 'L4XBZ-3OJKX-ITN4G-T6UES-S4FOH-ZNBEX' //key秘钥进行填充
      });
      var that = this
      wx.showLoading({
        title: "定位中",
        mask: true
      })
      wx.getLocation({
        type: 'gcj02',
        altitude: true,//高精度定位
        //定位成功，更新定位结果
        success: function (res) {
          var latitude = res.latitude
          var longitude = res.longitude
          var speed = res.speed
          var accuracy = res.accuracy
          var address = res.address
          
          demo.reverseGeocoder({
            location: {
              latitude: res.latitude,
              longitude: res.longitude,
            },
            success: function (res) {
              console.log(res.result);
            },
            fail: function (res) {
              console.log(res);
            },
            complete: function (res) {
              console.log(res);
            }
          })
          that.setData({
            longitude: longitude,
            latitude: latitude,
            speed: speed,
            accuracy: accuracy
          })
          
        },
        //定位失败回调
        fail: function (res) {
          
          wx.showToast({
            title: "定位失败",
            icon: "none"
          })
        },
        complete: function () {
          //隐藏定位中信息进度
          wx.hideLoading()
        }
      })
    
  },
  donelist(){
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