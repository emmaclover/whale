// flutterInAppWebViewPlatformReady 이벤트 리스너
window.addEventListener("flutterInAppWebViewPlatformReady", function(event) {
  console.log("WebView is ready for communication.");
});

$(document).ready(function() {
  $('.signup-btn').on('click', function() {

    if (window.flutter_inappwebview) {
      window.flutter_inappwebview.callHandler('signup', '회원가입 버튼이 클릭되었습니다.')
        .catch(function(error) {
          console.error("Error sending data to Flutter: ", error);
        });
    } else {
      console.error("Flutter InAppWebView is not ready.");
    }
  });
});