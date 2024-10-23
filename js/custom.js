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
    } else if (currentPage.endsWith("my-page.html")){
      $(".header-include .logo").text("마이페이지");
    } else if (currentPage.endsWith("my-page-update.html")){
      $(".header-include .logo").text("마이페이지");
    } else if (currentPage.endsWith("quit-app.html")){
      $(".header-include .logo").text("탈퇴하기");
    } else if (currentPage.endsWith("board-list.html")){
      $(".header-include .logo").text("1:1 문의하기");
    }  else if (currentPage.endsWith("board-basic-write.html")){
      $(".header-include .logo").text("1:1 문의하기");
    } else if (currentPage.endsWith("board-notice.html")){
      $(".header-include .logo").text("공지 및 이벤트");
    } else if (currentPage.endsWith("board-faq.html")){
      $(".header-include .logo").text("자주 묻는 질문");
    } else { 
      $(".header-include .logo").text("잠보기의 하루");
    }

    
    $('.bnt-menu').click(function(){
      $('.menu-bar').show();
      $('.menu-bar-inner').animate({
        left:0
      }, 500);
    })
  


  });


  // GNB Include Load
  $('.gnb-main').load('../include/gnb.html')




   // Signin Field
  $('.signup-email').change(function(){
    if($(this).val() == 'self'){
      $('.signup-email').hide();
      $('.email-dat').hide();
      $('.signup-id').hide();
      $('.signup-self').show();
    }
  })


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


  // 약관팝업 창. 띄우는 거 
  $('.chk-basic').click(function(){
    $('.term-part-basic').show();
  })

  $('.chk-personal').click(function(){
    $('.term-part-personal').show();
  })

  $('.chk-marketing').click(function(){
    $('.term-part-marketing').show();
  })

  
  // 약관동의 display 없애기 
  $('.term-basic-include').load('../include/term-basic.html', function(){
    $('.btn-term-basic').click(function(){
      $('.term-part').css('display','none');
      $('.basic').prop('checked', true);
    })
  })

  $('.term-personal-include').load('../include/term-personal.html', function(){
    $('.btn-term-personal').click(function(){
      $('.term-part').css('display','none');
      $('.chk-term-personal').prop('checked', true);
    })
  })

  $('.term-marketing-include').load('../include/term-marketing.html',function(){
    $('.btn-term-marketing').click(function(){
      $('.term-part').css('display','none');
      $('.chk-term-marketing').prop('checked', true);
    })
  })


  // ## home 튜토리얼
  $('.tutorial-include').load('../include/tutorial.html', function(){

  });

  $('.tutorial-nickname-include').load('../include/tutorial-nick.html', function(){

  })

  $('.tutorial-end-include').load('../include/tutorial-end.html', function(){
    
  })


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
      
      $('.main-category').click(function(){
        $(this).toggleClass('menu-cate-active');
        $(this).next('.sub-category').slideToggle();
      })

      $('.menu-back').click(function(){
        $('.menu-bar').css('display','none');
        $('.menu-bar-inner').animate({
          left: -500
        }, 500);
      })


  })

  
  // ## Board-List 아이템 꾸리기
  var $myQuest = $('.board-list-items').first();
  for(var i = 1; i < 3; i++){
    var newBoard = $myQuest.clone();
    $('.board-list-items').append(newBoard);
  }



  
  // ## 게시판 리스트
  $('.board-item-title').click(function(){
    $(this).next('.board-item-detail').slideToggle();
  })

  // ## 공지&이벤트
  $('.notice-title').click(function(){
    $(this).next('.notice-detail').slideToggle();
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



  })

  // ## 아이템 상세 팝업
  $('.item-detail-include').load('../include/item-detail-pop.html', function(){
    $('.shop-item-img').click(function(){
      // $('body').addClass('no-scroll');
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
      // $('body').addClass('no-scroll');
    })

    $('.btn-topearl').click(function(){
      $('.ch-pop-inner').show();
      // $('body').addClass('no-scroll');
    })

    // 모달 닫기
    $('.ch-popx').click(function(){
      $('.ch-pop-inner').hide();
      // $('body').removeClass('no-scroll');
    })

    $('.ch-popx').click(function(){
      $('.ch-pop-inner').hide();
      $('body').removeClass('no-scroll');
    })

    $('.btn-cancel').click(function(){
      $('.ch-pop-inner').hide();
      $('body').removeClass('no-scroll');
    })

//    $('.btn-chack').click(function(){
//      alert('교환하기 확인되었습니다. (기능구현중)');
//    })
  })





  // ## 마이페이지
  
  $('.user-logout').click(function(){
    $('.user-logout-pop').show();
  })

  
  // 로그아웃 팝업
  $('.logout-pop-include').load("../include/logout-pop.html",function(){
    $('.btn-logout-cancel').click(function(){
      $('.user-logout-pop').hide();
    })

    $('.btn-logout-basic').click(function(){
      alert('...로그아웃 기능 구현중....');
    })
  })




  // ### 탈퇴하기
  $('.btm-quit-app').click(function(){
    $('.quit-pop').show();
  })

  $('.quit-app-pop-include').load("../include/quit-pop.html", function(){
    $('.bnt-quit-back').click(function(){
      $('.quit-pop').hide();
    })

    $('.bnt-quit-too').click(function(){
      alert('...탈퇴하기 기능 구현중...')
    })
  })





  // ### 공지 및 이벤트 







  // ## Item-shop 아이템 꾸리기
  var $item = $('.shop-item').first();
  for(var i = 1; i <= 26; i++){
    var newItem =$item.clone();
    $('.shop-items').append(newItem)
  }


  // ## Mine-item 아이템 꾸리기
  var $myitem = $('.mine-item').first();
  for(var i = 1; i < 10; i++){
    var newMine = $myitem.clone();
    $('.mine-items').append(newMine)
  }

  

  $('.mine-items').on('click', '.mine-item-img', function(){
    $('.mine-item-img').css('border','none');

    $(this).css('border', '2px solid red');
  })

})