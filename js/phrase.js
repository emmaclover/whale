window.addEventListener("flutterInAppWebViewPlatformReady", function(event) {
  console.log("WebView is ready for communication.");
});

$(document).ready(function() {
    if (window.flutter_inappwebview) {
        window.flutter_inappwebview.callHandler('phrase').then(function(phraseList) {
        let index = 0;
        const phraseElement = document.getElementById("phrase");
        const imageElement = document.querySelector(".bubble-coment img");

            setInterval(() => {
                const phrase = phraseList[index];
                index = (index + 1) % phraseList.length;

                phraseElement.innerHTML = "";

                if (/\.(jpg|jpeg|png|gif|webp|bmp|svg)$/i.test(phrase)) {
                  const imgElement = document.createElement("img");
                  imgElement.src = `https://admin.zamvoki.com/uploads/${phrase}`;
                  imgElement.alt = "Phrase Image";
                  imgElement.style.maxWidth = "100%";
                  imgElement.style.height = "auto";

                  phraseElement.appendChild(imgElement);
                } else {
                  phraseElement.textContent = phrase;
                }
              }, 10000);
          });
    } else {
    }
});