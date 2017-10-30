// pages/more-movie/more-movie.js
var util = require('../../../utils/util.js');
var app = getApp();
Page({
  data: {
    navgateTitle:{},
    movie:{},
  },

 // 生命周期函数--监听页面加载
  onLoad: function (options) {
    var category = options.category;
    this.data.navgateTitle = category;
    var dataUrl = "";
    switch (category){
      case "正在上映":
       var dataUrl = app.globalData.doubanBase +
          "/v2/movie/in_theaters"
       break;
       case "即将上映":
        var dataUrl = app.globalData.doubanBase +
          "/v2/movie/coming_soon"       
       break;
       case "Top250":
        var dataUrl = app.globalData.doubanBase +
          "/v2/movie/top250"        
       break;
    }
    util.http(dataUrl, this.progressData)
  },
    progressData: function (data) {
      var movie = [];
      for (var index in data.subjects) {
        var subject = data.subjects[index];
        var title = subject.title;
        if (title.length >= 6) {
          title = title.substring(0, 7) + "..."
        }
        var temp = {
          stars: util.starArray(subject.rating.stars),
          title: title,
          average: subject.rating.average,
          coverageUrl: subject.images.large,
          movieId: subject.id,
        }
        movie.push(temp)
      }

      this.setData({
        movie:movie
      })
      console.log(movie)
  },
  

  onReady:function(event){
     //设置导航条文字
     wx.setNavigationBarTitle({
       title: this.data.navgateTitle,
     })
  }
 
})