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
           document.querySelector('.uHeight').innerText = user.height !== null ? user.height : "-";
           document.querySelector('.uWeight').innerText = user.weight !== null ? user.weight : "-";
           document.querySelector('.uResidence').innerText = user.region !== null ? user.region : "-";
         });

        $('.btn-logout-basic').on('click', function(result) {
            window.flutter_inappwebview.callHandler('logoutPop','로그아웃')
        });

        $('.btn-logout-basic').on('click', function(result) {
            const name = document.getElementById('userName').value;
            const gender = document.querySelector('gender')?.value;
            const birthday = document.getElementById('birthDate').value;
            const job = document.getElementById('userJob').value;
            const sleepTime = document.getElementById('sleepTime').value;
            const wakeTime = document.getElementById('wakeTime').value;
            const sedentaryTime = document.getElementById('sitTime').value;

            const surveyData = {
              name: name,
              gender: gender,
              birthday: birthday,
              job: job,
              sleepTime: sleepTime,
              wakeTime: wakeTime,
              sedentaryTime: sedentaryTime,
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