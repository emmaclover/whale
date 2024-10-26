
$(document).ready(function () {
  let isPhoneVerified = false;  // 본인인증 여부 상태 변수 추가
  let kcpDecodeData;
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
      isAgreeMarketing: isAgreeMarketing,
      isPhoneVerified: isPhoneVerified,
      kcpDecodeData: kcpDecodeData,
    });

    if (window.flutter_inappwebview) {
      window.flutter_inappwebview.callHandler('signup', signupData)
        .catch(function (error) {
          console.error("Error sending data to Flutter: ", error);
        });
    } else {
      console.error("Flutter InAppWebView is not ready.");
    }
    return false;
  });

  // 버튼 클릭 이벤트 핸들러
  $('.email-check').on('click', function () {
    const emailId = document.getElementById('email-id').value;
    const emailAddress = document.getElementById('email-address').value;
    const emailFullAddress = emailId + "@" + emailAddress;
    const emailSelf = document.getElementById('signup-self').value;
    const email = emailSelf === '' ? emailFullAddress : emailSelf;

    if (window.flutter_inappwebview) {
      window.flutter_inappwebview.callHandler('email-check', email).then(function (result) {
        console.log('isEmailDuplicated', result);

        const emailChkButton = document.getElementsByClassName('email-check');
        if (emailChkButton.length > 0) {
          if (result == true) {
            emailChkButton[0].style.setProperty('background-color', 'yellow', 'important'); // 첫 번째 버튼 색상 변경
          } else {
            emailChkButton[0].style.setProperty('background-color', 'red', 'important'); // 첫 번째 버튼 색상 변경
          }
        }
      })
      return false;
    }
  });

  // 이메일 직접 입력
  $('.signup-email').change(function () {
    if ($(this).val() == 'self') {
      $('.signup-email').hide();
      $('.email-dat').hide();
      $('.signup-id').hide();
      $('.signup-self').show();
    }
  });

  function base64ToUtf8(base64Str) {
    return decodeURIComponent(escape(atob(base64Str)));
  }

  // 이벤트 : 휴대폰 본인인증
  $('.signup-phone-btn').on('click', function () {
    if (window.flutter_inappwebview) {
      window.flutter_inappwebview.callHandler('kcp_page').then(function (result) {
        if (result != null) {
          console.log('kcp result chk from page:', result);
          resultDecode = base64ToUtf8(result);
          const decoded = resultDecode;이상모
          const json = JSON.parse(decoded);

          $('#name-text').text(json["user_name"]);
          $('#birth-text').text(json["birth_day"]);
          kcpDecodeData = json;
          isPhoneVerified = true;
        }
      })
        .catch(function (error) {
          console.error("Error sending data to Flutter: ", error);
        });
    } else {
      console.error("Flutter InAppWebView is not ready.");
    }
  });

  // 전체 약관 체크박스
  $('.all-term').on('change', function () {
    $('.chk-term').prop('checked', $(this).prop('checked'));
  });

  // 개별 체크 시 전체 체크 해제
  $('.chk-term').on('change', function () {
    $('.all-term').prop('checked', $('.chk-term:checked').length === $('.chk-term').length);
  });

  // 약관 팝업 창을 띄우는 코드
  $('.chk-basic').click(function () {
    $('.term-part-basic').show();  // 해당 약관 팝업 보이기
  });

  $('.chk-personal').click(function () {
    $('.term-part-personal').show();  // 해당 약관 팝업 보이기
  });

  $('.chk-marketing').click(function () {
    $('.term-part-marketing').show();  // 해당 약관 팝업 보이기
  });

  // 약관 내용 로드 및 버튼 클릭 시 처리
  $('.term-basic-include').load('../include/term-basic.html', function () {
    $('.btn-term-basic').click(function () {
      $('.term-part-basic').hide();  // 기본 약관 팝업 숨기기
      $('.basic').prop('checked', true);  // 체크박스 체크
    });
  });

  $('.term-personal-include').load('../include/term-personal.html', function () {
    $('.btn-term-personal').click(function () {
      $('.term-part-personal').hide();  // 개인 정보 약관 팝업 숨기기
      $('.chk-term-personal').prop('checked', true);  // 체크박스 체크
    });
  });

  $('.term-marketing-include').load('../include/term-marketing.html', function () {
    $('.btn-term-marketing').click(function () {
      $('.term-part-marketing').hide();  // 마케팅 약관 팝업 숨기기
      $('.chk-term-marketing').prop('checked', true);  // 체크박스 체크
    });
  });
});
