$(function(){
  // Header Include Load
  $('.header-include').load('/include/header.html')

  // GNB Include Load
  $('.gnb-main').load('/include/gnb.html')



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