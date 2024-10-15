// flutterInAppWebViewPlatformReady 이벤트 리스너
window.addEventListener("flutterInAppWebViewPlatformReady", function(event) {
  console.log("WebView is ready for communication.");
});

$(document).ready(function() {
  $('.signup-btn').on('click', function() {
    const password = document.getElementById('password').value;
    const passwordChk = document.getElementById('password-chk').value;
    const emailId = document.getElementById('email-id').value;
    const emailAddress = document.getElementById('email-address').value;
    const email = emailId + "@" + emailAddress;

    const signupData = JSON.stringify({
      email: email,
      password: password,
      passwordChk: passwordChk
    });

    if (window.flutter_inappwebview) {
        window.flutter_inappwebview.callHandler('signup', signupData)
        .catch(function(error) {
          console.error("Error sending data to Flutter: ", error);
        });
    } else {
      console.error("Flutter InAppWebView is not ready.");
    }
  });
});

$(function(){

   // Signin Field
   $('.all-term').on('change', function() {
    // all-term 모두 체크 선택 and 해제
    $('.chk-term').prop('checked', $(this).prop('checked'));
  });

  // 개별 체크 시 전체 체크 해제
  $('.chk-term').on('change', function() {
    if ($('.chk-term:checked').length === $('.chk-term').length) {
      $('.all-term').prop('checked', true);
    } else {
      $('.all-term').prop('checked', false);
    }
  });

  $('.chk-basic').click(function(){
    $('.term-part-basic').show();
  })

  $('.chk-personal').click(function(){
    $('.term-part-personal').show();
  })

  // 약관동의 체크
  $('.term-basic-include').load('../include/term-basic.html', function(){
    $('.btn-term-personal').click(function(){
      $('.term-part').css('display','none');
    })
  })

  $('.term-personal-include').load('../include/term-personal.html', function(){
    $('.btn-term-personal').click(function(){
      $('.term-part').css('display','none');
    })
  })
  
})
