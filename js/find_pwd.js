window.addEventListener("flutterInAppWebViewPlatformReady", function(event) {
  console.log("WebView is ready for communication.");
});

$(document).ready(function() {
    if (window.flutter_inappwebview) {
        $('.certify-email-btn').on('click', function() {
          const email = document.getElementById('sendEmailInput').value;
          console.log("certify-email-btn");
          console.log(email);

          window.flutter_inappwebview.callHandler('temporaryPassword', email)
            .catch(function(error) {
              console.error("Error sending data to Flutter: ", error);
            });
          });

        $('.set-pwd-btn').on('click', function() {
          const password = document.getElementById('changePasswordInput').value;
          const passwordCheck = document.getElementById('changePasswordInputCheck').value;

          if(password == passwordCheck){
              window.flutter_inappwebview.callHandler('changePwd', password)
                .catch(function(error) {
                  console.error("Error sending data to Flutter: ", error);
            });
          } else {
            alert('비밀번호가 일치하지 않습니다.');
          }
          });
    } else {
    }
});