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

                $newItem.find('.itemImg').attr('src', 'https://admin.zamvoki.com/uploads/' + item.itemImage);
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
                        $('.detailImg').attr('src', 'https://admin.zamvoki.com/uploads/' + clickedItem.itemImage2);
                        $('.detailName').text(clickedItem.itemName);
                        $('.detailCurrency').text(clickedItem.currency === "pearl" ? "진주" : "산호");
                        $('.detailPrice').text(clickedItem.itemPrice);
                        $('.detailColor').text(clickedItem.itemColor);
                        $('.detailEffect').text(clickedItem.itemEffect);
                        $('.detailDiscription').text(clickedItem.itemDescription);
                        if (clickedItem.itemAdditional && Object.keys(clickedItem.itemAdditional).length > 0) {
                            $('.item-details .additional-info').remove();

                            $.each(clickedItem.itemAdditional, function(key, value) {
                                var cleanKey = key.replace(/"/g, '');
                                var cleanValue = value.replace(/"/g, '');
                                var additionalInfo = `
                                    <p class="additional-info">${cleanKey} : <span>${cleanValue}</span></p>
                                `;
                                $('.item-details').append(additionalInfo);
                            });
                        }
                        $('.item-detail-inner').show();
                    }
                });

                $('.detail-pop-x, .item-shop-cancel').click(function() {
                    $('body').removeClass('no-scroll');
                    $('.item-detail-inner').hide();
                });

                $('.item-shop-success').on('click', function() {
                    var clickedItem = items.find(item => item.itemId == clickedItemId);

                    if (clickedItem) {
                        window.flutter_inappwebview.callHandler('buyItem', clickedItem).then(function(result) {
                            if (result) {
                                $('.shop-cp-title p:first').text(clickedItem.itemName);
                                $('.shop-cp-inner').show();
                                $('.item-detail-inner').hide();
                            } else if (!result){
                                alert('보유하신 진주/산호 수량이 부족합니다.');
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
