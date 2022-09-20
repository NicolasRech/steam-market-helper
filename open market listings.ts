// ==UserScript==
// @name        Steam market open orders
// @namespace   hceR scripts
// @match       https://steamcommunity.com/market/
// @version     0
// @author      https://github.com/NicolasRech
// ==/UserScript==

window.addEventListener('load', function () {
    var delayInMilliseconds = 500;

    setTimeout(function () {
        var elements = document.getElementsByClassName("market_listing_item_name_link");

        if (elements.length > 0) {
            let text = "Want to open all orders?";

            console.log(elements);

            if (confirm(text) == true) {
                for (let x = 0; x < elements.length; x++) {
                    window.open(elements[x].href);
                }
            }
        }
    }, delayInMilliseconds);
}, false);