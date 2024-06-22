// ==UserScript==
// @name tapiokaumexesu
// @namespace http://tampermonkey.net/
// @version 0.1
// @description try to take over the world!
// @author You
// @match https://nicovideo.jp/*
// ==/UserScript==

(function() {

    document.onload = function (){
        var current_url = location.href;//現在のページのURLを取得
        alert(current_url);
    };
    
    })();