// miniprogram/pages/videoPage/videoPage.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      videoUrl : "",
      downVideoList : []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 加载视频
    this.setDataVideoUrl(options.id);
    // 加载下方列表
    this.downVideo();
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
  setDataVideoUrl:function(id) {
      var that = this;
      wx.request({
        url: app.globalData.path+'findOneVideo',
        data:{id:id},
        dataType:"json",
        method:"POST",
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        success:function(res) {
          that.setData({
            videoUrl:res.data.data.videoUrl
          })
        }
      })  
  },
  // 查询下方视频资料
  downVideo:function () {
    var that = this;
    wx.request({
      url: app.globalData.path+'findAllVideo',
      data:{},
      dataType:"json",
      method:"POST",
      header:{
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization':wx.getStorageSync('token')
      },
      success:function(res) {
         that.setData({
           downVideoList:res.data.data
         })
      }
    })
},
onclickVideo:function(option){
    wx.redirectTo({
      url: '../../pages/videoPage/videoPage?id='+option.currentTarget.dataset.id,
    })
  }
})