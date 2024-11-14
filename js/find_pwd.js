window.addEventListener("flutterInAppWebViewPlatformReady", function(event) {
  console.log("WebView is ready for communication.");
});

$(document).ready(function() {
    if (window.flutter_inappwebview) {
        $('.certify-email-btn').on('click', function() {
          const email = document.getElementById('sendEmailInput').value;

          window.flutter_inappwebview.callHandler('temporaryPassword', email)
            .catch(function(error) {
              console.error("Error sending data to Flutter: ", error);
            });
          });

        $('.set-pwd-btn').on('click', function() {
          const password = document.getElementById('changePasswordInput').value;
          const passwordCheck = document.getElementById('changePasswordInputCheck').value;
          console.log("setpwd");
                    console.log(password);
                    console.log(passwordCheck);

          if (!password || password.length < 8) {
              alert('비밀번호는 최소 8자 이상이어야 합니다.');
              return;
          }

          if (password !== passwordCheck) {
              alert('비밀번호가 일치하지 않습니다.');
              return;
          }

          window.flutter_inappwebview.callHandler('changePwd', password)
              .then(function(result) {
             console.log("changePwd");
             console.log(result);
                  if (result) {
                      alert('비밀번호가 성공적으로 변경되었습니다.');
                      window.location.href = `../html/my-page.html`;

                  } else {
                      alert('비밀번호 변경에 실패했습니다. 다시 시도해주세요.');
                  }
              })
              .catch(function(error) {
                  console.error("Error sending data to Flutter: ", error);
                  alert('비밀번호 변경 중 오류가 발생했습니다.');
              });

          });
    } else {
    }
});