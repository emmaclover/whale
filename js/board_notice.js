
$(function () {

    if (window.flutter_inappwebview) {
        window.flutter_inappwebview.callHandler('board-notice').then(function (noticeList) {
            var $noticeContainer = $('.board-notice-inner');
            var $itemTemplate = $('#notice-template');

            noticeList.forEach(function (item, index) {
                var $newItem = $itemTemplate.clone();
                $newItem.removeAttr('id');
                $newItem.show();

                $newItem.find('.notice-main-title p').text(item.title || '제목 없음');
                $newItem.find('.notice-partof p').text(item.category.categoryName || '제목 없음');
                $newItem.find('.notice-date p').text(new Date(item.postTime).toLocaleDateString());
                $newItem.find('.notice-text p').html(item.content || '내용 없음');

                $newItem.on('click', function () {
                    // notice-detail이 보이도록 토글
                    var $noticeDetail = $(this).find('.notice-detail');
                    $noticeDetail.slideToggle();

                    // 세부 내용을 업데이트 (필요시 추가 데이터를 여기에 삽입)
                    $noticeDetail.find('.notice-text p').html(item.content)
                    console.log(item.content.length);

                });
                $('.board-notice-inner').append($newItem);
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




    // ## 게시판 리스트
    $('.board-item-title').click(function () {
        $(this).next('.board-item-detail').slideToggle();
    })

    // ## 공지&이벤트
    $('.notice-title').click(function () {
        $(this).next('.notice-detail').slideToggle();
    })
});