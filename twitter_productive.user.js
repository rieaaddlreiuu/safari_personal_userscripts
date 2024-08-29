// ==UserScript==
// @name twitterを生産的にします
// @namespace http://tampermonkey.net/
// @version 0.1
// @description try to take over the world!
// @author You
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
    let style = document.createElement('style');
    style.innerHTML = `
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
`;
    document.head.appendChild(style);
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
    let set_quiz_time = 20;
    let WA_count = 1;
    let CA_count = 1;
    document.body.insertAdjacentHTML("afterend",`<div id="time_display" style="
        position:absolute;
        top: `+(window.outerHeight - 30) +`px;
        left: `+(window.outerWidth - 30) +`px;
    "></div>`);
    const quiz_list = TwiproData();
    cyclicExecute(1000, () => {
        let timeline_rect = document.querySelector('[role="main"]').getBoundingClientRect();
        if (set_quiz_time <= 0) {
            quiz_position = window.scrollY + window.outerHeight + 100;
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
                CA_count++;
                set_quiz_time += (60*CA_count)/(WA_count+CA_count);
            });
            let wrong_item_elem = quiz_element.getElementsByClassName("wrong_answer");
            Array.prototype.forEach.call(wrong_item_elem, function (item) {
                item.addEventListener('click', function () {
                    WA_count++;
                });
            });
            quiz_element.getElementsByClassName("show_answer")[0].addEventListener('click', function () {
                this.children[1].style = "";
            });
            set_quiz_time = 1;
        }
        document.getElementById("time_display").innerHTML = set_quiz_time;
        console.log(set_quiz_time);
        set_quiz_time--;
    })
})();

