// miniprogram/pages/collectionPage/collectionPage.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

      collectionCount : 0,
      collectionList:[],
      node:0,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.queryCollectionByUser();
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
  queryCollectionByUser:function(){
      let that = this;
      wx.request({
        url: app.globalData.path+'queryCollectionByUser',
        data:{},
        dataType:'json',
        method:'POST',
        header:{
          'content-type': 'application/x-www-form-urlencoded',
          'Authorization':wx.getStorageSync('token')
        },
        success:function(res) {
            let data = res.data.data;
            let count = 0;
            data.forEach(item => {
              count += item.count;
            });
            that.setData({
                collectionCount:count,
                collectionList:res.data.data
            })
        }
      })
  },
  fatherTreeItem:function(e) {
    var that = this;
    let nodeId = e.currentTarget.dataset.id;
    // 重复点击隐藏
    if (that.data.node == nodeId) {
      nodeId = 0;
    }
    that.setData({
      node:nodeId
    })
  },
  fatherQuery:function(e){
    let that = this;
    let id = e.currentTarget.dataset.id;   
    wx.navigateTo({
      url: '../../pages/collectionAnswerPage/collectionAnswerPage?chapterId='+id,
    })
  },
  childQuery:function(e) {
    let that = this;
    let name = e.currentTarget.dataset.name;
    wx.navigateTo({
      url: '../../pages/collectionAnswerPage/collectionAnswerPage?examinationSite='+name,
    })
  }
})