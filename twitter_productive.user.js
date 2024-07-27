// ==UserScript== 
// @name twitterを生産的にします
// @namespace http://tampermonkey.net/
// @version 0.1
// @description ついでにx.comをtwitter.comに遷移させます
// @author You
// @require https://raw.githubusercontent.com/rieaaddlreiuu/safari_personal_userscripts/develop/twitter_productive/modules/twipro_quiz_modules.js?token=GHSAT0AAAAAACTAKNWQLRH5DE64FN6C7VTCZVE5MYQ
// @require https://raw.githubusercontent.com/rieaaddlreiuu/safari_personal_userscripts/develop/twitter_productive/modules/basic_features.js?token=GHSAT0AAAAAACTHY7EZZROJFYCXN4HX3N6KZVFFLNQ
// @match https://twitter.com/*
// @match https://x.com/*
// ==/UserScript==

(function () {
    function is_twitter(url_string) {
        if (url_string[8] == 'x') {
            return false;
        }
        return true;
    }
    cyclicExecute(1000, () => {
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
    let quiz_position = 3000;
    const quiz_list = [
        new quizObject("과제の意味は？",["価値","課題","内容"],1),
        new quizObject("Test", ["a", "b", "c"], 0)
    ];
    cyclicExecute(100, () => {
        let timeline_rect = document.querySelector('[role="main"]').getBoundingClientRect();
        if (quiz_position < timeline_rect.height) {
            let left_margin = document.querySelector('[role="banner"]').getBoundingClientRect().width;
            let quiz_id = "TwiProQuiz-" + quiz_position;
            let test_html = `<div style="position:absolute; top: ` + quiz_position + `px; 
            left: ` + left_margin + `px; 
            z-index: 10000; 
            background-color: #FFFFFF; 
            width: ` + timeline_rect.width + `px; 
            color: #000000;" 
            id="` + quiz_id + `">` + quiz_list[random(0, quiz_list.length - 1)].outputQuizHtml() + `</div>`;
            document.getElementById("react-root").children[0].children[0].children[0].insertAdjacentHTML("afterend", test_html);
            let quiz_element = document.getElementById(quiz_id);
            quiz_element.getElementsByClassName("correct_answer")[0].addEventListener('click', function () {
                quiz_element.style = "display:none;";
            });
            quiz_element.getElementsByClassName("show_answer")[0].addEventListener('click', function () {
                this.children[1].style = "";
            });

            quiz_position += random(1000, 3000);
        }
    })
})();

