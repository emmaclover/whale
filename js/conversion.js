window.addEventListener("flutterInAppWebViewPlatformReady", function(event) {
  console.log("WebView is ready for communication.");
});

$(document).ready(function() {
    if (window.flutter_inappwebview) {
        window.flutter_inappwebview.callHandler('tradablePoint').then(function(result) {
        console.log(result);
            document.querySelector('.point-font-color').innerText = result;
        });


      $('#conversionInput').on('input', function () {
          const inputValue = parseInt($(this).val()) || 0;
          console.log(parseInt($(this).val()));

          const pearlTotal = parseInt($('.pearl-total').text()) || 0;
          const coralTotal = parseInt($('.coral-total').text()) || 0;

          const convertPearl = Math.min(inputValue, pearlTotal);
          const convertCoral = Math.min(inputValue, coralTotal);

          $('.convertPearl').text(convertPearl);
          $('.convertCoral').text(convertCoral);
        });

        $('.point-btn').on('click', function() {
            const inputValue = parseInt($('#conversionInput').val()) || 0;
            console.log("pointExchange with inputValue:", inputValue);
            window.flutter_inappwebview.callHandler('pointExchange', inputValue).then(function(result) {
               console.log("pointresult");
               console.log(result);
               if(result){
                window.location.href = `../html/conversion-cp.html?inputValue=${inputValue}`;
               }
            }).catch(function(error) {console.error("Error sending data to Flutter: ", error);});
        });

        function getQueryParam(param) {
                const urlParams = new URLSearchParams(window.location.search);
                return urlParams.get(param);
            }

            const inputValue = getQueryParam('inputValue') || 0;
            const pearlTotal = inputValue;
            const coralTotal = inputValue;
            const convertedPoint = inputValue;

            $('#pearlAmount').text(Number(pearlTotal).toLocaleString());
            $('#coralAmount').text(Number(coralTotal).toLocaleString());
            $('#convertedPoint').text(Number(pearlTotal).toLocaleString());

    } else {
    }
});
