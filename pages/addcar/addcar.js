// pages/addcar/addcar.js

var app = getApp();
Page({
  data:{
    btn: {
      disabled: false,
      loading: false
    },
    carData: {

    }
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var carlist = wx.getStorageSync('carlist');
    this.setData({
      carlist: carlist
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
    
  },
  onShareAppMessage: function () {
    return {
      title: '临沂plus',
      path: '/pages/addcar/addcar',
      success: function(res) {
        // 分享成功
      },
      fail: function(res) {
        // 分享失败
      }
    }
  },
  testcarnumber: function(e) {
    var val = e.detail.value
    if ( !app.testCarnumber(val) ) {
      wx.blackTip.call(this, "请输入正确的车牌号码");
      return;
    }
  },
  testcarcode: function(e) {

    var val = e.detail.value
    if ( !app.testCode(val) ) {
      wx.blackTip.call(this, "请输入正确的车架号");
    }
  },
  testcardrivenumber: function(e) {
    var val = e.detail.value
    if ( !app.testCode(val) ) {
      wx.blackTip.call(this, "请输入正确的发动机号");
    }
  },


  setCarnumber: function(e) {
    this.setData({
      'carData.carnumber': e.detail.value
    });
  },
  setCarcode: function(e) {
    this.setData({
      'carData.carcode': e.detail.value.toUpperCase()
    });
  },
  setCardrivenumber: function (e) {
    this.setData({
      'carData.cardrivenumber': e.detail.value.toUpperCase()
    });
  },

  confirm: function() {
    var _this = this;
    var data = this.data.carData;
    var carnumber_flag = app.testCarnumber(data.carnumber);
    var carcode_flag = app.testCode(data.carcode);
    var cardrivenumber_flag = app.testCode(data.cardrivenumber);

    if (!carnumber_flag || !carnumber_flag || !carnumber_flag) {
      wx.blackTip.call(this, "请输入正确的车辆信息");
      return;
    }
    this.setData({
      'btn.loading': true,
      'btn.disabled': true
    });

    wx.request({
      url: 'https://comments.cx580.com/illegal/index?c=illegal&a=query',
      data: {
        appkey: app.globalData._appkey,
        carcode: data.carcode,
        carnumber: data.carnumber,
        cardrivenumber: data.cardrivenumber
      },
      header: {'content-type': 'application/json'},
      success: function(res) {

        if (res.data.status != 0 ) {
          switch (res.data.status) {
            case -1:
              wx.blackTip.call(_this, " 缺少必要的参数或找不到车牌前缀所匹配的城市");
              break;
            case -3:
              wx.blackTip.call(_this, "本系统暂不提供该城市违章查询请求       ");
              break;
            case -5:
              wx.blackTip.call(_this, "添加失败，服务器错误（超时，数据获取异常等）");
              break;
            case -10:
              wx.blackTip.call(_this, "添加失败，未被授权访问该服务或用户名密码不正确");
              break;
            case -20:
              wx.blackTip.call(_this, "未知错误请联系管理员");
              break;
            case -40:
              wx.blackTip.call(_this, "添加失败，未被授权查询此车牌信息");
              break;
            case -42:
              wx.blackTip.call(_this, "添加失败，数据源暂不可用");
              break;
            case -43:
              wx.blackTip.call(_this, "添加失败，当日查询数已达到授权数标准，无法继续查询");
              break;
            case -44:
              wx.blackTip.call(_this, "添加失败， 已达到查询上限");
              break;
            case -61:
              wx.blackTip.call(_this, "添加失败，输入车牌号有误");
              break;
            case -62:
              wx.blackTip.call(_this, "添加失败，输入车辆识别代码有误");
              break;
            case -63:
              wx.blackTip.call(_this, "添加失败，输入发动机号有误");
              break;
            case -66:
              wx.blackTip.call(_this, "添加失败，不支持的车辆类型");
              break;
            case -67:
              wx.blackTip.call(_this, "添加失败，该省（城市）份不支持异地车牌");
              break;
            default:
              wx.blackTip.call(_this, "添加失败，请检查您填写的信息是否正确");
              break;
          }
          
          this.setData({
            'btn.loading': false,
            'btn.disabled': false
          });
          return;
        }
        console.log("请求成功", res);
        var formatData = _this.data.carData;
        formatData.result = res.data.result;

        wx.setStorageSync('allCarData', formatData);

        wx.showToast({
          title: '添加成功',
          icon: 'success',
          duration: 1500
        });
        setTimeout(function(){
          wx.navigateBack({
            delta: 1
          });
        }, 1500);
      },
      error: function (res) {
        console.error("请求失败", res);
        wx.blackTip.call(_this, "添加失败，请检查网络");
        _this.setData({
          'btn.loading': false,
          'btn.disabled': false
        });
      }
    })
  }
})