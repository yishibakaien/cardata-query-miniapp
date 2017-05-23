// pages/mapNav/mapNav.js
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
// console.log(QQmapWX);
var qqmapsdk;
var app = getApp();
var canbesearch = true;
Page({
  data: {
    pos: [],
    hideList: true,
    choosePosData: {
      lng: '',
      lat: ''
    }
  },
  onLoad: function (options) {
    var _this = this;
    // 页面初始化 options为页面跳转所带来的参数
    qqmapsdk = new QQMapWX({
      key: app.globalData.mapkey
    });
    wx.getLocation({
      success: function(res) {
        console.log(res);
        _this.setData({
          longitude: res.longitude,
          latitude: res.latitude
        });
      },
    })
  },
  onReady: function () {
    // 页面渲染完成


  },
  onShow: function () {
    // 页面显示

  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  search: function (e) {
    var value = e.detail.value;
    if (canbesearch === true) {
      canbesearch = false;
      this.searchTheMap(value);
      setTimeout(function () {
        canbesearch = true;
      }, 210);
    }
  },
  searchTheMap: function (value) {
    var _this = this;
    qqmapsdk.search({
      keyword: value,
      success: function (res) {
        console.log(res);
        _this.setData({
          pos: res.data
        });
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        console.log(res);
      }
    })
  },
  inputFocus: function() {
    this.setData({
      hideList: false
    })
  },
  choosePosition: function(e) {
    console.log(e);
    this.setData({
      hideList: true,
      'choosePosData.lng': e.currentTarget.dataset.lng,
      'choosePosData.lat': e.currentTarget.dataset.lat
    })
  }
})