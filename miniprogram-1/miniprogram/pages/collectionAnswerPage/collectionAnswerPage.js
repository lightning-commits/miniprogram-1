// miniprogram/pages/answer/answer.js
//触屏开始点坐标
const app = getApp();
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
Page({

  /**
   * 页面的初始数据
   */
  data: {
      index:0,
      // 题目集合
      questionList:[],
      // 保存用户答案 // 选择的答案序列
      chooseValue:[],
      // 数组大小
      questionSize:0,
      // 错误的题目集合
      wrongList:[],
      nullHouse:true,
      collectionUrl:'../../images/in_collection.png',
      checked:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
      // 加载题目
      this.collectionMySelfList(options.chapterId,options.examinationSite);
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
    var that = this;
    let name = that.data.questionList[that.data.index].ctlIntelligencePractice.examinationSite;
    return {
      title:name,
      desc:name,
      path:""
    }
  },
  /**
   * 加载收藏题目
   */
  collectionMySelfList:function(id,name){
    var that = this;
    wx.request({
      url: app.globalData.path+'collectionMySelfList',
      dataType:"json",
      data:{chapterId:(id==undefined?'':id),examinationSite:(name==undefined?'':name)},
      method:"POST",
      header:{
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization':wx.getStorageSync('token')
      },
      success:function(res){
          that.setData({
            questionList:res.data.data,
            questionSize:res.data.data.length
          })  
      }
    })
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
  radioChange:function (e) {
    var that = this;
    console.log('radio发成change时间 ，携带value值为',e.detail.value)
    that.data.chooseValue[this.data.index] = e.detail.value
    console.log(this.data.chooseValue)
    // 触发完之后判断对错
    that.chooseError();
  },
  checkboxChange:function(e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    this.data.chooseValue[this.data.index] = e.detail.value.sort();
    console.log(this.data.chooseValue);
  },
  chooseError:function () {
    var tureValue = this.data.questionList[this.data.index]['trueAnswer']
    var chooseVal = this.data.chooseValue[this.data.index];
    console.log(' 选择了 '+chooseVal+ ' 答案是 '+chooseVal);
    if(chooseVal.toString() != tureValue.toString()) {
      // this.data.wrongList.push(this.data.index);
      this.setData({
        wrongList:this.data.index,
        chooseValue:this.data.chooseValue
      })
    }
  },
  record:function(){
    var that = this;
    if ((that.data.index+1 + 1) <= that.data.questionSize) {
      // 滑动初始化值
      that.setData({
        index: that.data.index + 1,
        chooseValue:[],
        wrongList:[]
      })
    } else {
        wx.navigateTo({
          url: '../../pages/collectionAnswerOverPage/collectionAnswerOverPage',
        })
    }
    // 修改收藏图标
    this.loadCollection();
  },
  loadCollection:function(){
      // 获取当前的题目ID
      var that = this;
      var id = that.data.questionList[that.data.index].ctlIntelligencePractice.id;
      wx.request({
        url: app.globalData.path+'queryCollectionById',
        method:"POST",
        data:{id:id},
        dataType:"json",
        header:{
          'content-type': 'application/x-www-form-urlencoded',
          'Authorization':wx.getStorageSync('token')
        },
        success:function(res) {
            let url = '';
            if (res.data.data == null) {
              url = 'no_collection.png'
            } else {
              url = 'in_collection.png'
            }
            that.setData({
              collectionUrl:'../../images/'+url
            })
        }

      })
  },
  /**
   * 点击收藏
   * @param {id} e 
   */
  clickCollection:function(e){
    var that = this;
    var id = that.data.questionList[that.data.index].ctlIntelligencePractice.id;
    wx.request({
      url: app.globalData.path+'addConnection',
      dataType:'json',
      data:{id:id},
      method:"POST",
      header:{
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization':wx.getStorageSync('token')
      },
      success:function(res) {
        let title = '收藏成功';
        let url = 'in_collection.png';
        if (res.data.data == '删除成功') {
          title = '取消收藏'
          url = 'no_collection.png'
        }
          wx.showToast({
            title: title,
            icon:'success',
            duration:1500
          })
          that.setData({
            collectionUrl:'../../images/'+url
          })
      }
    })
  },
  shareClick:function() {
    this.onShareAppMessage();
  }

})