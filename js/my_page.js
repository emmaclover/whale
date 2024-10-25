window.addEventListener("flutterInAppWebViewPlatformReady", function(event) {
  console.log("WebView is ready for communication.");
});

$(document).ready(function() {
    if (window.flutter_inappwebview) {
        window.flutter_inappwebview.callHandler('userData').then(function(user) {
            console.log('userjs',  Object.entries(user));

           document.querySelector('.uName').innerText = user.name;
           document.querySelector('.uNickname').innerText = user.nickname;
           document.querySelector('.uJob').innerText = user.job;
           document.querySelector('.uSleepTime').innerText = user.sleepTime;
           document.querySelector('.uWakeTime').innerText = user.wakeTime;
           document.querySelector('.uSendetaryTime').innerText = user.sedentaryTime;
           document.querySelector('.uHeight').innerText = user.height !== null ? user.height : "-";
           document.querySelector('.uWeight').innerText = user.weight !== null ? user.weight : "-";
           document.querySelector('.uResidence').innerText = user.region !== null ? user.region : "-";
         });

        $('.btn-logout-basic').on('click', function(result) {
            window.flutter_inappwebview.callHandler('logoutPop','로그아웃')
        });

        $('.btn-logout-basic').on('click', function(result) {
            window.flutter_inappwebview.callHandler('editUser','로그아웃')
        });
    } else {
    }
});