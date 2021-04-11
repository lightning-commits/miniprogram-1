// miniprogram/pages/userCenter/userCenter.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName:"",
    majorName:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      let that = this;
      that.setData({
        nickName:app.globalData.nickName,
        majorName:app.globalData.majorName
      })
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
  userInfo:function(e){
    if (e.detail.userInfo) {
      let userInfo = e.detail.userInfo;
      // 保存用户的基本信息
      wx.request({
        url: app.globalData.path+'updateUserById',
        data:{wechatName:userInfo.nickName,gender:userInfo.gender,city:userInfo.city,province:userInfo.province,avatarUrl:userInfo.avatarUrl,country:userInfo.country},
        dataType:"json",
        method:"POST",
        header:{
          'content-type': 'application/x-www-form-urlencoded',
          'Authorization':wx.getStorageSync('token')
        },
        success:function(res){
            console.log("保存成功")
        }
      })
      wx.navigateTo({
            url: '../../pages/teamPage/teamPage',
      })
    } 
  },
  /**
   * 分享赚钱
   */
  shareMoney:function(){
    wx.navigateTo({
      url: '../../pages/sharePage/sharePage',
    })
  },
  
  /**
   * 去收藏
   */
  collection:function(){
    wx.navigateTo({
      url: '../../pages/collectionPage/collectionPage',
    })
  },
  siwchSubject:function(){
    wx.navigateTo({
      url: '../../pages/swichSubject/swichSubject',
    })
  },
  updateInfo:function(){
    wx.navigateTo({
      url: '../../pages/updateInfoPage/updateInfoPage',
    })
  },
  about:function(){
    wx.navigateTo({
      url: '../../pages/aboutPage/aboutPage',
    })
  }
})