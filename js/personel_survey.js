window.addEventListener("flutterInAppWebViewPlatformReady", function(event) {
  console.log("WebView is ready for communication.");
});

$(document).ready(function() {

  $('.enter-btn').on('click', function() {
    // const name = document.getElementById('userName').value;
    // const gender = document.querySelector('gender')?.value;
    // const birthday = document.getElementById('birthDate').value;
    const job = document.getElementById('userJob').value;
    const sleepTime = document.getElementById('sleepTime').value;
    const wakeTime = document.getElementById('wakeTime').value;
    const sedentaryTime = document.getElementById('sitTime').value;

    const surveyData = {
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
});

function formatDate(input) {
  // 입력받은 문자열을 연도, 월, 일로 나누기
  const year = input.slice(0, 4);
  const month = input.slice(4, 6);
  const day = input.slice(6, 8);
  
  // YYYY-MM-DD 형식으로 변환
  return `${year}-${month}-${day}`;
}

const inputDate = "19910318";
const formattedDate = formatDate(inputDate);

console.log(formattedDate);  // "1991-03-18"