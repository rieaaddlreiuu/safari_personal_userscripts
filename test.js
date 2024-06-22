// ==UserScript==
// @name arrow keys test
// @namespace http://tampermonkey.net/
// @version 0.1
// @description try to take over the world!
// @author You
// @match http*
// @grant none
// ==/UserScript==

(function() {

    document.onload = function (){
        var current_url = location.href;//現在のページのURLを取得
        alert(current_url);
    };
    
    })();