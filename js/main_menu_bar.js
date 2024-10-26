$(document).ready(function () {
    $('.notice-menu-btn').on('click', function() {
        if (window.flutter_inappwebview) {
            window.flutter_inappwebview.callHandler('notice-menu', '공지사항 메뉴 버튼이 클릭되었습니다.')
              .catch(function (error) {
                console.error("Error sending data to Flutter: ", error);
              });
          } else {
            console.error("Flutter InAppWebView is not ready.");
          }
    });
});