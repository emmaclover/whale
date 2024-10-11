window.addEventListener("flutterInAppWebViewPlatformReady", function(event) {
  console.log("WebView is ready for communication.");
});

$(document).ready(function() {
    if (window.flutter_inappwebview) {
        window.flutter_inappwebview.callHandler('stepdata').then(function(result) {
            document.querySelector('.step-data').innerText = result;
        });

        window.flutter_inappwebview.callHandler('stepdata').then(function(result) {
                document.querySelector('.step-data').innerText = result;
        });
    $('.gotochange').on('click', function() {
          window.flutter_inappwebview.callHandler('gotochange', '포인트 전환 버튼이 클릭되었습니다.')
            .catch(function(error) {
              console.error("Error sending data to Flutter: ", error);
            });
        });

        $('.gotoshop').on('click', function() {
          window.flutter_inappwebview.callHandler('gotoshop', '아이템 쇼핑하기 버튼이 클릭되었습니다.')
            .catch(function(error) {
              console.error("Error sending data to Flutter: ", error);
            });
        });

}
});