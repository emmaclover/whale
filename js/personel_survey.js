window.addEventListener("flutterInAppWebViewPlatformReady", function(event) {
  console.log("WebView is ready for communication.");
});

$(document).ready(function() {
    if (window.flutter_inappwebview) {
        window.flutter_inappwebview.callHandler('signInType').then(function(userType) {
        console.log('userType', userType);
        if (userType === 'apple') {
                document.getElementById('genderSurvey').style.display = 'block';
                document.getElementById('genderSurvey').style.display = 'block';
            } else {
                document.getElementById('birthSurvey').style.display = 'none';
                document.getElementById('birthSurvey').style.display = 'none';
            }
         });

  $('.enter-btn').on('click', function() {
     const gender = document.querySelector('input[name="gender"]:checked')?.value;
     const birthday = document.getElementById('birthDate').value;
    const job = document.getElementById('userJob').value;
    const sleepTime = document.getElementById('sleepTime').value;
    const wakeTime = document.getElementById('wakeTime').value;
    const sedentaryTime = document.getElementById('sitTime').value;

    const surveyData = {
      gender: gender,
      birthday: formatDate(birthday),
      job: job,
      sleepTime: sleepTime,
      wakeTime: wakeTime,
      sedentaryTime: sedentaryTime,
    };

    const surveyDataJSON = JSON.stringify(surveyData);

      console.log("전송 데이터:", surveyDataJSON);
    if (window.flutter_inappwebview) {
      window.flutter_inappwebview.callHandler('personel-survey', surveyDataJSON)
        .catch(function(error) {
          console.error("Error sending data to Flutter: ", error);
        });
    } else {
      console.error("Flutter InAppWebView is not ready.");
    }
  });
  }else {
  }
});

function formatDate(input) {
  const year = input.slice(0, 4);
  const month = input.slice(4, 6);
  const day = input.slice(6, 8);
  
  return `${year}-${month}-${day}`;
}
