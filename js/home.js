window.addEventListener("flutterInAppWebViewPlatformReady", function(event) {
  console.log("WebView is ready for communication.");
});

$(document).ready(function() {
    if (window.flutter_inappwebview) {
      window.flutter_inappwebview.callHandler('stepdata').then(function(result) {
          document.querySelector('.step-data').innerText = result;
      });
      window.flutter_inappwebview.callHandler('sleptdata').then(function(result) {
          document.querySelector('.sleep-data').innerText = result;
      });
      window.flutter_inappwebview.callHandler('pearldata').then(function(result) {
          document.querySelector('.pearl-data').innerText = result;
      });
      window.flutter_inappwebview.callHandler('coraldata').then(function(result) {
          document.querySelector('.coral-data').innerText = result;
      });
    } else {
      console.log("Flutter InAppWebView is not ready.");
    }
});
