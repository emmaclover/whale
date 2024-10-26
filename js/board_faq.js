
$(function () {
    if (window.flutter_inappwebview) {
        window.flutter_inappwebview.callHandler('board-faq').then(function (noticeList) {
            var $noticeContainer = $('.board-notice-inner');  // 공지사항 항목을 추가할 컨테이너
            var $itemTemplate = $('#notice-template');  // 템플릿 요소 가져오기

            noticeList.forEach(function (item, index) {
                var $newItem = $itemTemplate.clone();  // 템플릿을 복제
                $newItem.removeAttr('id');  // 템플릿의 id 제거
                $newItem.show();  // 복제한 템플릿을 표시

                // 템플릿 요소에 데이터 삽입
                $newItem.find('.notice-main-title p').text(item.faqQuestion || '제목 없음');  // 제목 삽입
                $newItem.find('.notice-partof p').text(item.category.categoryName || '제목 없음');  // 제목 삽입
                $newItem.find('.notice-date p').text(new Date(item.createTime).toLocaleDateString());  // 날짜 형식 변환 후 삽입
                $newItem.find('.notice-text p').html(item.faqAnswer || '내용 없음');  // 내용 삽입

                // 공지사항 항목 클릭 이벤트
                $newItem.on('click', function () {
                    // notice-detail이 보이도록 토글
                    var $noticeDetail = $(this).find('.notice-detail');
                    $noticeDetail.slideToggle();

                    // 세부 내용을 업데이트 (필요시 추가 데이터를 여기에 삽입)
                    $noticeDetail.find('.notice-text p').html(item.faqAnswer)
                    console.log(item.faqAnswer.length);

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


    // ## Board-List 아이템 꾸리기
    var $myQuest = $('.board-list-items').first();
    for (var i = 1; i < 3; i++) {
        var newBoard = $myQuest.clone();
        $('.board-list-items').append(newBoard);
    }

});