// pages/cardetail/cardetail.js
var app = getApp();
Page({
  data:{},
  onLoad:function(options) {
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function() {
    // 页面渲染完成
  },
  onShow:function() {
    // 页面显示
    var carData = wx.getStorageSync('allCarData');
    this.setData({
      carData: carData
    });
    this.setData({
      '_carData.carcode': carData.carcode,
      '_carData.carnumber': carData.carnumber,
      '_carData.cardrivenumber': carData.cardrivenumber
    });
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
  onPullDownRefresh: function() {
    var _this = this;
    wx.request({
      url: 'https://comments.cx580.com/illegal/index?c=illegal&a=query',
      data: {
        appkey: app.globalData._appkey,
        carcode: _this.data.carData.carcode,
        carnumber: _this.data.carData.carnumber,
        cardrivenumber: _this.data.carData.cardrivenumber
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
              wx.blackTip.call(_this, "刷新失败，服务器错误（超时，数据获取异常等）");
              break;
            case -10:
              wx.blackTip.call(_this, "刷新失败，未被授权访问该服务或用户名密码不正确");
              break;
            case -20:
              wx.blackTip.call(_this, "未知错误请联系管理员");
              break;
            case -40:
              wx.blackTip.call(_this, "刷新失败，未被授权查询此车牌信息");
              break;
            case -42:
              wx.blackTip.call(_this, "刷新失败，数据源暂不可用");
              break;
            case -43:
              wx.blackTip.call(_this, "刷新失败，当日查询数已达到授权数标准，无法继续查询");
              break;
            case -44:
              wx.blackTip.call(_this, "刷新失败， 已达到查询上限");
              break;
            case -61:
              wx.blackTip.call(_this, "刷新失败，输入车牌号有误");
              break;
            case -62:
              wx.blackTip.call(_this, "刷新失败，输入车辆识别代码有误");
              break;
            case -63:
              wx.blackTip.call(_this, "刷新失败，输入发动机号有误");
              break;
            case -66:
              wx.blackTip.call(_this, "刷新失败，不支持的车辆类型");
              break;
            case -67:
              wx.blackTip.call(_this, "刷新失败，该省（城市）份不支持异地车牌");
              break;
            default:
              wx.blackTip.call(_this, "刷新失败，请检查您填写的信息是否正确");
              break;
          }
          return;
        }

        var formatData = _this.data._carData;
        formatData.result = res.data.result;

        wx.setStorageSync('allCarData', formatData);
        _this.setData({
          carData: formatData
        });
        wx.showToast({
          title: '已刷新车辆信息',
          icon: 'success',
          duration: 1000
        });
      },
      error: function (res) {
        console.error("请求失败", res);
        wx.blackTip.call(_this, "刷新失败，请检查网络");
      }
    });
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  makecall: function() {
    wx.makePhoneCall({
      phoneNumber: '15653986199',
      success: function(res) {
        // success
      }
    });
  },
  changeCar: function() {
    wx.navigateTo({
      url: '../addcar/addcar',
      success: function(res){
        // success
      },
      fail: function(res) {
        // fail
      },
      complete: function(res) {
        // complete
      }
    })
  },
  deleteCar: function() {
    wx.showActionSheet({
      itemList: ['删除此条车辆信息并更换'],
      itemColor: '#f53535',
      success: function(res){
        if( res.tapIndex == 0 ) {
          wx.setStorageSync('allCarData', '');
          wx.showToast({
            title: '删除成功!',
            icon: 'success'
          });
          setTimeout(function(){
            wx.navigateBack({
              delta: 1
            });
          }, 1500);
        }
      }
    });
    
  }
})