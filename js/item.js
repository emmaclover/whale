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

                $newItem.find('.itemImg').attr('src','http://172.16.1.27:3000/uploads/' + item.itemImage);
                $newItem.find('.itemName').text(item.itemName);
                $newItem.attr('data-item-id', item.itemId);

                $shopItems.append($newItem);
            });

        // ## 아이템 상세 팝업
          $('.item-detail-include').load('../include/item-detail-pop.html', function(){
            $(document).on('click', '.shop-item-img', function(){
              // $('body').addClass('no-scroll');
              console.log("아이템 상세 팝업");
              var clickedItemId = $(this).closest('.shop-item').attr('data-item-id');
              var clickedItem = items.find(item => item.itemId == clickedItemId);

              if (clickedItem) {
                  $('.detailImg').attr('src','http://172.16.1.27:3000/uploads/' + clickedItem.itemImage);
                  $('.detailName').text(clickedItem.itemName);
                  $('.detailCurrency').text(clickedItem.currency);
                  $('.detailPrice').text(clickedItem.itemPrice);
                  $('.detailColor').text(clickedItem.itemColor);
                  $('.detailEffect').text(clickedItem.itemEffect);
                  $('.detailDiscription').text(clickedItem.itemDescription);
              $('.item-detail-inner').show();
            }
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
                    window.flutter_inappwebview.callHandler('buyItem').then(function(result) {
                        $('.shop-cp-inner').show();
                        $('.item-detail-inner').hide();
                    }).catch(function(error) {console.error("Error sending data to Flutter: ", error);});
                })

                $('.keep-shop-btn').click(function(){
                  $('body').removeClass('no-scroll');
                  $('.shop-cp-inner').hide();
                })

                $('.my-shop-btn').click(function(){
                  alert('내 아이템 화면 작업중');
                })
            });
        });
    } else {
    }
});