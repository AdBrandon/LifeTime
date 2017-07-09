// birth.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },
  bindDateChange: function (e) {
    var today = new Date(),
      birth = e.detail.value.split("-"),
      year = today.getFullYear() - parseInt(birth[0]),
      month = year * 12 + today.getMonth() - parseInt(birth[1]) + 1;
    if(month >= 900){
      wx.showModal({
        title:"Over 900 months!",
        content: "Enjoy your magical life!",
        showCancel:false,
      })
    } else {
      app.birthday = e.detail.value;
      try {
        wx.setStorageSync('birthday', app.birthday)
      } catch (e) {
      }
      wx.navigateBack();
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var today = new Date(),
      endDate = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
      this.setData({
        today : endDate,
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
  
  }
})