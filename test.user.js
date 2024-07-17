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
  const class_name = "d_inline-flex items_center p_3px_0px_3px_12px bg_#fff rounded_10000px fs_12px border_#d0d0d0_solid_1px white-space_nowrap gap_4px";
  function sleep(ms) {
    return new Promise(function (resolve) {
      setTimeout(function () {
        resolve()
      }, ms)
    })
  }
  async function loadElementsByClassName(wait_time, class_name) {
    tags = document.getElementsByClassName(class_name);
    while (tags[0] == undefined) {
      await sleep(wait_time);
      tags = document.getElementsByClassName(class_name);
    }
    return tags;
  }
  async function loadElementById(wait_time, id_name) {
    tag = document.getElementById(id_name);
    while (tag == undefined) {
      await sleep(wait_time);
      tag = document.getElementById(id_name);
    }
    return tag;
  }
  async function cyclicExecute(interval, exec_function) {
    while (1) {
      await sleep(interval);
      exec_function();
    }
  }
  cyclicExecute(100, () => {
    console.log("unko");
    let tags = document.getElementsByClassName(class_name);
    if(tags[0] != undefined){
      for(let i=0;i<tags.length;i++){
        let tag = tags[i].getElementsByTagName('span')[0];
        let text = tag.innerHTML;
        let result_html = '<a href="https://nicovideo.and-es.net/tag/'+text+'?o=views" target="_blank" id="tagged">'+text+'</a>';
        console.log(text);
        if(tag.querySelector("#tagged") == null){
          tag.innerHTML = result_html;
        }
      }
    } else {
      console.log("aaa");
    }
  });

})();

/*
<span class="d_inline-flex items_center p_3px_0px_3px_12px bg_#fff rounded_10000px fs_12px border_#d0d0d0_solid_1px white-space_nowrap gap_4px [&amp;_svg]:h_18px">
  <span>
    エンターテイメント
  </span>
  <a href="https://dic.nicovideo.jp/a/%E3%82%A8%E3%83%B3%E3%82%BF%E3%83%BC%E3%83%86%E3%82%A4%E3%83%A1%E3%83%B3%E3%83%88" target="_blank" class="text_#007cff text-decor_none [&amp;:hover]:text-decor_underline">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="cursor_pointer fill_#8B0F0F hover:opacity_0.6">
      <path fill-rule="evenodd" d="M12 24a12 12 0 1 0 0-24 12 12 0 0 0 0 24M4.68 6.12a.6.6 0 0 0 .42.18h5.7L9 8.1H6.3a.6.6 0 0 0-.6.6v10.2c0 .33.27.6.6.6h11.4a.6.6 0 0 0 .6-.6V8.7a.6.6 0 0 0-.6-.6H12l1.8-1.8h5.1a.6.6 0 0 0 .6-.6v-.6a.6.6 0 0 0-.6-.6H5.1a.6.6 0 0 0-.6.6v.6q0 .25.18.42m4.1 8.07A.3.3 0 0 1 9 14.1h6a.3.3 0 0 1 .3.3v3a.3.3 0 0 1-.3.3H9a.3.3 0 0 1-.3-.3v-3a.3.3 0 0 1 .09-.21M8.7 10.2c0-.17.13-.3.3-.3h6c.17 0 .3.13.3.3V12a.3.3 0 0 1-.3.3H9a.3.3 0 0 1-.3-.3z" clip-rule="evenodd">
      </path>
    </svg>
  </a>
</span>
*/