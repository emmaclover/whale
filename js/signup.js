$(function(){
  $(document).ready(function() {
    $('.age-year-input-field').on('input', function() {
      if ($(this).val().length > 4) {
        $(this).val($(this).val().slice(0, 4));  // 4자리 이상 입력 시 잘라냄
      }
    });
  });

  $(document).ready(function() {
    $('.signup-btn').on('click', function() {
      if (window.flutter_inappwebview) {
        window.flutter_inappwebview.callHandler('signup', '회원가입 버튼이 클릭되었습니다.')
          .catch(function(error) {
            console.error("Error sending data to Flutter: ", error);
          });
      } else {
        console.error("Flutter InAppWebView is not ready.");
      }
    });
  });

   // Signin Field
   $('.all-term').on('change', function() {
    // all-ter 모두 체크 선택 and 해제
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
})