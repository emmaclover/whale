$(function(){
  // Header Include Load
  // $('.header-include').load('../include/header.html')

  $('.header-include').load('../include/header.html', function() {
    // header.html 로드 완료 후 실행될 코드
    var currentPage = window.location.pathname; // 현재 페이지 경로 가져오기

    // 페이지 경로에 헤더 타이틀 변경
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


  // ## 메뉴 버튼
  $('.main-menu-include').load('../include/main-menu-bar.html',function(){
      
      

  })




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

    $('.bnt-menu').click(function(){
      $('.menu-bar').show();
    })


  })















  // ## 아이템 상세 팝업
  $('.item-detail-include').load('../include/item-detail-pop.html', function(){
    $('.shop-item-img').click(function(){
      $('body').addClass('no-scroll');
      $('.item-detail-inner').show();
    })

    $('.detail-pop-x').click(function(){
      $('body').removeClass('no-scroll');
      $('.item-detail-inner').hide();
    })

    $('.item-shop-cancel').click(function(){
      $('body').removeClass('no-scroll');
      $('.item-detail-inner').hide();
    })

    $('.item-shop-success').click(function(){
      $('.shop-cp-inner').show();
      $('.item-detail-inner').hide();
    })

    $('.keep-shop-btn').click(function(){
      $('body').removeClass('no-scroll');
      $('.shop-cp-inner').hide();
    })

    $('.my-shop-btn').click(function(){
      alert('내 아이템 화면 작업중');
    })
  });






  // ### 거래소 진주, 산호 얻기
  $('.btn-get-pearl').click(function(){
    $('.exchange-topearl').show();
    $('.exchange-toleaf').hide();
  })

  $('.btn-get-leaf').click(function(){
    $('.exchange-toleaf').show();
    $('.exchange-topearl').hide();
  })



  // ### 거래소 교환하기 팝업
  $('.change-popup-include').load('../include/exchange-pop.html', function(){

    // 모달 오픈
    $('.btn-toleaf').click(function(){
      $('.ch-pop-inner').show();
    })

    $('.btn-topearl').click(function(){
      $('.ch-pop-inner').show();
    })

    // 모달 닫기
    $('.ch-popx').click(function(){
      $('.ch-pop-inner').hide();
    })

    $('.ch-popx').click(function(){
      $('.ch-pop-inner').hide();
    })

    $('.btn-cancel').click(function(){
      $('.ch-pop-inner').hide();
    })
  })




  // ## Item-shop 아이템 꾸리기
  var $item = $('.shop-item').first();
  for(var i = 1; i <= 26; i++){
    var newItem =$item.clone();
    $('.shop-items').append(newItem)
  }


  // ## Mine-item 아이템 꾸리기
  var $myitem = $('.mine-item').first();
  for(var i = 1; i < 24; i++){
    var newMine = $myitem.clone();
    $('.mine-items').append(newMine)
  }


})