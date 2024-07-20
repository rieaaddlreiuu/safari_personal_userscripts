// ==UserScript== 
// @name twitterを生産的にします
// @namespace http://tampermonkey.net/
// @version 0.1
// @description ついでにx.comをtwitter.comに遷移させます
// @author You
// @match https://twitter.com/*
// @match https://x.com/*
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
    function is_twitter(url_string) {
        if (url_string[8] == 'x') {
            return false;
        }
        return true;
    }
    function tweetsForEach(process_function) {
        let lists = document.getElementsByClassName("css-175oi2r");
        for (let i = 0; i < lists.length; i++) {
            if (lists[i].dataset.testid == "cellInnerDiv") {
                process_function(lists[i]);
            }
        }
    }
    const element = ``
    cyclicExecute(200, () => {
        if (!is_twitter(location.href)) {
            let url_head = location.href.substring(0, 8);
            let url_tail = location.href.substring(9);
            let url = url_head + "twitter" + url_tail;
            if (url.indexOf('?') == -1) {
                url = url + "?mx=1";
            } else {
                url = url + "&mx=1";
            }
            location.href = url;
        }
    })
    cyclicExecute(1000, () => {
        tweetsForEach((tweet) => {
            //if (tweet.getAttribute("id") != "processed") {
                tweet.setAttribute("id", "processed");
                //let tweet_text = tweet.getElementsByClassName("css-1jxf684 r-bcqeeo r-1ttztb7 r-qvutc0 r-poiln3");
                let text = tweet.innerText.split("\n");
                if (text[2] == "Ad") {
                    let content = tweet.getElementsByTagName("article")[0];
                    let quiz = `물리학 입문 <b>과제</b>가 너무 많다!太字部分の意味は？<br>
                    (1) 価値<br>
                    (2) 課題<br>
                    (3) 内容<br>
                    <details>`;
                    let text = content.children[0].children[0].children[1].children[1].children[1];
                    let pictures = content.children[0].children[0].children[1].children[1].children[2];
                    pictures.outerHTML = "";
                    text.innerHTML = quiz;
                   //文字 : first.first.last.last.(2番目) 0 0 1 1 1
                   //画像 : first.first.last.last.(3番目) 0 0 1 1 2
                }
                //tweet.parentNode.insertAdjacentHTML("beforebegin",'<div class="css-175oi2r r-j5o65s r-qklmqi r-1adg3ll r-1ny4l3l">'+tweet.innerHTML+'</div>');
            //}
        })
    })
})();

