

function change() {
  var a = document.getElementById("input");

  var $ = (text) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    ctx.font = "16px NanumSquareWebFont";

    if (text.includes("\n")) {
      const maxWidth = 619;
      const lines = text.split("\n");
      let result = "";

      lines.forEach((line) => {
        if (!line.trim()) {
          line = "ㅤ";
        }

        const width = ctx.measureText(line).width;
        const spacesNeeded = Math.ceil(
          (maxWidth - width) / (ctx.measureText("　").width - ctx.measureText(" ").width)
        );
        result += line + "　".repeat(spacesNeeded);
      });

      return result;
    }

    return text;
  };

  resultText = $(a.value.replace(/\$/g, "\n")).trim();
  window.navigator.clipboard.writeText(resultText).then(() => {
    alert("클립보드에 복사되었습니다.");
  });
  //alert('글을 등록하기 전 꼭 아무데나 띄어쓰기를 한번 해주세요.')
}

function assa() {
  chrome.tabs.executeScript(
    null,
    { code: "document.querySelector('#Write').value='변환 중'"}
  );
  chrome.tabs.executeScript(
    null,
    { code: `document.querySelector('#Write').value='${resultText}'` }
  );
}

let resultText = '';

document.addEventListener("DOMContentLoaded", function () {
  var btn01 = document.getElementById('btn');
  btn01.addEventListener('click', function () {
      change();
  });
});
