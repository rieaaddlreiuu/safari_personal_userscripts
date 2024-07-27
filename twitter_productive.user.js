// ==UserScript== 
// @name twitterを生産的にします
// @namespace http://tampermonkey.net/
// @version 0.1
// @description ついでにx.comをtwitter.comに遷移させます
// @author You
// @grant        GM_addStyle
// @grant        GM_getResourceText
// @match https://twitter.com/*
// @match https://x.com/*
// @require 
// @require https://raw.githubusercontent.com/rieaaddlreiuu/safari_personal_userscripts/develop/twitter_productive/modules/basic_features.js?token=GHSAT0AAAAAACTAKNWRBBITWSXZN7AE4GOGZVE23PQ
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
    class quiz_object {
        statement;
        choices;
        correct_answer_number;
        constructor(statement, choice_list, correct_answer_number) {
            this.statement = statement;
            this.choices = choice_list;
            this.correct_answer_number = correct_answer_number;
        };
        outputQuizHtml() {
            let random_sequence = generateRandomSequence(this.choices.length);
            let choices_html = "";
            for (let i = 0; i < this.choices.length; i++) {
                if (this.correct_answer_number == random_sequence[i]) {
                    choices_html = choices_html + `<span class="button019 correct_answer">
	                <a>` + this.choices[random_sequence[i]] + `</a>
                    </span>`;
                } else {
                    choices_html = choices_html + `<span class="button019">
	                <a>` + this.choices[random_sequence[i]] + `</a>
                    </span>`;
                }
            }
            let show_answer_html = `
            <div class="button019 show_answer">
                <a>答えを見る</a>
                <div class="answer box1" style="display:none;">
                ` + this.choices[this.correct_answer_number] + `
                </div>
            </div>
            `;
            let statement_html = `
            <div class="box1">
            ` + this.statement + `
            </div>
            `;
            return statement_html + choices_html + show_answer_html;
        };
    };
    const quiz_list = [
        //new quiz_object("과제の意味は？",["価値","課題","内容"],1),
        new quiz_object("", ["", "", ""], 0),
    ];
    let quiz_position = 3000;
    let style = document.createElement('style');
    style.innerHTML = '';
    document.head.appendChild(style);
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

