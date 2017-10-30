function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
function starArray(stars){
   var num = stars.toString().substring(0,1);
   var Array = [];
   for( var i = 1; i<=5 ; i++){
     if (i <= num){
          Array.push(1)
       }else{
          Array.push(0)
       }
   }
   return Array
}
 function http(url,callBack) {
  wx.request({
    url: url,
    method: "GET",
    header: { 'content-type': 'application/' },
    success: function (res) {
      callBack(res.data)

    },
    fail: function (error) {
    },
  })
}
module.exports = {
  formatTime: formatTime,
  starArray: starArray,
  http:http
}
