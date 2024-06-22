// ==UserScript==
// @name tapiokaumexesu
// @namespace http://tampermonkey.net/
// @version 0.1
// @description try to take over the world!
// @author You
// @match https://www.nicovideo.jp/*
// @downloadURL https://raw.githubusercontent.com/rieaaddlreiuu/safari_personal_userscripts/main/test.user.js
// @updateURL https://raw.githubusercontent.com/rieaaddlreiuu/safari_personal_userscripts/main/test.user.js
// ==/UserScript==
(function(){
  "use strict";
  window.addEventListener("load", () => {
    let texts = document.body.outerHTML;
    alert(texts);
  });
})();
