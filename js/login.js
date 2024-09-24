// flutterInAppWebViewPlatformReady 이벤트 리스너
window.addEventListener("flutterInAppWebViewPlatformReady", function(event) {
  console.log("WebView is ready for communication.");
});

$(document).ready(function() {
  $('.kakao-login').on('click', function() {
    if (window.flutter_inappwebview) {
      window.flutter_inappwebview.callHandler('web2app', '카카오 로그인 버튼이 클릭되었습니다.')
        .then(function(result) {
          console.log("Data sent to Flutter: 카카오 로그인 버튼이 클릭되었습니다.");
        })
        .catch(function(error) {
          console.error("Error sending data to Flutter: ", error);
        });
    } else {
      console.error("Flutter InAppWebView is not ready.");
    }
//    alert('카카오 로그인 버튼이 클릭되었습니다.');
  });

  $('.apple-login').on('click', function() {
    if (window.flutter_inappwebview) {
      window.flutter_inappwebview.callHandler('web2app', 'Apple 로그인 버튼이 클릭되었습니다.')
        .then(function(result) {
          console.log("Data sent to Flutter: Apple 로그인 버튼이 클릭되었습니다.");
        })
        .catch(function(error) {
          console.error("Error sending data to Flutter: ", error);
        });
    } else {
      console.error("Flutter InAppWebView is not ready.");
    }
    alert('Apple 로그인 버튼이 클릭되었습니다.');
  });
});
