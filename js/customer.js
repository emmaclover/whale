$(function () {
    $('.header-include').load('../include/header.html', function () {
        // header.html 로드 완료 후 실행될 코드
        var currentPage = window.location.pathname; // 현재 페이지 경로 가져오기

        // 페이지 경로에 헤더 타이틀 변경
        if (currentPage.endsWith("home.html")) {
            $(".header-include .logo").text("잠보기의 하루");
        } else if (currentPage.endsWith("conversion.html")) {
            $(".header-include .logo").text("포인트 전환");
        } else if (currentPage.endsWith("conversion-cp.html")) {
            $(".header-include .logo").text("포인트 전환");
        } else if (currentPage.endsWith("exchange.html")) {
            $(".header-include .logo").text("거래소");
        } else if (currentPage.endsWith("my-page.html")) {
            $(".header-include .logo").text("마이페이지");
        } else if (currentPage.endsWith("my-page-update.html")) {
            $(".header-include .logo").text("마이페이지");
        } else if (currentPage.endsWith("quit-app.html")) {
            $(".header-include .logo").text("탈퇴하기");
        } else if (currentPage.endsWith("board-list.html")) {
            $(".header-include .logo").text("1:1 문의하기");
        } else if (currentPage.endsWith("board-basic-write.html")) {
            $(".header-include .logo").text("1:1 문의하기");
        } else if (currentPage.endsWith("board-notice.html")) {
            $(".header-include .logo").text("공지 및 이벤트");
        } else if (currentPage.endsWith("board-faq.html")) {
            $(".header-include .logo").text("자주 묻는 질문");
        } else {
            $(".header-include .logo").text("잠보기의 하루");
        }


        $('.bnt-menu').click(function () {
            $('.menu-bar').show();
            $('.menu-bar-inner').animate({
                left: 0
            }, 500);
        });
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

    // GNB Include Load
    $('.gnb-main').load('../include/gnb.html')

    // ## Board-List 아이템 꾸리기
    var $myQuest = $('.board-list-items').first();
    for (var i = 1; i < 3; i++) {
        var newBoard = $myQuest.clone();
        $('.board-list-items').append(newBoard);
    }

    // ## 게시판 리스트
    $('.board-item-title').click(function () {
        $(this).next('.board-item-detail').slideToggle();
    });

    // ## 공지&이벤트
    $('.notice-title').click(function () {
        $(this).next('.notice-detail').slideToggle();
    });

    if (window.flutter_inappwebview) {
        window.flutter_inappwebview.callHandler('question-list').then(function (questionList) {
            var $noticeContainer = $('.board-notice-inner');  // 공지사항 항목을 추가할 컨테이너
            var $itemTemplate = $('#notice-template');  // 템플릿 요소 가져오기

            questionList.forEach(function (item, index) {
                var $newItem = $itemTemplate.clone();  // 템플릿을 복제
                $newItem.removeAttr('id');  // 템플릿의 id 제거
                $newItem.show();  // 복제한 템플릿을 표시

                // 템플릿 요소에 데이터 삽입
                $newItem.find('.notice-main-title p').text(item.title || '제목 없음');  // 제목 삽입
                $newItem.find('.notice-partof p').text(item.category.categoryName || '제목 없음');  // 제목 삽입
                $newItem.find('.notice-date p').text(new Date(item.postTime).toLocaleDateString());  // 날짜 형식 변환 후 삽입
                $newItem.find('.notice-text p').html(item.content || '내용 없음');  // 내용 삽입

                // 공지사항 항목 클릭 이벤트
                $newItem.on('click', function () {
                    // notice-detail이 보이도록 토글
                    var $noticeDetail = $(this).find('.notice-detail');
                    $noticeDetail.slideToggle();

                    // 세부 내용을 업데이트 (필요시 추가 데이터를 여기에 삽입)
                    $noticeDetail.find('.notice-text p').html(item.content)
                    console.log(item.content.length);

                });
                // 새로운 아이템을 DOM에 추가
                $('.board-notice-inner').append($newItem);
                // 공지사항 컨테이너에 새 항목 추가
                $noticeContainer.append($newItem);
            });
        }).catch(function (error) {
            console.error('Failed to fetch notifications:', error);
        });
    } else {
        console.error("Flutter InAppWebView is not available.");
    }

    $("#question-title").on('input', function () {
        const questionTitle = $(this).val();
        console.log(questionTitle);
        if (window.flutter_inappwebview) {
            window.flutter_inappwebview.callHandler('question', questionTitle).then(function (response) {
            }).catch(function (error) {
                console.error('Failed to fetch notifications:', error);
            });
        } else {
            console.error("Flutter InAppWebView is not available.");
        }
    });

    $("#question-content").on('input', function () {
        const questionContent = $(this).val();
        console.log(questionContent);
        if (window.flutter_inappwebview) {
            window.flutter_inappwebview.callHandler('question', questionContent).then(function (response) {
            }).catch(function (error) {
                console.error('Failed to fetch notifications:', error);
            });
        } else {
            console.error("Flutter InAppWebView is not available.");
        }
    });

});