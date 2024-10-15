// flutterInAppWebViewPlatformReady 이벤트 리스너
window.addEventListener("flutterInAppWebViewPlatformReady", function(event) {
  console.log("WebView is ready for communication.");
});

$(document).ready(function() {
  $('.signup-btn').on('click', function() {
    const password = document.getElementById('password').value;
    const emailId = document.getElementById('email-id').value;
    const emailAddress = document.getElementById('email-address').value;

    const signupData = JSON.stringify({
      email: emailId + '@' + emailAddress,
      password: password
    });

    if (window.flutter_inappwebview) {
        window.flutter_inappwebview.callHandler('signup', signupData)
        .catch(function(error) {
          console.error("Error sending data to Flutter: ", error);
        });
    } else {
      console.error("Flutter InAppWebView is not ready.");
    }
  });
});

$('.header-include').load('../include/header.html', function() {

})