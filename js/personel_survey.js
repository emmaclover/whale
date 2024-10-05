// flutterInAppWebViewPlatformReady 이벤트 리스너
window.addEventListener("flutterInAppWebViewPlatformReady", function(event) {
  console.log("WebView is ready for communication.");
});

$(document).ready(function() {

  // 버튼 클릭 시 입력값을 가져오는 로직
  $('.enter-btn').on('click', function() {
    // 입력값을 클릭 시점에 가져옴
    const name = document.getElementById('userName').value;
    const gender = document.querySelector('input[name="gender"]:checked')?.value;
    const birthday = document.getElementById('birthDate').value;
    const job = document.getElementById('userJob').value;
    const sleepTime = document.getElementById('sleepTime').value;
    const wakeTime = document.getElementById('wakeTime').value;
    const sedentaryTime = document.getElementById('time-select').value;

    // 가져온 데이터를 객체로 변환
    const surveyData = {
      name: name,
      gender: gender,
      birthday: birthday,
      job: job,
      sleepTime: sleepTime,
      wakeTime: wakeTime,
      sedentaryTime: sedentaryTime,
    };

    // JSON 형식으로 변환
    const surveyDataJSON = JSON.stringify(surveyData);

//      console.log("전송 데이터:", surveyDataJSON);
    // InAppWebView에 데이터 전송
    if (window.flutter_inappwebview) {
      window.flutter_inappwebview.callHandler('personel-survey', surveyDataJSON)
        .catch(function(error) {
          console.error("Error sending data to Flutter: ", error);
        });
    } else {
      console.error("Flutter InAppWebView is not ready.");
    }
  });
});
