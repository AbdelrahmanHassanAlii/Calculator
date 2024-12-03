(function () {
  const r = document.createElement("link").relList;
  if (r && r.supports && r.supports("modulepreload")) return;
  for (const e of document.querySelectorAll('link[rel="modulepreload"]')) c(e);
  new MutationObserver((e) => {
    for (const t of e)
      if (t.type === "childList")
        for (const s of t.addedNodes)
          s.tagName === "LINK" && s.rel === "modulepreload" && c(s);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(e) {
    const t = {};
    return (
      e.integrity && (t.integrity = e.integrity),
      e.referrerPolicy && (t.referrerPolicy = e.referrerPolicy),
      e.crossOrigin === "use-credentials"
        ? (t.credentials = "include")
        : e.crossOrigin === "anonymous"
        ? (t.credentials = "omit")
        : (t.credentials = "same-origin"),
      t
    );
  }
  function c(e) {
    if (e.ep) return;
    e.ep = !0;
    const t = n(e);
    fetch(e.href, t);
  }
})();
const themePanel = document.querySelector(".theme__controls__panel"),
  themeIndicator = document.querySelector(".theme__controls__panel__pointer"),
  screen = document.querySelector(".wrapper__screen");
window.getComputedStyle(screen, "::after");
const operationKeys = document.querySelectorAll(
    ".wrapper__keys__grid__btn--operations"
  ),
  equal = document.querySelector(".equal"),
  reset = document.querySelector(".reset"),
  deleteBtn = document.querySelector(".delete");
let state = Number(localStorage.getItem("state")),
  answerNum;
themeSwitch();
function themeSwitch() {
  state === 0
    ? (document.body.classList.remove("theme2", "theme3"),
      (themeIndicator.style.left = ".3rem"))
    : state === 1
    ? (document.body.classList.add("theme2"),
      (themeIndicator.style.left = "calc(50% - .425rem)"))
    : state === 2 &&
      (document.body.classList.add("theme3"),
      document.body.classList.remove("theme2"),
      (themeIndicator.style.left = "calc(100% - (.3rem + .85rem)"));
}
themePanel.addEventListener("click", () => {
  state === 0
    ? (document.body.classList.add("theme2"),
      (themeIndicator.style.left = "calc(50% - .425rem)"),
      (state = 1),
      localStorage.setItem("state", state))
    : state === 1
    ? (document.body.classList.add("theme3"),
      document.body.classList.remove("theme2"),
      (themeIndicator.style.left = "calc(100% - (.3rem + .85rem)"),
      (state = 2),
      localStorage.setItem("state", state))
    : state === 2 &&
      (document.body.classList.remove("theme2", "theme3"),
      (themeIndicator.style.left = ".3rem"),
      (state = 0),
      localStorage.setItem("state", state));
});
screen.textContent = "";
operationKeys.forEach((o, r) => {
  operationKeys[r].addEventListener("click", () => {
    screen.textContent += operationKeys[r].getAttribute("data-value");
  });
});
equal.addEventListener("click", () => {
  (screen.textContent = screen.textContent.replace("x", "*")),
    console.log(screen.textContent),
    (answerNum = Number(eval(screen.textContent))),
    (screen.textContent = answerNum),
    screen.textContent == "NaN" && (screen.textContent = "Math Error");
});
reset.addEventListener("click", () => {
  screen.textContent = "";
});
deleteBtn.addEventListener("click", () => {
  let o = Array.from(screen.textContent);
  o.pop(),
    console.log(o),
    (screen.textContent = ""),
    o.forEach((r, n) => {
      screen.textContent += o[n];
    }),
    console.log(screen.textContent);
});
