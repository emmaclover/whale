window.addEventListener("flutterInAppWebViewPlatformReady", function(event) {
  console.log("WebView is ready for communication.");
});

$(document).ready(function() {
    if (window.flutter_inappwebview) {
        $('.user-logout').on('click', function() {
            window.flutter_inappwebview.callHandler('logout').then(function(result) {
               if(result){
                alert('로그아웃 되었습니다.');
               }
            });
        });
    } else {
    }
});