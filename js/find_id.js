$(document).ready(function () {
    // 아이디 찾기 버튼 클릭 시
    $('.find-id-btn').on('click', function () {
        // input-name과 input-phone의 값을 가져오기
        const name = $('#input-name').val().trim();
        const phone = $('#input-phone').val().trim();

        // 값 확인 (콘솔에 출력)
        console.log("Name:", name);
        console.log("Phone:", phone);

        if (!name || !phone) {
            alert("이름과 휴대폰 번호를 모두 입력해주세요.");
            return;
        }

        const phonePattern = /^(010-\d{4}-\d{4}|010\d{4}\d{4})$/;
        if (!phonePattern.test(phone)) {
            alert("휴대폰 번호는 010-1234-1234 또는 01012341234 형식으로 입력해주세요.");
            return;
        }

        // JSON 데이터로 사용자 정보 생성
        const userInfoData = JSON.stringify({
            name: name,
            phone: phone
        });

        // Flutter로 데이터 전달 및 응답 처리
        window.flutter_inappwebview.callHandler('findId', userInfoData).then(function (result) {
            if (result !== null) {
                // 결과 메시지 표시
                $('#result-message').text(`회원님의 아이디는 ${result} 입니다.`).show();
            } else {
                $('#result-message').text("아이디를 찾을 수 없습니다. 정보를 다시 확인해주세요.").show();
            }
        }).catch(function (error) {
            console.error("Error:", error);
            $('#result-message').text("서버 오류가 발생했습니다. 다시 시도해주세요.").show();
        });
    });
});