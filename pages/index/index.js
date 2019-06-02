//index.js
//获取应用实例
const app = getApp()

var QQMapWX = require('../../qqmap-wx-jssdk.js');
var qqmapsdk;
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indexlist: [],
    // 自定义顶部导航栏
    nvabarData: {
      showCapsule: 0, //是否显示左上角图标   1表示显示    0表示不显示
      title: '小猪短租', //导航栏 中间的标题
    },
    // 此页面 页面内容距最顶部的距离
    height: app.globalData.height * 2 + 20, 

    province: '',
    city: '',
    latitude: '',
    longitude: '',
    list: [],
  },
  goToNext1:function(){
    wx.navigateTo({
      url: '/pages/details/details',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.indeximg()

    //自定义时间1 调用函数时，传入new Date()参数，返回值是日期和时间  
    var time1 = util.formatTime_o(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据  
    this.setData({
      time1: time1
    }); 
    //自定义时间2 调用函数时，传入new Date()参数，返回值是日期和时间  
    var time2 = util.formatTime_t(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据  
    this.setData({
      time2: time2
    });  
    
    // this.loadMore();
    qqmapsdk = new QQMapWX({
      key: 'L4XBZ-3OJKX-ITN4G-T6UES-S4FOH-ZNBEX' //key秘钥进行填充
    });
  },

  indeximg(){
    // 指定各个服务的默认环境，配置数据库 API 默认环境
    var that = this;
    wx.showLoading({
      title: '正在加载中...',
    });
    wx.cloud.init({ env: 'wx-sever-p12r2' });
    this.db = wx.cloud.database('xiaozhu_p')
    this.db.collection('xiaozhu_p').get({
      success: res => {
        console.log(res)
        // that.setData({
        //   indexlist:res.data[0].data
        // })
        if (res.data[0].list[2].data != null) {
          that.setData({
            list: res.data[0].list[2].data
          });
          console.log(that.data.list);
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
    let vm = this;
    vm.getUserLocation();
  },
  getUserLocation: function () {
    let vm = this;
    wx.getSetting({
      success: (res) => {
        // res.authSetting['scope.userLocation'] == undefined    表示 初始化进入该页面
        // res.authSetting['scope.userLocation'] == false    表示 非初始化进入该页面,且未授权
        // res.authSetting['scope.userLocation'] == true    表示 地理位置授权
        if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
          wx.showModal({
            title: '请求授权当前位置',
            content: '需要获取您的地理位置，请确认授权',
            success: function (res) {
              if (res.cancel) {
                wx.showToast({
                  title: '拒绝授权',
                  icon: 'none',
                  duration: 1000
                })
              } else if (res.confirm) {
                wx.openSetting({
                  success: function (dataAu) {
                    if (dataAu.authSetting["scope.userLocation"] == true) {
                      wx.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 1000
                      })
                      //再次授权，调用wx.getLocation的API
                      vm.getLocation();
                    } else {
                      wx.showToast({
                        title: '授权失败',
                        icon: 'none',
                        duration: 1000
                      })
                    }
                  }
                })
              }
            }
          })
        } else if (res.authSetting['scope.userLocation'] == undefined) {
          //调用wx.getLocation的API
          vm.getLocation();
        }
        else {
          //调用wx.getLocation的API
          vm.getLocation();
        }
      }
    })
  },
  // 微信获得经纬度
  getLocation: function () {
    let vm = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy;
        vm.getLocal(latitude, longitude)
      },
      fail: function (res) {
        console.log('fail' + JSON.stringify(res))
      }
    })
  },
  // 获取当前地理位置
  getLocal: function (latitude, longitude) {
    let vm = this;
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: latitude,
        longitude: longitude
      },
      success: function (res) {
        let province = res.result.ad_info.province
        let city = res.result.ad_info.city
        vm.setData({
          province: province,
          city: city,
          latitude: latitude,
          longitude: longitude
        })

      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        // console.log(res);
      }
    });
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