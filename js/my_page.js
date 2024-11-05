window.addEventListener("flutterInAppWebViewPlatformReady", function(event) {
  console.log("WebView is ready for communication.");
});

$(document).ready(function() {
    if (window.flutter_inappwebview) {
        window.flutter_inappwebview.callHandler('userData').then(function(user) {
           document.querySelectorAll('.uName').forEach(function(element) {
                 element.innerText = user.nickname;
              });
              document.querySelectorAll('.uNickname').forEach(function(element) {
                 element.innerText = user.nickname;
              });
           document.querySelector('.uJob').innerText = user.job;
           document.querySelector('.uSleepTime').innerText = user.sleepTime;
           document.querySelector('.uWakeTime').innerText = user.wakeTime;
           document.querySelector('.uSendetaryTime').innerText = user.sedentaryTime;
           document.querySelector('.uHeight').innerText = user.height ?? "-";
           document.querySelector('.uWeight').innerText = user.weight ?? "-";
           document.querySelector('.uRegion').innerText = user.region ?? "-";
        });

        window.flutter_inappwebview.callHandler('editUser').then(function(user) {
           document.querySelectorAll('.uName').forEach(function(element) {
                 element.innerText = user.nickname;
              });
              document.querySelectorAll('.uNickname').forEach(function(element) {
                 element.innerText = user.nickname;
              });
           document.querySelector('.uJob').innerText = user.job;
           document.querySelector('.uSleepTime').innerText = user.sleepTime;
           document.querySelector('.uWakeTime').innerText = user.wakeTime;
           document.querySelector('.uSendetaryTime').innerText = user.sedentaryTime;
           document.querySelector('.uHeight').innerText = user.height ?? "-";
           document.querySelector('.uWeight').innerText = user.weight ?? "-";
           document.querySelector('.uRegion').innerText = user.region ?? "-";
        });

        $('.btn-logout-basic').on('click', function(result) {
            window.flutter_inappwebview.callHandler('logoutPop','로그아웃')
        });

        $('.user-quit').on('click', function() {
         window.flutter_inappwebview.callHandler('userQuit', '탈퇴하기 클릭')
        })
    } else {
    }
});