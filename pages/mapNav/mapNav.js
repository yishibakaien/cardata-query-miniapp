// pages/mapNav/mapNav.js
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
// console.log(QQmapWX);
var qqmapsdk;
var app = getApp();
var canbesearch = true;
Page({
  data:{},
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    qqmapsdk = new QQMapWX({
        key: app.globalData.mapkey
    });
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
  search: function(e) {
    var value = e.detail.value;
    if (canbesearch === true) {
      canbesearch = false;
      this.searchTheMap(value);
      setTimeout(function() {
        canbesearch = true;
      }, 210);
    }    
  },
  searchTheMap: function(value) {
    qqmapsdk.search({
      keyword: value,
      success: function (res) {
          console.log(res);
      },
      fail: function (res) {
          console.log(res);
      },
      complete: function (res) {
          console.log(res);
      }
    })
  }
})