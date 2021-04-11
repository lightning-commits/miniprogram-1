// miniprogram/pages/index/idnex.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    majorInfo:{},
    imgList:[],
    downImgList:[],
    downVideoList:[],
    indicatorDots:true, // 笑点，根据图的数量自动增加笑点
    autoplay:true, // 是否自动轮播
    interval:3000, // 间隔时间 
    duration:1000, // 滑动时间
    windowwidth:0,
    windowHeigth:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取小程序适配宽高
    this.systemInfo();
    this.wechatLogin();
    // 加载轮播图
    this.bannerImgList(1);
    // 加载下方轮播图
    this.bannerImgList(2);
    // this.onLoadMajorInfo(getApp().majorId);
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
  wechatLogin:function() {
    var that = this;
    wx.login({
      success (res) {
        if (res.code) {
              wx.request({
                url: app.globalData.path+'login',
                data:{code:res.code},
                method:"GET",
                dataType:"json",
                header: { 'content-type': 'application/x-www-form-urlencoded' },
                success:function(option) {
                  var result = option.data.data;
                  app.globalData.userId = result.userId;
                  app.globalData.majorId = result.majorId;
                  app.globalData.subjectId = result.subjectId;
                  app.globalData.majorName = result.majorName;
                  app.globalData.nickName = result.nickName;
                  // 储存token缓存
                  wx.setStorageSync('token', result.token);
                  console.log(wx.getStorageSync('token'))
                  if (!result.isMajor) {
                    // 没有选择专业跳转到选择专业的页面选择
                    wx.navigateTo({
                      url: '../../pages/choicePage/choicePage',
                    })
                  } else {
                    if (result.subjectName.length > 4) {
                      result.subjectName = result.subjectName.slice(0,4?4:11)+'...';
                    }
                    that.setData({
                      'majorInfo.subjectName':result.subjectName
                    })
                    wx.setNavigationBarTitle({
                      title: result.majorName,
                    })
                    // 加载下方的视频区域
                    that.downVideo();
                  }
                }
              })
        } else {
            console.log('登录失败!'+res.errMsg)
        }
      }
    })
  },
  // 查询轮播图
  bannerImgList:function(type) {
    var that = this;
    wx.request({
      url: app.globalData.path+'findImgList',
      data:{type:type},
      dataType:"json",
      method:"POST",
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success:function(res) {
        if (type == 1) {
          that.setData({
            imgList:res.data.data
          })
        } else {
          that.setData({
            downImgList:res.data.data
          })
        }
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
    // wx.navigateTo({
    //   url: '../../pages/videoPage/videoPage?id='+option.currentTarget.dataset.id,
    // })
  },
  /**
   * 去答题
   */
  toTopic:function(){
      wx.navigateTo({
        url: '../../pages/answer/answer',
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
  /**
   * 团队
   */
  // team:function() {
  //   wx.navigateTo({
  //     url: '../../pages/teamPage/teamPage',
  //   })
  // },
  /**
   * 分享赚钱
   */
  shareMoney:function(){
    wx.navigateTo({
      url: '../../pages/sharePage/sharePage',
    })
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
  siwchSubject:function(){
    wx.navigateTo({
      url: '../../pages/swichSubject/swichSubject',
    })
  },
  chapterClick:function(){
    wx.navigateTo({
      url: '../../pages/chapterPage/chapterPage',
    })
  },
  trueQuestion:function(){
    wx.navigateTo({
      url: '../../pages/trueQuestionPage/trueQuestionPage',
    })
  },
  systemInfo:function(){
    let that = this;
    wx.getSystemInfo({
      success: (result) => {
          that.setData({
            windowwidth:result.windowWidth,
            windowHeigth:result.windowHeight
          })
      },
    })
  }
})