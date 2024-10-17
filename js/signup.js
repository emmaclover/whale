// flutterInAppWebViewPlatformReady 이벤트 리스너
window.addEventListener("flutterInAppWebViewPlatformReady", function (event) {
  console.log("WebView is ready for communication.");
});

$(document).ready(function () {

  // 이벤트 : 회원 가입하기 버튼
  $('.signup-btn').on('click', function () {
    const password = document.getElementById('password').value;
    const passwordChk = document.getElementById('password-chk').value;
    const emailId = document.getElementById('email-id').value;
    const emailAddress = document.getElementById('email-address').value;
    const emailFullAddress = emailId + "@" + emailAddress;
    const emailSelf = document.getElementById('signup-self').value;
    const email = emailSelf == '' ? emailFullAddress : emailSelf;
    
    const isAgreeTerms = document.getElementById('is_agree_terms').checked ? true : false;
    const isAgreePrivacy = document.getElementById('is_agree_privacy').checked ? true : false;
    const isAgreeMarketing = document.getElementById('is_agree_marketing').checked ? true : false;

    const signupData = JSON.stringify({
      email: email,
      password: password,
      passwordChk: passwordChk,
      isAgreeTerms: isAgreeTerms,
      isAgreePrivacy: isAgreePrivacy,
      isAgreeMarketing: isAgreeMarketing
    });

    if (window.flutter_inappwebview) {
      window.flutter_inappwebview.callHandler('signup', signupData)
        .catch(function (error) {
          console.error("Error sending data to Flutter: ", error);
        });
    } else {
      console.error("Flutter InAppWebView is not ready.");
    }
  });

  // 이메일 중복 체크
  $('.email-check').on('click', function () {
    const emailId = document.getElementById('email-id').value;
    const emailAddress = document.getElementById('email-address').value;
    const emailFullAddress = emailId + "@" + emailAddress;
    const emailSelf = document.getElementById('signup-self').value;
    const email = emailSelf == '' ? emailFullAddress : emailSelf;

    if (window.flutter_inappwebview) {
      window.flutter_inappwebview.callHandler('email-check', email)
        .catch(function (error) {
          console.error("Error sending data to Flutter: ", error);
        });
    } else {
      console.error("Flutter InAppWebView is not ready.");
    }
  })

  // 이메일 직접 입력
  $('.signup-email').change(function () {
    if ($(this).val() == 'self') {
      $('.signup-email').hide();
      $('.email-dat').hide();
      $('.signup-id').hide();
      $('.signup-self').show();
    }
  })

  // 이벤트 : 휴대폰 본인인증
  $('.signup-phone-btn').on('click', function () {
    if (window.flutter_inappwebview) {
      window.flutter_inappwebview.callHandler('kcp')
        .catch(function (error) {
          console.error("Error sending data to Flutter: ", error);
        });
    } else {
      console.error("Flutter InAppWebView is not ready.");
    }
  });

  // 약관동의 체크박스
  $('.all-term').on('change', function () {
    // all-term 모두 체크 선택 and 해제
    $('.chk-term').prop('checked', $(this).prop('checked'));
    if (window.flutter_inappwebview) {
      window.flutter_inappwebview.callHandler('')
    }
  });

  // 개별 체크 시 전체 체크 해제
  $('.chk-term').on('change', function () {
    if ($('.chk-term:checked').length === $('.chk-term').length) {
      $('.all-term').prop('checked', true);
    } else {
      $('.all-term').prop('checked', false);
    }
  });

  // 약관동의 display 없애기 
  $('.term-basic-include').load('../include/term-basic.html', function () {
    $('.btn-term-basic').click(function () {
      $('.term-part').css('display', 'none');
      $('.basic').prop('checked', true);
    })
  })

  $('.term-personal-include').load('../include/term-personal.html', function () {
    $('.btn-term-personal').click(function () {
      $('.term-part').css('display', 'none');
      $('.chk-term-personal').prop('checked', true);
    })
  })

  $('.term-marketing-include').load('../include/term-marketing.html', function () {
    $('.btn-term-marketing').click(function () {
      $('.term-part').css('display', 'none');
      $('.chk-term-marketing').prop('checked', true);
    })
  })

  // 이벤트 : 약관동의 팝업
  $('.chk-basic').click(function () {
    $('.term-part-basic').show();
  })

  $('.chk-personal').click(function () {
    $('.term-part-personal').show();
  })

  $('.chk-marketing').click(function () {
    $('.term-part-marketing').show();
  })
});
