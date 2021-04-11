// miniprogram/pages/signUpPage/signUpPage.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      majorInfo:[],
      signUpInfo:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.queryUserSignUpInfo();
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
  findMajorId:function() {
    var that = this;
    wx.request({
      url: app.globalData.path+'findMajorById',
      dataType:"json",
      data:{},
      method:"POST",
      header:{
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization':wx.getStorageSync('token')
      },
      success:function(res) {
          let data = res.data.data;
          that.setData({
            majorInfo:data
          })
      }
    })
  },
  formSubmit(e) {
    let that = this;
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    let info = e.detail.value;
    wx.request({
      url: app.globalData.path+'addSignUpInfo',
      data:{majorName:info.majorName,signUpName:info.name,idCradNum:info.idCradNum,address:info.address,nation:info.nation,money:info.money,phone:info.phone},
      dataType:"json",
      method:"POST",
      header:{
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization':wx.getStorageSync('token')
      },
      success:function(res) {
          if (res.data.code == 0) {
            wx.showToast({
              title: res.data.data,
              icon:'success',
              duration:2000
            })
            that.onLoad();
          }
      }
    })
  },
  queryUserSignUpInfo:function(){
      var that = this;
      wx.request({
        url: app.globalData.path+'queryUserSignUpInfo',
        dataType:"json",
        method:"POST",
        header:{
          'content-type': 'application/x-www-form-urlencoded',
          'Authorization':wx.getStorageSync('token')
        },
        success:function(res) {
          let data = res.data.data;
          if (data == null) {
            that.findMajorId();
          } else {
            that.setData({
              signUpInfo:data
            })
          }
        }
      })
  }
})