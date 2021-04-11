// pages/class/class.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    classfiySelect: 1,
    rigId:1,
    scrollTop:1,
    leftText: [],
    rightData: [],
    height:0
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 初始化类目
    this.onLoadCategory();
    // 初始化类目和专业
    this.onLoadCategoryOrMajor();
    // this.setData({
    //   classfiySelect: this.data.leftText[0].id
    // })
  },
 
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
 
  },
 
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
 
  },
 
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
 
  },
 
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
 
  },
 
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
 
  },
 
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
 
  },
 
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
 
  },
  //滚动触发
  scroll: function(e) {
    var scrollTop = e.detail.scrollTop,
      h = 0,
      classfiySelect;
    var that = this;
    that.data.leftText.forEach(function(clssfiy, i) {
      var _h =26 + that.length(clssfiy['id'])*102;
      if (scrollTop >= h){
        classfiySelect = clssfiy['id'];
      }
      h +=_h;
      console.log(h);
    })
    that.setData({
      classfiySelect: classfiySelect,
    })
  },
  //求每一栏高度
  length: function(e) {
    var that = this;
    var rightData = that.data.rightData;
    for (var i = 0; i < rightData.length; i++) {
      if(rightData[i]['id']==e){
        return rightData[i]['majorList'].length;
      }
    }
  },
  //点击左边事件
  left_list: function(e) {
    var that = this;
    var l_id = e.currentTarget.dataset.id;
    that.setData({
      rigId: l_id,
      classfiySelect:l_id
    })
  },
  //右边点击事件
  right_list:function(e){
    var that = this;
    wx.request({
      url: app.globalData.path+'switchSubSaveUserInfo',
      dataType:"json",
      data:{majorId:e.currentTarget.dataset.id},
      method:"POST",
      header:{
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization':wx.getStorageSync('token')
      },
      success:function(res) {
        if (res.data.code == -1) {
          wx.showToast({
            title: res.data.msg,
            icon:'none'
          },2000)
        } else {
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
  //查询当前系统中的专业
  onLoadCategory:function(){
    var that = this;
    wx.request({
      url: app.globalData.path+'findCtlCategory',
      dataType:"json",
      data:{},
      method:"POST",
      success:function(res) {
        that.setData({
          leftText:res.data.data
        })
      }
    })
  },
    onLoadCategoryOrMajor:function(){
      var that = this;
      wx.request({
        url: app.globalData.path+'categoryAllMajor',
        dataType:"json",
        data:{},
        method:"POST",
        success:function(res) {
          that.setData({
            rightData:res.data.data,
            height:wx.getSystemInfoSync().windowHeight
          })
        }
      })
    }
})