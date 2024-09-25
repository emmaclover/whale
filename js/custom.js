$(function(){
  // Header Include Load
  // $('.header-include').load('../include/header.html')

  $('.header-include').load('../include/header.html', function() {
    // header.html 로드 완료 후 실행될 코드
    var currentPage = window.location.pathname; // 현재 페이지 경로 가져오기

    // 페이지 경로에 따라 h2.logo의 텍스트 변경
    if (currentPage.endsWith("home.html")) {
      $(".header-include .logo").text("잠보기의 하루");
    } else if (currentPage.endsWith("conversion.html")) {
      $(".header-include .logo").text("포인트 전환");
    } else if (currentPage.endsWith("conversion-cp.html")) {
      $(".header-include .logo").text("포인트 전환");
    } else if (currentPage.endsWith("exchange.html")){
      $(".header-include .logo").text("거래소");
    } else {
      $(".header-include .logo").text("잠보기의 하루");
    }
  });


  // GNB Include Load
  $('.gnb-main').load('../include/gnb.html')


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






  // ## home 화면 보유 팝업
  $('.hold-pop-include').load('../include/hold-pop.html', function() {
    

    // 모달 오픈
    $('.own-point').click(function(){
        $('.hold-popup-inner').show();  // .hold-popup-inner 열기
    });

    // 모달 닫기
    $('.popx').click(function(){
        $('.hold-popup-inner').hide();  // .hold-popup-inner 닫기
    });


  });




  // ## Home 화면 포인트 보유 팝업
  $('.po').load('../include/pop.html', function(){

    // 모달 오픈
    $('.save-point').click(function(){
      $('.point-popup-inner').show();
    });

     // 모달 닫기
    $('.point-popx').click(function(){
      $('.point-popup-inner').hide();
    })
  })




  // ### 거래소 진주, 산호 얻기
  $('.btn-get-pearl').click(function(){
    $('.exchange-topearl').show();
    $('.exchange-toleaf').hide();
  })

  $('.btn-get-leaf').click(function(){
    $('.exchange-toleaf').show();
    $('.exchange-topearl').hide();
  })
})