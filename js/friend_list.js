window.addEventListener("flutterInAppWebViewPlatformReady", function(event) {
    console.log("WebView is ready for communication.");
});

$(document).ready(function() {
    if (window.flutter_inappwebview) {
        // 랜덤 이미지 경로 생성 함수
        function getRandomImage() {
            const randomIndex = Math.floor(Math.random() * 6) + 1; // 1부터 6까지 랜덤 숫자 생성
            return `../images/zamvoki-friends${randomIndex}.svg`;
        }

        // Flutter에서 friends 데이터를 받아와서 리스트에 추가
        window.flutter_inappwebview.callHandler('friends').then((friends) => {
            var $friendListContainer = $('.friend-list-container'); // 친구 목록 컨테이너 선택

            friends.forEach(friend => {
                var $newItem = $('#friends-template .friend-item').clone(); // 템플릿 복제
                const randomImage = getRandomImage(); // 랜덤 이미지 생성

                // 복제된 요소에 데이터 설정
                $newItem.find('.friend-image').attr('src', randomImage); // 이미지 설정
                $newItem.find('.friends-nickname').text(friend["name"]); // 이름 설정
                $newItem.find('.friends-point-pearl').text(friend["pearl"]); // 진주 수 설정
                $newItem.find('.friends-point-coral').text(friend["coral"]); // 산호 수 설정

                $friendListContainer.append($newItem); // 부모 컨테이너에 추가
            });
        });
    } else {
        console.log("Flutter InAppWebView is not available.");
    }
});
