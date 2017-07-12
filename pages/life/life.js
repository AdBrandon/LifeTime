// pages/life/life.js
var app = getApp();
function checkBirth(that){
  if (!app.birthday) {
    try {
      app.birthday = wx.getStorageSync('birthday')
      if (!app.birthday) {
        wx.navigateTo({
          url: 'birth/birth',
        })
      }
    } catch (e) {
    }
  };
  if (app.birthday) {
    setForm(app.birthday, that)
  }
}
function setForm(birthday,that){
  if (app.list){
    return;
  }
  var today = new Date(),
  birth = birthday.split("-"),
  year = today.getFullYear() - parseInt(birth[0]),
  month = year * 12 + today.getMonth() - parseInt(birth[1]) + 1,
  day = today.getDate() - parseInt(birth[2]),
  bgColor,
  list = [];
  if(day < 0){
    month--;
  }
  for (var i = 0; i < 900; i++) {
    var key = Math.floor(Math.random() * 8)
    if (i < month) {  //已过
      bgColor = "Gray";
    } else if (i == month) {
      bgColor = "LimeGreen";
    } else {
      switch (key) {
        case 1:
          bgColor = "LavenderBlush";
          break;
        case 2:
          bgColor = "LightCyan";
          break;
        case 3:
          bgColor = "AliceBlue";
          break;
        case 4:
          bgColor = "LemonChiffon";
          break;
        default:
          bgColor = "GhostWhite";
          break;
      }
    }
    list.push({ color: bgColor });
  };
  var birthDate = new Date(birth[0] + "/" + birth[1] + "/" + birth[2] + " 00:00:00"),
  days = Math.floor((today.getTime() - birthDate.getTime()) / (24 * 3600 * 1000)),
  text = "You have lived " + days + " days.\nMaybe " + (900 - month) + " months left.";
  that.setData({
    list: list,
    text: text,
  });
  app.list = true;
}
Page({
  navigate: function () {
    wx.navigateBack()
  },
  reset:function(){
    app.list = false;
    wx.navigateTo({
      url: 'birth/birth',
    })
  },
  pick:function(e){
    var index = e.currentTarget.dataset.index,
    age = Math.floor((index + 1) / 12 + 1),
    image = null,
    text = age + "岁 / " + (index + 1) + "月";
    if(age < 7){
      image = "img/child.png"
    } else if (age < 17){
      image = "img/junior.png"
    } else if (age < 25) {
      image = "img/youth.png"
    } else if (age < 45) {
      image = "img/middle.png"
    } else if (age < 60) {
      image = "img/man.png"
    } else{
      image = "img/old.png"
    }
    wx.showToast({
      title: text,
      image: image,
      duration: 1000
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var windowWidth, width;
    wx.getSystemInfo({
      success: function (res) {
        windowWidth = res.windowWidth;
        width = Math.floor(windowWidth / 750 * 20) * 30 + Math.floor(windowWidth / 750 * 4) * 30;
        
      }
    });
    this.setData({
      boxWidth: width + 'px',
    })
    // checkBirth(this);
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
    checkBirth(this);
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
    app.list = false;
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