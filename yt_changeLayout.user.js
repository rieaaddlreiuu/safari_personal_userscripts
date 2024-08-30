// ==UserScript== 
// @name webのようつべを使いやすくします
// @namespace http://tampermonkey.net/
// @version 0.1
// @description try to take over the world!
// @author You
// @match https://www.youtube.com/*
// ==/UserScript==

(function () {
    function sleep(ms) {
        return new Promise(function (resolve) {
            setTimeout(function () {
                resolve()
            }, ms)
        })
    }
    async function cyclicExecute(interval, exec_function) {
        while (1) {
            await sleep(interval);
            exec_function();
        }
    }
    cyclicExecute(100, () => {
        let related_videos = document.getElementById("secondary");
        if (related_videos != null) {
            related_videos.style = "";
            document.getElementById("secondary-inner").style = "position: fixed; right: 0vh; overflow: scroll; height: 90vh; width: 45vh;";
        }
        let primary = document.getElementById("primary");
        if (primary != null) {
            
            let comments = primary.querySelector("#comments");
            if (comments != null) {
                primary.style = "height: 90vh";
            }
            let video_description = primary.querySelector("#above-the-fold");
            if (video_description != null) {
                if (video_description.querySelector("#added") == null) {
                    video_description.setAttribute("id", "added");
                    let onclick_scripts = `
                    function func() {
            let v_desc = document.getElementById("added");
            if (v_desc.style == '') { 
                v_desc.style = 'display: none;'; 
            } else { 
                v_desc.style = ''; 
            }
        }
            `;
                    video_description.insertAdjacentHTML('beforebegin', '<span onclick="document.getElementById(`added`).style = `display: none; height: 1px`" style="font-size: 12px;">隠す　</span>');
                    video_description.insertAdjacentHTML('beforebegin', '<span onclick="document.getElementById(`added`).style = ``" style="font-size: 12px;">戻す</span>');
                    //video_description.insertAdjacentHTML('beforebegin', '<script>' + onclick_scripts + '</script>');
                    //'<div onclick="func();">隠す</div>'
                }
            }
        }
    })
})();