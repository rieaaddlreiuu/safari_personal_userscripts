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
    function import_script(src) {
        let script = document.createElement('script');
        script.src = src;
        document.head.appendChild(script);
    }
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
    function random(min, max) {
        return Math.random() * (max - min) + min;
    }
    let quiz_position = 1000;
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
    cyclicExecute(100, () => {
        let timeline_rect = document.querySelector('[role="main"]').getBoundingClientRect();
        console.log(timeline_rect.height);
        if (quiz_position < timeline_rect.height) {
            let left_margin = document.querySelector('[role="banner"]').getBoundingClientRect().width;
            let test_html = `<div style="position:absolute; top: ` + quiz_position + `px; left: ` + left_margin + `px; z-index: 10000; background-color: #FFFFFF; width: ` + timeline_rect.width + `px; color: #000000;">
            <div class="box1">
            물리학 입문 <b>과제</b>가 너무 많다!
            
            太字部分の意味は？
            </div>
            <div class="button019">
	            <a>価値</a>
            </div>
            <div class="button019 correct_answer">
	            <a>課題</a>
            </div>
            <div class="button019">
	            <a>内容</a>
            </div>
                    <details>
                    <summary>答え</summary>
                    (2)の「課題」！
                    </details></div>`;
            document.getElementById("react-root").children[0].children[0].children[0].insertAdjacentHTML("afterend", test_html);
            let correct_answer_elements = document.getElementsByClassName("correct_answer");
            for (let i = 0; i < correct_answer_elements.length; i++) {
                correct_answer_elements[i].addEventListener("click", function () {
                    this.parentNode.style = "display:none;";
                });
            }
            quiz_position += random(600, 3000);
        }
    })
})();

