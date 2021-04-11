// miniprogram/pages/swichSubject/swichSubject.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      majorName:"",
      majorIcon:"",
      publicList:[],
      majorList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.onLoadIcon();
      this.onLoadPOM();
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
   * 加载公共科目和专业科目数据
   */
  onLoadPOM:function(){
    let that = this;
    wx.request({
      url: app.globalData.path+'publicOrMajorList',
      method:"POST",
      header:{
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization':wx.getStorageSync('token')
      },
      success:function(res) {
        let data = res.data.data;
        that.setData({
          publicList:data.plist,
          majorList:data.mlist,
          majorName:app.globalData.majorName
        })
      }
    })
  },
  /**
   * 切换科目
   */
  swichSubject:function(e){
      wx.request({
        url: app.globalData.path+'updateUserInfoById',
        data:{majorId:app.globalData.majorId,subjectId:e.currentTarget.dataset.id},
        dataType:"json",
        method:"POST",
        header:{
          'content-type': 'application/x-www-form-urlencoded',
          'Authorization':wx.getStorageSync('token')
        },
        success:function(res) {
            if (res.data.code == 0) {
              wx.switchTab({
                url: '../../pages/index/index',
                success(){
                  let page = getCurrentPages().pop();
                  if (page == undefined || page == null) {
                    return;
                  }
                  page.onLoad();
                }
              })
            }
        }
      })
  },
  swichMajor:function(){
    wx.navigateTo({
      url: '../../pages/choicePage/choicePage',
    })
  },
  /**
   * 加载图标
   */
  onLoadIcon:function(){
      let that = this;
      wx.request({
        url: app.globalData.path+'findMajorById',
        dataType:"json",
        data:{id:app.globalData.majorId},
        method:"POST",
        header:{
          'content-type': 'application/x-www-form-urlencoded',
          'Authorization':wx.getStorageSync('token')
        },
        success:function(res) {
          that.setData({
            majorIcon:res.data.data.urlIoc
          })
        }
      })
  }
})