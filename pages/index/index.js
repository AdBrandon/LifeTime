//index.js
//获取应用实例
var exp = ['(ง •̀_•́)ง ', '(,,•́ . •̀,,) ', '_(:з」∠)_', 'Σ(っ °Д °;)っ', '(..•˘_˘•..)', '(°□°；)', '( ‘-ωก̀ )', '( ´◔ ‸◔`)','<(￣︶￣)>'];
var app = getApp()
function setExp(newExp, that){
  if (newExp) {
    that.setData({
      exp: newExp,
      expTop: '100%',
      expHeight: '0',
    });
    try {
      wx.setStorageSync('exp', newExp)
    } catch (e) {
    }
  }
}
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    year:null,
    log:null,
    fillerData:'none',
    textGray:0,
    exps: exp,
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  expShow:function(){
    this.setData({
      expHeight: '100%',
      expTop: '0',
    });
  },
  changeExp:function(e){
    var ChooseExp = exp[e.currentTarget.dataset.index];
    setExp(ChooseExp, this);
  },
  expInput:function(e){
    var newExp = e.detail.value;
    this.setData({
      inputValue:'',
    })
    setExp(newExp, this);
  },
  navigate:function(){
    wx.navigateTo({
      url: '../life/life',
})
  },
  yearTap:function(){
    app.window.setData({
      rotate: app.rotate += 360,
    })
  },
  onLoad: function () {
    // console.log('onLoad')
    var that = this;
    //调用应用实例的方法获取全局数据
    app.window = this;
    app.rotate = 0;
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        name: userInfo.nickName,
      })
    })
    var time = new Date();
    var yearStart = new Date(time.getFullYear() + "/01/01 00:00:00");
    var nextYear = new Date((time.getFullYear() + 1) + "/01/01 00:00:00");
    var fullHours = Math.floor((nextYear.getTime() - yearStart.getTime()) / (3600 * 1000));
    var throughHours = Math.floor((time.getTime() - yearStart.getTime())/(3600*1000));
    var per = throughHours / fullHours;
    that.setData({
      year: time.getFullYear(),
      per: Math.floor(per*100),
      textGray: per,
      textSpeed: per * 2,
    })

    if (per<=0.5){
      that.setData({
        spinerTrans: - per*360,
        spinerSpeed: per*2,
      })
    }else{
      that.setData({
        spinerTrans: - 180,
        spinerSpeed: 1,
      })
      setTimeout(function(){
        that.setData({
          fillerData: 'block',
        })
        setTimeout(function () {
          that.setData({
            fillerTrans: - (per - 0.5) * 360,
            fillerSpeed: per * 2-1,
          })
        }, 50)
      },1000)
    }
    try {
      var value = wx.getStorageSync('exp')
      if (!value) {
        value = exp[Math.floor(Math.random() * 10)];
      }
      that.setData({
        exp: value,
      })
    } catch (e) {
    }
  }
})
