
var util = require('../../utils/util.js');
//获取应用实例
var app = getApp()
Page( {
   data:{
     intheater: {},
     comsoon:{},
     top250:{}
   },
   onLoad:function(event){
     var top250Url = app.globalData.doubanBase+
     "/v2/movie/top250"+"?start=0&count=3";
     var intheaterUrl = app.globalData.doubanBase+
       "/v2/movie/in_theaters" + "?start=0&count=3";
     var comsoonUrl = app.globalData.doubanBase+
       "/v2/movie/coming_soon" + "?start=0&count=3";   

     this.getDatalist(intheaterUrl,"intheater","正在上映" );
     this.getDatalist(comsoonUrl,"comsoon","即将上映");
     this.getDatalist(top250Url, "top250","Top250");

   },
   onMoreTop:function(event){
     var category = event.currentTarget.dataset.category
      wx.navigateTo({        
        url: '../movies/more-movie/more-movie?category=' + category,
      })
   },
   getDatalist: function (url, settedkey, categoryTitie){
     var that = this;
     wx.request({
       url: url,
       data: {},
       method: "GET",
       header: { 'content-type': 'application/' },
       success: function (res) {
         console.log(res.data);
         that.progressData(res.data.subjects, settedkey, categoryTitie)
       },
       fail: function (error) {
         console.log("error")
       },
     })  
   },
   progressData: function (subjects, settedkey,categoryTitie){
         var movie = [];
         for (var index in subjects ){
           var subject = subjects[index];
           var title = subject.title;
           if(title.length>=6){
              title = title.substring(0,7)+"..."
           }
           //console.log(title);      
         
         var temp = {
           stars: util.starArray(subject.rating.stars),
           title: title,
           average: subject.rating.average,
           coverageUrl: subject.images.large,
           movieId: subject.id,
         }
         movie.push(temp)      
         }
         var readyData={};  //动态属性
         readyData[settedkey] = { 
           categoryTitie: categoryTitie,
           movie:movie          
           };
         this.setData(readyData) 
         console.log(movie);        
   }
})
