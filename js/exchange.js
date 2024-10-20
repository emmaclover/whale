window.addEventListener("flutterInAppWebViewPlatformReady", function(event) {
  console.log("WebView is ready for communication.");
});

$(document).ready(function() {
    let selectedType = '';

    if (window.flutter_inappwebview) {
        window.flutter_inappwebview.callHandler('exchangeRatio').then(function(result) {
            document.querySelector('.exchangeRatio').innerText = result;
        });

    // 진주얻기
    window.getPearl = function() {
        const exchangePearlInput = document.getElementById('exchangePearlInput').value;
        window.flutter_inappwebview.callHandler('exchangePearlInput', exchangePearlInput).then(function(result) {
            selectedType = 'pearl';
            if (!isNaN(exchangePearlInput) && exchangePearlInput !== '') {
                  const coralValue = result;
                  document.getElementById('exchangedCoralInput').placeholder = coralValue;
            } else {
              document.getElementById('exchangedCoralInput').placeholder = '0';
            }
        });
    }

    // 진주로 교환하기
    $('.btn-topearl').on('click', function() {
        window.flutter_inappwebview.callHandler('coralToPearl').then(function(result) {
        console.log('afterPearlTotal', result['afterPearlTotal']);
        console.log('afterCoralTotal', result['afterCoralTotal']);
        console.log('afterTradablePearl', result['afterTradablePearl']);
        console.log('afterTradableCoral', result['afterTradableCoral']);
            document.querySelector('.afterPearlTotal').innerText = result['afterPearlTotal'];
            document.querySelector('.afterCoralTotal').innerText = result['afterCoralTotal'];
            document.querySelector('.afterTradablePearl').innerText = result['afterTradablePearl'];
            document.querySelector('.afterTradableCoral').innerText = result['afterTradableCoral'];
        }).catch(function(error) {console.error("Error sending data to Flutter: ", error);});
    });

        $('.btn-check').on('click', function() {
            window.flutter_inappwebview.callHandler('postExchange', selectedType)(function(result) {
               if(result){alert('교환이 완료되었습니다.');} else {alert('교환이 실패하였습니다.');}
            }).catch(function(error) {console.error("Error sending data to Flutter: ", error);});
        });

    // 산호 얻기
    window.getCoral = function() {
        const exchangeCoralInput = document.getElementById('exchangeCoralInput').value;
        window.flutter_inappwebview.callHandler('exchangeCoralInput', exchangeCoralInput).then(function(result) {
            selectedType = 'coral';
            if (!isNaN(exchangeCoralInput) && exchangeCoralInput !== '') {
                  const pearlValue = result;
                  document.getElementById('exchangedPearlInput').placeholder = pearlValue;
            } else {document.getElementById('exchangedPearlInput').placeholder = '0';}
        });
    }

    // 산호로 교환하기
    $('.btn-toleaf').on('click', function() {
        window.flutter_inappwebview.callHandler('pearlToCoral').then(function(result) {
        console.log('result', result);
            document.querySelector('.afterPearlTotal').innerText = result['afterPearlTotal'];
            document.querySelector('.afterCoralTotal').innerText = result['afterCoralTotal'];
            document.querySelector('.afterTradablePearl').innerText = result['afterTradablePearl'];
            document.querySelector('.afterTradableCoral').innerText = result['afterTradableCoral'];
        }).catch(function(error) {console.error("Error sending data to Flutter: ", error);});
    });
}
});