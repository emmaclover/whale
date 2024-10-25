window.addEventListener("flutterInAppWebViewPlatformReady", function(event) {
  console.log("WebView is ready for communication.");
});

$(document).ready(function() {
    if (window.flutter_inappwebview) {
        window.flutter_inappwebview.callHandler('userData').then(function(user) {
            console.log('userjs',  Object.entries(user));

//           document.querySelector('.uName').innerText = user.name;
//           document.querySelector('.uNickname').innerText = user.nickname;
           document.querySelectorAll('.uName').forEach(function(element) {
                 element.innerText = user.name;
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

        $('.submit').on('click', function(result) {
            const job = document.getElementById('userJob').value || user.job;
            const sleepTime = document.getElementById('sleepTime').value || user.job;
            const wakeTime = document.getElementById('wakeTime').value || user.job;
            const sedentaryTime = document.getElementById('sitTime').value || user.job;
            const height = document.getElementById('height').value || user.job || "";
            const weight = document.getElementById('weight').value || user.job || "";
            const region = document.getElementById('region').value || user.job || "";

            const surveyData = {
              job: job,
              sleepTime: sleepTime,
              wakeTime: wakeTime,
              sedentaryTime: sedentaryTime,
              height: height,
              weight: weight,
              region: region,
            };

            const editUserJSON = JSON.stringify(surveyData);
            console.log("전송 데이터:", surveyDataJSON);

            window.flutter_inappwebview.callHandler('editUser',editUserJSON).catch(function(error) {
              console.error("Error sending data to Flutter: ", error);
            });
        });
    } else {
    }
});