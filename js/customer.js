$(function () {
    // GNB Include Load
//    $('.gnb-main').load('../include/gnb.html')

    $('.bnt-board-img').on('click', function() {
        window.flutter_inappwebview.callHandler('imagePicker').then(function(imgPath) {
            if (imgPath) {
                $('#button-image').attr('src', imgPath);
            }
        });
    });

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
            var $questionContainer = $('.board-list-inner');  // 공지사항 항목을 추가할 컨테이너
            var $itemTemplate = $('#questions-template');  // 템플릿 요소 가져오기

            questionList.forEach(function (item, index) {
                var $newItem = $itemTemplate.clone();  // 템플릿을 복제
                $newItem.removeAttr('id');  // 템플릿의 id 제거
                $newItem.show();  // 복제한 템플릿을 표시

                // 템플릿 요소에 데이터 삽입
                $newItem.find('#question-title').text(item.customerTitle || '제목없음');
                $newItem.find('#question-date').text(new Date(item.requestTime).toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                }).replace(/\s/g, '').replace(/\.$/, '') || '날짜없음');
                $newItem.find('#question-is-replied').text(item.isReplied == 'N' ? "답변대기" : "답변완료");

                // 공지사항 항목 클릭 이벤트
                $newItem.on('click', function () {
                    // notice-detail이 보이도록 토글
                    var $questionDetail = $(this).find('.board-item-detail');
                    $questionDetail.slideToggle();

                    // 세부 내용을 업데이트 (필요시 추가 데이터를 여기에 삽입)
                    $questionDetail.find('#question-content').text(item.customerQuestion);
                    $questionDetail.find('#question-answer').text(item.customerAnswer != null ? item.customerAnswer : "");
                    if (item.customerImage) {
                        $newItem.find('#board-image').attr('src', 'https://api.zamvoki.com/' + item.customerImage);
                        $newItem.find('.board-img').css('display', 'block');
                    } else {
                        $newItem.find('#board-image').remove(); // 이미지 태그를 삭제 또는 숨김 처리
                    }
                });
                // 새로운 아이템을 DOM에 추가
                $('.board-notice-inner').append($newItem);
                // 공지사항 컨테이너에 새 항목 추가
                $questionContainer.append($newItem);
            });
        }).catch(function (error) {
            console.error('Failed to fetch notifications:', error);
        });
    } else {
        console.error("Flutter InAppWebView is not available.");
    }

    $("#question-submit").on('click', function () {
        const questionTitle = $("#question-title").val();
        const questionContent = $("#question-content").val();
        customerData = JSON.stringify({
            customerTitle: questionTitle || null,
            customerQuestion: questionContent || null
        });

        if (window.flutter_inappwebview) {
            window.flutter_inappwebview.callHandler('question', customerData).then(function (response) {
            }).catch(function (error) {
                console.error('Failed to fetch notifications:', error);
            });
        } else {
            console.error("Flutter InAppWebView is not available.");
        }
    });

});