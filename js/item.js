window.addEventListener("flutterInAppWebViewPlatformReady", function(event) {
    console.log("WebView is ready for communication.");
});

$(document).ready(function() {
    if (window.flutter_inappwebview) {
        window.flutter_inappwebview.callHandler('shopItem').then(function(items) {


            var $shopItems = $('.shop-items');
            var $itemTemplate = $('#item-template');

            items.forEach(function(item, index) {
                var $newItem = $itemTemplate.clone();
                $newItem.removeAttr('id');
                $newItem.show();

                $newItem.find('.itemImg').attr('src', 'http://192.168.1.122:3000/uploads/' + item.itemImage);
                $newItem.find('.itemName').text(item.itemName);
                $newItem.attr('data-item-id', item.itemId);

                $shopItems.append($newItem);
            });

            $('.item-detail-include').load('../include/item-detail-pop.html', function() {
                var clickedItemId = null;
                $(document).on('click', '.shop-item-img', function() {
                    clickedItemId = $(this).closest('.shop-item').attr('data-item-id');
                    var clickedItem = items.find(item => item.itemId == clickedItemId);

                    if (clickedItem) {
                    console.log("Clicked Item ID1: ", clickedItemId);
                        $('.detailImg').attr('src', 'http://192.168.1.122:3000/uploads/' + clickedItem.itemImage);
                        $('.detailName').text(clickedItem.itemName);
                        $('.detailCurrency').text(clickedItem.currency);
                        $('.detailPrice').text(clickedItem.itemPrice);
                        $('.detailColor').text(clickedItem.itemColor);
                        $('.detailEffect').text(clickedItem.itemEffect);
                        $('.detailDiscription').text(clickedItem.itemDescription);
                        $('.item-detail-inner').show();
                    }
                });

                $('.detail-pop-x, .item-shop-cancel').click(function() {
                    $('body').removeClass('no-scroll');
                    $('.item-detail-inner').hide();
                });

                $('.item-shop-success').on('click', function() {
                    var clickedItem = items.find(item => item.itemId == clickedItemId);

                    var clickedItem = items.find(item => item.itemId == clickedItemId);

                    if (clickedItem) {
                        window.flutter_inappwebview.callHandler('buyItem', clickedItemId).then(function(result) {
                            if (result) {
                                $('.shop-cp-title p:first').text(clickedItem.itemName);
                                $('.shop-cp-inner').show();
                                $('.item-detail-inner').hide();
                            } else {
                                alert('아이템 재고가 부족합니다.');
                            }
                        }).catch(function(error) {
                            console.error("Error calling buyItem: ", error);
                        });
                    } else {
                        console.error("No item found with ID: ", clickedItemId);
                    }
                });

                $('.keep-shop-btn').click(function() {
                    $('body').removeClass('no-scroll');
                    $('.shop-cp-inner').hide();
                });

                $('.my-shop-btn').click(function() {

                });
            });
        }).catch(function(error) {
            console.error("Error loading items: ", error);
        });
    } else {
        console.error("flutter_inappwebview is not available");
    }
});