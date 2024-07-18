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
    cyclicExecute(100,() => {
        let related_videos = document.getElementById("secondary");
        if(related_videos != null){
            related_videos.style = "overflow: scroll; height: 180vh";
        }
        let primary = document.getElementById("primary");
        if(primary != null){
            let comments = primary.querySelector("#comments");
            if(comments != null){
                comments.style = "overflow: scroll; height: 80vh";
            }
        }
    })
})();
