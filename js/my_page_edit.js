window.addEventListener("flutterInAppWebViewPlatformReady", function(event) {
  console.log("WebView is ready for communication.");
});

$(document).ready(function() {
    if (window.flutter_inappwebview) {
        window.flutter_inappwebview.callHandler('userEditData').then(function(user) {

            const jobSelect = document.getElementById('myUserJob');
            jobSelect.value = user.job || "";
            document.getElementById('mySleepTime').value = user.sleepTime ?? "00:00";
            document.getElementById('myWakeTime').value = user.wakeTime ?? "00:00";
            document.getElementById('mySitTime').value = user.sedentaryTime ?? "00:00";
            document.getElementById('myHeight').value = user.height ?? "000";
            document.getElementById('myWeight').value = user.weight ?? null;
            const regionSelect = document.getElementById('myRegion');
            regionSelect.value = user.region || "";

            $('.submit').on('click', function(result) {
                console.log('submit');
                const job = document.getElementById('myUserJob').value || user.job;
                const sleepTime = document.getElementById('mySleepTime').value || user.sleepTime;
                const wakeTime = document.getElementById('myWakeTime').value || user.wakeTime;
                const sedentaryTime = document.getElementById('mySitTime').value || user.sedentaryTime;
                const height = document.getElementById('myHeight').value || user.height || "";
                const weight = document.getElementById('myWeight').value || user.weight || "";
                const region = document.getElementById('myRegion').value || user.region || "";

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

                window.flutter_inappwebview.callHandler('submitUser',editUserJSON).catch(function(error) {
                  console.error("Error sending data to Flutter: ", error);
                });
            });
        });
    } else {
    }
});