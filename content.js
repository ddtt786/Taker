window.addEventListener('DOMContentLoaded',click());

function click() {
    const button=document.querySelectorAll(".css-1adjw8a")[0]
    button.addEventListener('click', function() {
        change();
        assa();
    });
};

function change() {
    var a = document.querySelector("#Write");
  
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
  }

function assa() {
    chrome.tabs.executeScript(
      null,
      { code: `document.querySelector('#Write').value='${resultText}'` }
    );
}
