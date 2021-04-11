// miniprogram/pages/updateInfoPage/updateInfoPage.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      wechatNumber:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.queryWechatNumber();
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
  formSubmit:function(e) {
    let that = this;
    let info = e.detail.value;
    wx.request({
      url: app.globalData.path+'updateUserById',
      data:{wechatNumber:info.wechatNumber},
      dataType:"json",
      method:"POST",
      header:{
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization':wx.getStorageSync('token')
      },
      success:function(res) {
          if (res.data.code == 0) {
            wx.showToast({
              title: '修改成功',
              icon:'success',
              duration:2000,
              success:function(){
                setTimeout(function(){
                  wx.navigateBack({
                    delta: 1,
                  })
                },2000)
              }
            })
          } else {
            wx.showToast({
              title: '修改失败',
              icon:"none"
            },2000)
          }
      }
    })
  },
  /**
   * 查询当前设备号
   */
  queryWechatNumber:function(){
      let that = this;
      wx.request({
        url: app.globalData.path+'findUserInfoById',
        dataType:"json",
        method:"POST",
        header:{
          'content-type': 'application/x-www-form-urlencoded',
          'Authorization':wx.getStorageSync('token')
        },
        success:function(res) {
          let data = res.data.data;
          that.setData({
            wechatNumber:data.wechatNumber
          })
        }
      })
  }
})