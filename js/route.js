window.addEventListener("flutterInAppWebViewPlatformReady", function(event) {
  console.log("WebView is ready for communication.");
});

$(document).ready(function() {
      $('.bi-home').on('click', function() {
            window.flutter_inappwebview.callHandler('bi-home', '홈 버튼이 클릭되었습니다.')
              .catch(function(error) {
                console.error("Error sending data to Flutter: ", error);
              });
        });
      $('.bi-change').on('click', function() {
            window.flutter_inappwebview.callHandler('bi-change', '거래소 버튼이 클릭되었습니다.')
              .catch(function(error) {
                console.error("Error sending data to Flutter: ", error);
              });
        });
      $('.bi-shop').on('click', function() {
            window.flutter_inappwebview.callHandler('bi-shop', '아이템샵 버튼이 클릭되었습니다.')
              .catch(function(error) {
                console.error("Error sending data to Flutter: ", error);
              });
        });
      $('.bi-person').on('click', function() {
            window.flutter_inappwebview.callHandler('bi-person', '친구목록 버튼이 클릭되었습니다.')
              .catch(function(error) {
                console.error("Error sending data to Flutter: ", error);
              });
        });
});