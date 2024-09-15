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
            await sleep(interval);
            exec_function();
        }
    }
    let ng_word_list = [];
    let ng_user_list = [];
    let e;
    cyclicExecute(20, () => {
        loadElementById(10, "comments")
            .then((e) => {
                let element = e.querySelector("#contents");
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
                }
            })
    });
    cyclicExecute(1000, () => {
        loadElementById(10, "comments")
            .then((e) => {
                let element = e.querySelector("#contents");
                let comment_elems = element.getElementsByClassName("yt-core-attributed-string yt-core-attributed-string--white-space-pre-wrap");
                let nodes, user_name;
                let url,text_insert_area;
                for (let i = 0; i < comment_elems.length; i++) {
                    nodes = comment_elems[i].parentElement.parentElement.parentElement.parentElement;
                    user_name = nodes.innerText.split('\n')[0];
                    text_insert_area = nodes.querySelector("#published-time-text");
                    if(text_insert_area.querySelector("#block_feature") == null){
                        url = "https://192.168.2.103/YoutubeNgListContain/set.php?ng_type=user&ng_content="+user_name;
                        text_insert_area.innerHTML = text_insert_area.innerHTML + '<a href="'+url+'" id="block_feature" target="_blank" style="color: inherit;">このユーザをブロック</a>'
                    }
                }
            })
    });
    cyclicExecute(3000,() => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "https://test_server.local/YoutubeNgListContain/response.php");//test_server.local
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
    cyclicExecute(3000,() => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "https://192.168.2.103/YoutubeNgListContain/response.php");
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
