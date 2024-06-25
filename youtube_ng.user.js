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
    cyclicExecute(20, () => {
        loadElementById(10, "contents")
            .then((element) => {
                let comment_elems = element.getElementsByClassName("yt-core-attributed-string yt-core-attributed-string--white-space-pre-wrap");
                let nodes, user_name;
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
            console.log(ng_user_list);
            console.log(ng_word_list);
          } else {
            console.log(`Error: ${xhr.status}`);
          }
        };
    })
})();
/*
<span class="yt-core-attributed-string yt-core-attributed-string--white-space-pre-wrap" dir="auto" role="text">
下呂、平湯までいって温泉入らずに、分水嶺や高速道路の標高で楽しんでるのこのこの人くらいだと思う
</span>

<span class="yt-core-attributed-string yt-core-attributed-string--white-space-pre-wrap" dir="auto" role="text">
すごい<span class="yt-core-attributed-string--inline-block-mod" style="margin-left: 2px; margin-right: 2px;"><img alt="" style="height: 16px; width: 16px;" class="yt-core-image yt-core-attributed-string__image-element yt-core-attributed-string__image-element--image-alignment-vertical-center yt-core-image--content-mode-scale-to-fill yt-core-image--loaded" src="https://www.youtube.com/s/gaming/emoji/7ff574f2/emoji_u1f606.png"></span><span class="yt-core-attributed-string--inline-block-mod" style="margin-left: 2px; margin-right: 2px;"><img alt="" style="height: 16px; width: 16px;" class="yt-core-image yt-core-attributed-string__image-element yt-core-attributed-string__image-element--image-alignment-vertical-center yt-core-image--content-mode-scale-to-fill yt-core-image--loaded" src="https://www.youtube.com/s/gaming/emoji/7ff574f2/emoji_u2934.png"></span>️
</span>

*/
