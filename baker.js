function convert(text) {
  //Taker의 변환 함수
  const ctx = document.createElement("canvas").getContext("2d");
  ctx.font = "16px NanumSquareWebFont";

  if (text.includes("\n")) {
    const result = text
      .split("\n")
      .map((line) => {
        if (!line.trim()) {
          return "ㅤ";
        }
        return (
          line +
          "　".repeat(
            Math.ceil(
              (619 - ctx.measureText(line).width) /
                (ctx.measureText("　").width - ctx.measureText(" ").width)
            )
          )
        );
      })
      .join("\n");
    return result;
  } else {
    return text;
  }
}

setInterval(() => {
  if (location.pathname === "/community/entrystory/list") {
    if (
      !document.querySelector(".nextInner div>div>div>div>div>div .baker") &&
      document.querySelector(".nextInner div>div>div>div>div>div>span")
    ) {
      const xToken = JSON.parse(
        document.getElementById("__NEXT_DATA__").innerText
      ).props.initialState.common.user.xToken;
      const csrf = document.querySelector("meta[name=csrf-token]").content;
      const write = document.querySelector(
        ".nextInner div>div>div>div>div>div>span"
      );

      //baker 버튼 선언
      const baker = document.createElement("a");
      baker.className = "baker";
      baker.innerText = "등록";
      baker.role = "button";
      baker.addEventListener("click", () => {
        const area = document.querySelector("#Write");
        if (area.value.includes("\n")) {
          //줄바꿈이 있다면 baker로 작업
          chrome.runtime.sendMessage(
            {
              contentScriptQuery: "post",
              data: {
                csrf,
                xToken,
                cookie: document.cookie,
                data: convert(area.value),
              },
            },
            () => {
              location.reload();
            }
          );
        } else {
          //줄바꿈이 없다면 기본 글쓰기
          write.querySelector("a").click();
        }
      });

      //baker 버튼 삽입
      write.querySelector("a").style.display = "none";
      write.appendChild(baker);
    }
  }
}, 10);
