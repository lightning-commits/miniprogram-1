// miniprogram/pages/sharePage/sharePage.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imagePath:"",
    canvasWidth:0,
    canvasHeight:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAccessToken();
    this.systemInfo();
    this.createNewImg();
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

  },
  /**
   * 生成二维码
   */
  createNewImg: function (width,height,systemWidth) {
          let that = this;
          // 创建画布
          let ctx = wx.createCanvasContext('mycanvas',that);
          var path = "../../images/shareDown.jpg";
          // 填充背景
          ctx.drawImage(path,10 , 20, that.data.canvasWidth,that.data.canvasHeight);
          ctx.draw();
          // 绘制二维码
          setTimeout(function () {
            wx.canvasToTempFilePath({
              canvasId: 'mycanvas',
              success: function (res) {
                var tempFilePath = res.tempFilePath;
                that.setData({
                  imagePath: tempFilePath
                });
              },
              fail: function (res) {
                console.log(res);
              }
            });
          }, 200);
      },
    /**
   * 获取系统的宽高
   */
  systemInfo:function() {
    var that = this;
    wx.getSystemInfo({
      success: (result) => {
        that.setData({
          canvasHeight:result.windowHeight - 200,
          canvasWidth:result.windowWidth - 56
        })
      },
    })
  },
  /**
   * 获取access_token得到二维码
   */
  getAccessToken:function() {
    wx.request({
      url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid='+getApp().globalData.appid+'&secret='+getApp().globalData.secret,
      method:'GET',
      success:function(res) {
        if (res.data.access_token != null) {
          wx.request({
            url: app.globalData.path+'code',
            method:"POST",
            dataType:"json",
            data:{accessToken:res.data.access_token},
            header:{
              'content-type': 'application/x-www-form-urlencoded',
              'Authorization':wx.getStorageSync('token')
            },
            success:function(res) {
              // todo 这里还需要上线之后的一个路径
            }
          })
        }
      }
    })
  }

})