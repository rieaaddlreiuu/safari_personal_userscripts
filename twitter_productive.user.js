// ==UserScript== 
// @name twitterを生産的にします
// @namespace http://tampermonkey.net/
// @version 0.1
// @description ついでにx.comをtwitter.comに遷移させます
// @author You
// @resource Twipro_css https://raw.githubusercontent.com/rieaaddlreiuu/safari_personal_userscripts/develop/twitter_productive/modules/style.css
// @require https://raw.githubusercontent.com/rieaaddlreiuu/safari_personal_userscripts/develop/twitter_productive/modules/twipro_quiz_modules.js
// @require https://raw.githubusercontent.com/rieaaddlreiuu/safari_personal_userscripts/develop/twitter_productive/modules/basic_features.js
// @require https://raw.githubusercontent.com/rieaaddlreiuu/rieaaddlreiuu/main/files/twipro_quiz_data.js
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
    /*let quiz_style = document.createElement('style');
    quiz_style.innerHTML = `
.button019 a {
    background: #eee;
    border-radius: 3px;
    position: relative;
    display: flex;
    justify-content: space-around;
    align-items: center;
    max-width: 280px;
    padding: 10px 25px;
    color: #313131;
    transition: 0.3s ease-in-out;
    font-weight: 500;
}
.button019 a:after {
    content: "";
    position: absolute;
    top: 50%;
    bottom: 0;
    right: 2rem;
    font-size: 90%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: right 0.3s;
    width: 6px;
    height: 6px;
    border-top: solid 2px currentColor;
    border-right: solid 2px currentColor;
    transform: translateY(-50%) rotate(45deg);
}
.button019 a:hover {
    background: #6bb6ff;
    color: #FFF;
}
.button019 a:hover:after {  
    right: 1.4rem;
}
.box1 {
    padding: 0.5em 1em;
    margin: 2em 0;
    font-weight: bold;
    border: solid 3px #000000;
}
.box1 p {
    margin: 0; 
    padding: 0;
}
    `;*/
    GM_addStyle(GM_getResourceText("Twipro_css"))
    //document.head.appendChild(quiz_style);
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
    const quiz_list = TwiproData();
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

