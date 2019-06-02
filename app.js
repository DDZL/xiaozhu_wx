//app.js
App({
  onLaunch: function (options) {
    // 判断是否由分享进入小程序
    if (options.scene == 1007 || options.scene == 1008) {
      this.globalData.share = true
    } else {
      this.globalData.share = false
    };
    wx.getSystemInfo({
      success: (res) => {
        this.globalData.height = res.statusBarHeight
      }
    });
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    //登录获得openid
    var that = this;
    wx.cloud.init({ env: 'wx-sever-p12r2' });
    // wx.cloud.callFunction({
      
    //   name:"add",
    //   data:{},
    //   success:res=>{
    //     console.log('[云函数][add]user openid:',res.result.openid)
    //     that.globalData.openid=res.result.openid
    //   }
    // })
    wx.cloud.callFunction({
      name: 'add',
      complete: res => {
        console.log('callFunction add result: ', res)
      }
    })
  },
  globalData: {
    share:false,  // 分享默认为false
    height:0,
    userInfo: null,
    baseUrl:"http://127.0.0.1:3000/",
    subDomain: "675dc53b0daa5483584dc7a7bbe6dd53", // 如果你的域名是： https://api.it120.cc/abcd 那么这里只要填写 abcd
    version: "1.0.0",
    shareProfile: '测试', // 首页转发的时候话术
    list:{}
  }
})