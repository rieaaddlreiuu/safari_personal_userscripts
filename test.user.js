// ==UserScript==
// @name tapiokaumexesu
// @namespace http://tampermonkey.net/
// @version 0.1
// @description try to take over the world!
// @author You
// @match https://www.nicovideo.jp/watch_tmp/*
// @downloadURL https://raw.githubusercontent.com/rieaaddlreiuu/safari_personal_userscripts/main/test.user.js
// @updateURL https://raw.githubusercontent.com/rieaaddlreiuu/safari_personal_userscripts/main/test.user.js
// ==/UserScript==
(function () {
  const class_name = "d_inline-flex items_center p_3px_12px bg_#fff rounded_10000px fs_12px border_#d0d0d0_solid_1px white-space_nowrap";
  function sleep(ms) {
    return new Promise(function (resolve) {
      setTimeout(function () {
        resolve()
      }, ms)
    })
  }
  async function load() {
    tags = document.getElementsByClassName(class_name);
    while(tags[0] == undefined){
      await sleep(250);
      tags = document.getElementsByClassName(class_name);
    }
    return tags;
  }
  load().then((tags) => {
    tags = document.getElementsByClassName(class_name);
    for(let i=0;i<tags.length;i++){
      let text = tags[i].innerHTML;
      let result_html = '<a href="https://nicovideo.and-es.net/tag/'+text+'?o=views" target="_blank">'+text+'</a>';
      tags[i].innerHTML = result_html;
    }
  });
})();
/*
<div class="d_flex flex-wrap_wrap gap_8px">
<span class="d_inline-flex items_center p_3px_12px bg_#fff rounded_10000px fs_12px border_#d0d0d0_solid_1px white-space_nowrap">アニメ</span>
...
</div>
*/
