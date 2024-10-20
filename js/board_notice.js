$(document).ready(function () {
    // window.addEventListener("flutterInAppWebViewPlatformReady", function (event) {
    //     console.log("WebView is ready for communication.");
    //   });
    
    window.flutter_inappwebview.callHandler('notice-init', 'notice data init handler call');

    $('.notice-coment').on('click' ,function() {
        if (window.flutter_inappwebview) {
            window.flutter_inappwebview.callHandler('notice')
              .catch(function (error) {
                console.error("Error sending data to Flutter: ", error);
              });
          } else {
            console.error("Flutter InAppWebView is not ready.");
          }
    });

    // ## 메뉴 버튼
    $('.main-menu-include').load('../include/main-menu-bar.html', function () {
        $('.main-category').click(function () {
            $(this).toggleClass('menu-cate-active');
            $(this).next('.sub-category').slideToggle();
        })

        $('.menu-back').click(function () {
            $('.menu-bar').css('display', 'none');
            $('.menu-bar-inner').animate({
                left: -500
            }, 500);
        })


    })
    // ## Board-List 아이템 꾸리기
    var $myQuest = $('.board-list-items').first();
    for (var i = 1; i < 3; i++) {
        var newBoard = $myQuest.clone();
        $('.board-list-items').append(newBoard);
    }

    // ## 게시판 리스트
    $('.board-item-title').click(function () {
        $(this).next('.board-item-detail').slideToggle();
    })

    // ## 공지&이벤트
    $('.notice-title').click(function () {
        $(this).next('.notice-detail').slideToggle();
    })

    // GNB Include Load
    $('.gnb-main').load('../include/gnb.html')
})