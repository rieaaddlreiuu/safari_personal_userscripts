// ==UserScript== 
// @name ようつべコメントNG機能です
// @namespace http://tampermonkey.net/
// @version 0.1
// @description try to take over the world!
// @author You
// @match https://www.youtube.com/*
// @downloadURL https://raw.githubusercontent.com/rieaaddlreiuu/safari_personal_userscripts/develop/yt_comment_ng/youtube_ng.user.js
// @updateURL https://raw.githubusercontent.com/rieaaddlreiuu/safari_personal_userscripts/develop/yt_comment_ng/youtube_ng.user.js
// ==/UserScript==

(function () {
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
            exec_function();
            await sleep(interval);
        }
    }
    let ng_word_list = [];
    let ng_user_list = [];
    let e;
    cyclicExecute(20, () => {
        loadElementById(10, "contents")
            .then((element) => {
                let comment_elems = element.getElementsByClassName("yt-core-attributed-string yt-core-attributed-string--white-space-pre-wrap");
                let nodes, user_name;
                let url;
                for (let i = 0; i < comment_elems.length; i++) {
                    nodes = comment_elems[i].parentElement.parentElement.parentElement.parentElement;
                    user_name = nodes.innerText.split('\n')[0];
                    for (let j = 0; j < ng_word_list.length; j++) {
                        if (comment_elems[i].innerHTML.indexOf(ng_word_list[j]) != -1) {
                            comment_elems[i].innerHTML = '<font color="#008800">(NGワードを含んでいます。)</font>';
                        }
                    }
                    for (let j = 0; j < ng_user_list.length; j++) {
                        if (user_name.indexOf(ng_user_list[j]) != -1) {
                            comment_elems[i].innerHTML = '<font color="#008800">(NGユーザです。)</font>';
                        }
                    }
                    e = nodes.querySelector("#published-time-text");
                    if(e.querySelector("#block_feature") == null){
                        url = "https://c4613fcd-88ff-4391-ba7c-0a38fd3fe235-00-3jcdujbqllie5.spock.replit.dev/?ng_type=user&ng_content="+user_name;
                        e.innerHTML = e.innerHTML + '<a href="'+url+'" id="block_feature" target="_blank">このユーザをブロック</a>'
                    }
                }
            })
    });
    cyclicExecute(3000,() => {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => {
          console.log(xhr.responseXML.title);
        };
        xhr.open("GET", "https://c4613fcd-88ff-4391-ba7c-0a38fd3fe235-00-3jcdujbqllie5.spock.replit.dev/response.php");
        xhr.responseType = "json";
        xhr.send();
        xhr.onload = () => {
          if (xhr.readyState == 4 && xhr.status == 200) {
            const data = xhr.response;
            ng_user_list = data['ng_user'];
            ng_word_list = data['ng_words'];
          } else {
            console.log(`Error: ${xhr.status}`);
          }
        };
    })
})();
/*
<div id="header" class="style-scope ytd-comment-view-model">
      <div id="pinned-comment-badge" class="style-scope ytd-comment-view-model"><ytd-pinned-comment-badge-renderer class="style-scope ytd-comment-view-model"><!--css-build:shady--><!--css-build:shady--><yt-icon size="12" class="style-scope ytd-pinned-comment-badge-renderer"><!--css-build:shady--><!--css-build:shady--><yt-icon-shape class="style-scope yt-icon"><icon-shape class="yt-spec-icon-shape"><div style="width: 100%; height: 100%; display: block; fill: currentcolor;"><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" focusable="false" style="pointer-events: none; display: inherit; width: 100%; height: 100%;"><path d="M16 11V3h1V2H7v1h1v8l-2 2v2h5v6l1 1 1-1v-6h5v-2l-2-2zm1 3H7v-.59l1.71-1.71.29-.29V3h6v8.41l.29.29L17 13.41V14z"></path></svg></div></icon-shape></yt-icon-shape></yt-icon>
<yt-formatted-string id="label" class="style-scope ytd-pinned-comment-badge-renderer">Kuvina Saydaki さんによって固定されています</yt-formatted-string>
</ytd-pinned-comment-badge-renderer></div>
      <div id="header-author" class="style-scope ytd-comment-view-model">
        
        <h3 class="style-scope ytd-comment-view-model"> 
          <a id="author-text" class="yt-simple-endpoint style-scope ytd-comment-view-model" hidden="" href="/@Kuvina">
            <span class="channel-owner style-scope ytd-comment-view-model style-scope ytd-comment-view-model">
              @Kuvina
            </span>
          </a>
        </h3>
        <span id="author-comment-badge" class="style-scope ytd-comment-view-model"><ytd-author-comment-badge-renderer class="style-scope ytd-comment-view-model" standardize-icon-size="" creator="" style="--yt-basic-background-color: rgba(136,136,136,1.000); --yt-basic-foreground-title-color: rgba(255,255,255,1.000); --ytd-author-comment-badge-background-color: #888888; --ytd-author-comment-badge-name-color: #ffffff; --ytd-author-comment-badge-icon-color: #ffffff;"><!--css-build:shady--><!--css-build:shady--><a id="name" class="yt-simple-endpoint style-scope ytd-author-comment-badge-renderer" href="/@Kuvina">
  <ytd-channel-name id="channel-name" class="style-scope ytd-author-comment-badge-renderer"><!--css-build:shady--><!--css-build:shady--><div id="container" class="style-scope ytd-channel-name">
  <div id="text-container" class="style-scope ytd-channel-name">
    <yt-formatted-string id="text" link-inherit-color="" respect-lang-dir="" title="@Kuvina" class="style-scope ytd-channel-name" ellipsis-truncate="" ellipsis-truncate-styling="" dir="auto" style="text-align: left;" is-empty="function(){var e=va.apply(0,arguments);a.loggingStatus.currentExternalCall=b;a.loggingStatus.bypassProxyController=!0;var g,k=((g=a.is)!=null?g:a.tagName).toLowerCase();mF(k,b,&quot;PROPERTY_ACCESS_CALL_EXTERNAL&quot;);var m;g=(m=c!=null?c:d[b])==null?void 0:m.call.apply(m,[d].concat(ha(e)));a.loggingStatus.currentExternalCall=void 0;a.loggingStatus.bypassProxyController=!1;return g}"><!--css-build:shady--><!--css-build:shady--><yt-attributed-string class="style-scope yt-formatted-string"></yt-attributed-string></yt-formatted-string>
  </div>
  <tp-yt-paper-tooltip fit-to-visible-bounds="" class="style-scope ytd-channel-name" role="tooltip" tabindex="-1"><!--css-build:shady--><div id="tooltip" class="hidden style-scope tp-yt-paper-tooltip" style-target="tooltip">
  <!--css-build:shady--><div id="tooltip" class="hidden style-scope tp-yt-paper-tooltip" style-target="tooltip">
  
    @Kuvina
  
</div>

</div>
</tp-yt-paper-tooltip>
</div>
<ytd-badge-supported-renderer class="style-scope ytd-channel-name" disable-upgrade="" hidden="">
</ytd-badge-supported-renderer>
</ytd-channel-name>
</a>
<yt-icon id="icon" size="12" class="style-scope ytd-author-comment-badge-renderer" hidden=""><!--css-build:shady--><!--css-build:shady--></yt-icon>
</ytd-author-comment-badge-renderer></span>
        <span id="sponsor-comment-badge" class="style-scope ytd-comment-view-model"></span>
        <span dir="auto" id="published-time-text" class="style-scope ytd-comment-view-model">
          <a class="yt-simple-endpoint style-scope ytd-comment-view-model" href="/watch?v=Uq6URzo9q6g&amp;lc=Ugxg_1ybv4kV5SbCwM54AaABAg">
            1 か月前（編集済み）
          </a>
        </span>
      <br><a href="" id="block_feature">このユーザをブロック</a></div>
    </div>
*/
