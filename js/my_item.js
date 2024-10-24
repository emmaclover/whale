window.addEventListener("flutterInAppWebViewPlatformReady", function(event) {
  console.log("WebView is ready for communication.");
});

$(document).ready(function() {
    if (window.flutter_inappwebview) {
        window.flutter_inappwebview.callHandler('myItem').then(function(itemPurchases) {
            var $myItems = $('.mine-items');
            var $myItemTemplate = $('#mine-item-template');
            const applyMap = new Map();

            itemPurchases.forEach(function(itemPurchase, index) {

                var $newItem = $myItemTemplate.clone();
                $newItem.removeAttr('id');
                $newItem.show();
                $newItem.find('.myItemImg').attr('src', 'http://192.168.1.122:3000/uploads/' + itemPurchase.item.itemImage);
                $newItem.find('.myItemName').text(itemPurchase.item.itemName);
                $newItem.attr('data-mine-item-id', itemPurchase.item.itemId);
                $newItem.attr('data-item-category', itemPurchase.item.itemCategory.categoryId);
                $myItems.append($newItem);

                if(itemPurchase.isApplied == "Y"){
                    applyMap.set(itemPurchase.item.itemCategory.categoryId, itemPurchase.item);
                }
            });


            applyMap.forEach(function(item, category) {
                var existingImg = $('.mine-character-img img[data-category="' + category + '"]');

                if (existingImg.length > 0) {
                    // 기존 이미지가 있으면 src 업데이트
                    existingImg.attr('src', 'http://192.168.1.122:3000/uploads/' + item.itemImage);
                } else {
                    // 새 이미지 추가
                    var newImg = '<img src="http://192.168.1.122:3000/uploads/' + item.itemImage + '" alt="" data-category="' + category + '" class="myItem-img">';
                    $('.mine-character-img').append(newImg);
                }
            });

            $('.mine-item').on('click', function() {
                var clickedItemId = $(this).attr('data-mine-item-id');
                var clickedCategory = $(this).attr('data-item-category');

                var clickedItem = itemPurchases.find(item => item.item.itemId == clickedItemId);

                if (clickedItem) {
                    if (applyMap.has(clickedCategory)) {
                        if (applyMap.get(clickedCategory).itemId === clickedItem.item.itemId) {
                            applyMap.delete(clickedCategory);

                            // 캐릭터 이미지 영역에서 해당 카테고리의 이미지 제거
                            $('.mine-character-img img[data-category="' + clickedCategory + '"]').remove();
                        } else {
                            applyMap.set(clickedCategory, clickedItem.item);

                            // 캐릭터 이미지 영역에서 해당 카테고리의 이미지 업데이트
                            var existingImg = $('.mine-character-img img[data-category="' + clickedCategory + '"]');

                            if (existingImg.length > 0) {
                                // 기존 이미지가 있으면 src 업데이트
                                existingImg.attr('src', 'http://192.168.1.122:3000/uploads/' + clickedItem.item.itemImage);
                            }
                        }
                    } else {
                        applyMap.set(clickedCategory, clickedItem.item);

                        // 캐릭터 영역에 해당 카테고리 이미지 적용
                        $('.mine-character-img').append('<img src="http://192.168.1.122:3000/uploads/' + clickedItem.item.itemImage + '" alt="" data-category="' + clickedCategory + '" class="myItem-img">');
                    }
                }

            });

            $('.mine-rollback').on('click', function() {
                applyMap.clear();
                $('.mine-character-img img').not('.fixed-img').remove();
            });

            $('.mine-commit').on('click', function() {
                var itemIdList = [];

                applyMap.forEach(function(value, key) {
                    itemIdList.push(value.itemId);
                });

                window.flutter_inappwebview.callHandler('applyItem', itemIdList).then(function(response) {
                    if (result) {
                        alert('아이템을 적용했습니다.');
                    } else {
                        alert('아이템 적용이 실패했습니다.');
                    }
                }).catch(function(error) {
                    console.error('Flutter로 데이터 전송 실패:', error);
                });
            });

        }).catch(function(error) {
            console.error("Error sending data to Flutter: ", error);
        });
    } else {
        console.log("flutter_inappwebview is not available");
    }
});
