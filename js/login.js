window.addEventListener("flutterInAppWebViewPlatformReady", function (event) {
  console.log("WebView is ready for communication.");
});

$(document).ready(function () {
  $('.btn-login').on('click', function () {
    const email = document.getElementById('email').value;
    console.log(email);
    const password = document.getElementById('password').value;
    const loginData = JSON.stringify({
      email: email,
      password: password
    });

    if (window.flutter_inappwebview) {
      console.log('loginData : ', loginData)
      window.flutter_inappwebview.callHandler('email-login', loginData)
        .catch(function (error) {
          console.error("Error sending data to Flutter: ", error);
        });
    } else {
      console.log("Flutter InAppWebView is not ready.");
      const message = { type: 'email-login', message: '이메일 로그인 버튼이 클릭되었습니다.' };
      window.parent.postMessage(message, '*');
      console.log("Message sent: ", JSON.stringify(message)); // JSON.stringify로 객체 내용을 문자열로 변환
    }
  });
});

$(document).ready(function () {
  $('.kakao-login').on('click', function () {
    if (window.flutter_inappwebview) {
      window.flutter_inappwebview.callHandler('kakao-login', '카카오 로그인 버튼이 클릭되었습니다.')
        .catch(function (error) {
          console.error("Error sending data to Flutter: ", error);
        });
    } else {
      console.log("Flutter InAppWebView is not ready.");
      const message = { type: 'kakao-login', message: '카카오 로그인 버튼이 클릭되었습니다.' };
      window.parent.postMessage(message, '*');
      console.log("Message sent: ", JSON.stringify(message)); // JSON.stringify로 객체 내용을 문자열로 변환

    }
  });

  $('.apple-login').on('click', function () {
    if (window.flutter_inappwebview) {
      window.flutter_inappwebview.callHandler('apple-login', 'Apple 로그인 버튼이 클릭되었습니다.')
        .catch(function (error) {
          console.error("Error sending data to Flutter: ", error);
        });
    } else {
      console.error("Flutter InAppWebView is not ready.");
    }
  });

  document.getElementById('signup').addEventListener('click', function (event) {
    if (window.flutter_inappwebview) {
      window.flutter_inappwebview.callHandler('signup', '회원가입 버튼이 클릭되었습니다.')
        .catch(function (error) {
          console.error("Error sending data to Flutter: ", error);
        });
    } else {
      console.error("Flutter InAppWebView is not ready.");
    }
  });

  document.getElementById('find-id').addEventListener('click', function (event) {
    if (window.flutter_inappwebview) {
      window.flutter_inappwebview.callHandler('find-id', '회원가입 버튼이 클릭되었습니다.')
        .catch(function (error) {
          console.error("Error sending data to Flutter: ", error);
        });
    } else {
      console.error("Flutter InAppWebView is not ready.");
    }
  });

  document.getElementById('find-pwd').addEventListener('click', function (event) {
    if (window.flutter_inappwebview) {
      window.flutter_inappwebview.callHandler('find-pwd', '회원가입 버튼이 클릭되었습니다.')
        .catch(function (error) {
          console.error("Error sending data to Flutter: ", error);
        });
    } else {
      console.error("Flutter InAppWebView is not ready.");
    }
  });
});
