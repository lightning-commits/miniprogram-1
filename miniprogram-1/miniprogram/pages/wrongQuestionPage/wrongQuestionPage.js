// miniprogram/pages/wrongQuestionPage/wrongQuestionPage.js
//触屏开始点坐标
var startDot = {
  X: 0,
  Y: 0
};
//触屏到点坐标
var touchDot = {
  X: 0,
  Y: 0
};
var time = 0;  //触屏时间
var number;     //定时器ID
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
    index:0,
    questionSize:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    debugger;
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
        questionList:app.globalData.questionList,
        questionSize:wrongList.length
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
   /**
   * 触屏开始计时和获取坐标
   */
  touchstart: function (event) {
    startDot.X = event.touches[0].pageX;
    startDot.Y = event.touches[0].pageY;
    number = setInterval(function () { time++; }, 100);
  },
   /**
   * 判断滑动距离和时间是否需要切换页面
   */
  touchmove: function (event) {
    var that = this;
    touchDot.X = event.touches[0].pageX;
    touchDot.Y = event.touches[0].pageY;
    //向左滑处理
    if ((startDot.X - touchDot.X) > 200 && (startDot.Y - touchDot.Y) < 150 && time < 5 && time > 0.1) {
      that.record();
      clearInterval(number);
      time = 0;
    }
    //向右滑处理 先屏蔽代码不能切回去
    // if ((touchDot.X - startDot.X) > 200 && (touchDot.Y - startDot.Y) < 150 && time < 5 && time > 0.1) {
    //   if ((that.data.index - 1) >= 0) {
    //     that.setData({
    //       index: that.data.index - 1
    //     })
    //   }
    //   clearInterval(number);
    //   time = 0;
    // }
  },
  /**
   * 结束触屏重置计时
   */
  touchend: function (event) {
    clearInterval(number);
    time = 0;
  },
  record:function(){
    var that = this;
    if ((that.data.index+1 + 1) <= that.data.questionSize) {
      that.setData({
        index: that.data.index + 1
      })
    }
  }

})