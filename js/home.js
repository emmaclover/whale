window.addEventListener("flutterInAppWebViewPlatformReady", function(event) {
  console.log("WebView is ready for communication.");
});

$(document).ready(function() {
    if (window.flutter_inappwebview) {
      window.flutter_inappwebview.callHandler('stepdata').then(function(result) {
        document.querySelector('.step-data').innerText = result;
      });
      window.flutter_inappwebview.callHandler('sleptdata').then(function(result) {
        let hour = Math.floor(Number(result) / 60);
        let min = Math.floor(Number(result) % 60);
          document.querySelector('.sleep-hour').innerText = hour;
          document.querySelector('.sleep-minute').innerText = min;
      });
      window.flutter_inappwebview.callHandler('pearldata').then(function(result) {
          document.querySelector('.pearl-data').innerText = result;
      });
      window.flutter_inappwebview.callHandler('coraldata').then(function(result) {
          document.querySelector('.coral-data').innerText = result;
      });
      window.flutter_inappwebview.callHandler('pearlTradable').then(function(result) {
          document.querySelector('.pearl-tradable').innerText = result;
      });
      window.flutter_inappwebview.callHandler('coralTradable').then(function(result) {
          document.querySelector('.coral-tradable').innerText = result;
      });
      window.flutter_inappwebview.callHandler('pearlTotal').then(function(result) {
          document.querySelectorAll('.pearl-total').forEach(function(element) {
             element.innerText = result;
          });
      });
      window.flutter_inappwebview.callHandler('coralTotal').then(function(result) {
          document.querySelectorAll('.coral-total').forEach(function(element) {
            element.innerText = result;
          });
      });

      window.flutter_inappwebview.callHandler('homecharacter').then(function(result) {
          const applyMap = new Map();

          // Filter items where isApplied is "Y" and store them in applyMap
          result.forEach(function(itemPurchase, index) {
              if(itemPurchase.isApplied == "Y") {
                  applyMap.set(itemPurchase.item.itemCategory.categoryId, itemPurchase.item);
              }
          });

          // Iterate over the applyMap and update/add images
          applyMap.forEach(function(item, category) {
              var existingImg = $('.character-section img[data-category="' + category + '"]');

              if (existingImg.length > 0) {
                  // Update the src of the existing image
                  existingImg.attr('src', 'http://192.168.1.122:3000/uploads/' + item.itemImage);
              } else {
                  // Add a new img tag if it doesn't exist
                  var newImg = '<img src="http://192.168.1.122:3000/uploads/' + item.itemImage + '" alt="" data-category="' + category + '" class="homeItem-img">';
                  $('.character-section').append(newImg); // Append to the character-section div
              }
          });
      }).catch(function(error) {
          console.error("Error fetching homecharacter: ", error);
      });

    } else {
      console.log("Flutter InAppWebView is not ready.");
    }
});