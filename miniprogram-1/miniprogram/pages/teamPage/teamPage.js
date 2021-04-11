// miniprogram/pages/teamPage/teamPage.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    svLeftHeight:'100',
    curHdIndex:0,
    parentUser:[],
    teamDataList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 加载父节点
    this.parentUser();
    if (this.data.curHdIndex == 0) {
      this.teamData();
    }
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
  getchildren:function(e) {
      let dataId = e.target.dataset.id ;
      if (dataId == 0) {
        this.teamData();
      } else {
        this.queryList(dataId);
      }
  },
  parentUser:function(e) {
    var that = this;
    wx.request({
      url: app.globalData.path+'parentUser',
      data:{},
      dataType:"json",
      method:"POST",
      header:{
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization':wx.getStorageSync('token')
      },
      success:function(res) {
        let data = res.data.data;
        if (data.ctlUser.wechatName.length > 4) {
          data.ctlUser.wechatName = data.ctlUser.wechatName.slice(0,4?4:11)+'...';
        }
        that.setData({
          parentUser:data
        })
      }
    })
  },
  teamData:function() {
    var that = this;
    wx.request({
      url: app.globalData.path+'teamData',
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
            teamDataList:data,
            curHdIndex:0
          })
      }
    })
  },
  queryList:function(type) {
    var that = this;
      wx.request({
        url: app.globalData.path+'queryList',
        data:{'type':type==2?0:type},
        dataType:'json',
        method:"POST",
        header:{
          'content-type': 'application/x-www-form-urlencoded',
          'Authorization':wx.getStorageSync('token')
        },
        success:function(res) {
          let data = res.data.data;
          that.setData({
            teamDataList:data,
            curHdIndex:type
          })
        }
      })
  },
  contactClick:function(e){
      let name = e.currentTarget.dataset.name;
      if (name == undefined) {
        wx.showToast({
          title: '微信号暂未设置',
          icon:'none',
          duration:2000
        })
      } else {
        wx.showModal({
          title: '联系TA',
          content: '微信号：'+name,
          showCancel:false,
          confirmText:'复制微信',
          success: function(res) {
            if (res.confirm) {
              wx.setClipboardData({
                data: name,
                success:function(res) {
                  wx.showToast({
                    title: '复制成功',
                    icon:'success',
                    duration:2000
                  })
                }
              })
            } 
          }
          })
      }
  }
})