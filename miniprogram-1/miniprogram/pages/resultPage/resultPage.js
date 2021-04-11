// miniprogram/pages/resultPage/resultPage.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wrongList: [],   // 错误的题数
    chooseValue: [], // 选择的答案
    questionList:[], // 题目
    questionCount:0,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    console.log(options);
    let chooseValue = 0;
    let wrongList = 0;
    if (options.wongList != undefined) {
       wrongList = JSON.parse(options.wongList);
    }
    if (options.chooseValue != undefined) {
      chooseValue = JSON.parse(options.chooseValue);
    }
    that.setData({
        questionCount:app.globalData.questionList.length,
        wrongList:wrongList, 
        chooseValue:chooseValue,
        questionList:app.globalData.questionList
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
  toIndex:function(){
    wx.switchTab({
      url: '../index/index',
    })
  },
  /** 
   * 点击查看错题分析
   */
  toView:function(){
    let wrongList = JSON.stringify(this.data.wrongList);
    let chooseValue = JSON.stringify(this.data.chooseValue);
    wx.navigateTo({
      url: '../../pages/wrongQuestionPage/wrongQuestionPage?wongList='+wrongList+'&chooseValue='+chooseValue,
    })
  }
})