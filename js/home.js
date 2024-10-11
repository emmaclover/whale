window.addEventListener("flutterInAppWebViewPlatformReady", function(event) {
  console.log("WebView is ready for communication.");
});

$(document).ready(function() {
    if (window.flutter_inappwebview) {
      window.flutter_inappwebview.callHandler('stepdata').then(function(result) {
        document.querySelector('.step-data').innerText = result;
      });
      window.flutter_inappwebview.callHandler('sleptdata').then(function(result) {
        let hour = Math.floor(Number(result) / 60);
        let min = Math.floor(Number(result) % 60);
          document.querySelector('.sleep-hour').innerText = hour;
          document.querySelector('.sleep-minute').innerText = min;
      });
      window.flutter_inappwebview.callHandler('pearldata').then(function(result) {
          document.querySelector('.pearl-data').innerText = result;
      });
      window.flutter_inappwebview.callHandler('coraldata').then(function(result) {
          document.querySelector('.coral-data').innerText = result;
      });
      window.flutter_inappwebview.callHandler('pearlTradable').then(function(result) {
          document.querySelector('.pearl-tradable').innerText = result;
      });
      window.flutter_inappwebview.callHandler('coralTradable').then(function(result) {
          document.querySelector('.coral-tradable').innerText = result;
      });
      window.flutter_inappwebview.callHandler('pearlTotal').then(function(result) {
          document.querySelectorAll('.pearl-total').forEach(function(element) {
             element.innerText = result;
          });
      });
      window.flutter_inappwebview.callHandler('coralTotal').then(function(result) {
          document.querySelectorAll('.coral-total').forEach(function(element) {
            element.innerText = result;
          });
      });

      $('.gotochange').on('click', function() {
            window.flutter_inappwebview.callHandler('gotochange', '포인트 전환 버튼이 클릭되었습니다.')
              .catch(function(error) {
                console.error("Error sending data to Flutter: ", error);
              });
        });
    } else {
      console.log("Flutter InAppWebView is not ready.");
    }
});
