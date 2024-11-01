window.addEventListener("flutterInAppWebViewPlatformReady", function(event) {
  console.log("WebView is ready for communication.");
});

$(document).ready(function() {
    if (window.flutter_inappwebview) {
    window.flutter_inappwebview.callHandler('healthHistory').then(function(healthHistoryList) {
        function formatTime(amount, healthType) {
          if (healthType === 'sleep') {
            const hours = Math.floor(amount / 60);
            const minutes = amount % 60;
            return `${hours}시간 ${minutes}분`;
          } else if (healthType === 'walk') {
            return `${amount} 걸음`;
          }
          return `${amount}`;
        }

        function healthTypeToString(healthType) {
          switch (healthType) {
            case 'walk':
              return '걷기';
            case 'sleep':
              return '수면';
            default:
              return '알 수 없음';
          }
        }

        function appendHealthHistoryList(historyList) {
          const container = document.getElementById('history-list-container');
          container.innerHTML = '';
          historyList.reverse();

          historyList.forEach((history, index) => {
            const historyElement = document.createElement('div');
            historyElement.classList.add('history-list');
            const formattedDate = new Date(history.recordDate).toLocaleString('ko-KR', {
                                                                                  year: 'numeric',
                                                                                  month: '2-digit',
                                                                                  day: '2-digit',
                                                                                  hour: '2-digit',
                                                                                  minute: '2-digit', hour12: false
                                                                              }).replace(/\.$/, '');


            historyElement.innerHTML = `
            <div class="history-sec-line">
              <p>${formattedDate}</p>
              <p>${healthTypeToString(history.healthType)}</p>
              <p>${formatTime(history.amount, history.healthType)}</p>
            </div>
            `;

            container.appendChild(historyElement);
          });
        }

        appendHealthHistoryList(healthHistoryList);
        });

        window.flutter_inappwebview.callHandler('rewardHistory').then(function(rewardHistoryList) {
          function saveByToString(saveBy) {
            switch (saveBy) {
              case 'exchange':
                return '교환';
              case 'earn':
                return '건강 데이터';
              case 'admin':
                return '관리자 지급';
              case 'item':
                return '아이템 구매';
              default:
                return '알 수 없음';
            }
          }

          function rewardTypeToString(rewardType) {
            switch (rewardType) {
              case 'pearl':
                return '진주';
              case 'coral':
                return '산호';
              default:
                return '알 수 없음';
            }
          }

          function appendRewardHistoryList(rewardList) {
            const container = document.getElementById('reward-history-list-container');
            container.innerHTML = '';
            rewardList.reverse();

            rewardList.forEach((reward, index) => {
              const formattedDate = new Date(reward.recordDate).toLocaleString('ko-KR', {
                                                                                   year: 'numeric',
                                                                                   month: '2-digit',
                                                                                   day: '2-digit',
                                                                                   hour: '2-digit',
                                                                                   minute: '2-digit',hour12: false
                                                                               }).replace(/\.$/, '');

              const rewardElement = document.createElement('div');
              rewardElement.classList.add('reward-history-list');
              rewardElement.innerHTML = `
              <div class="reward-history-sec-line">
                <p>${formattedDate}</p>
                <p>${saveByToString(reward.saveBy)}</p>
                <p>${rewardTypeToString(reward.rewardType)}</p>
                <p>${reward.amount}</p>
                </div>
              `;

              container.appendChild(rewardElement);
            });
          }

          appendRewardHistoryList(rewardHistoryList);
        });
      } else {
    }
});