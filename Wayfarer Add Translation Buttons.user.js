// ==UserScript==
// @name         Wayfarer Add Translation Buttons
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Adds buttons to translate parts or all of the text associated with a wayspot
// @author       MrJPGames / AlterTobi
// @match        https://wayfarer.nianticlabs.com/*
// @icon         https://wayfarer.nianticlabs.com/imgpub/favicon-256.png
// @grant        none
// ==/UserScript==

// Dirt port from WF+

(function() {
    'use strict';

    function addTranslationButtons(){
        let headElem = document.getElementsByTagName("HEAD")[0];
        let customStyleElem = document.createElement("style");
        customStyleElem.innerText = "\
        .translateButton{\
            border: 2pt solid white;\
            border-radius: 2pt;\
            width: 17pt;\
            background-color: white;\
            display: block;\
            height: 17pt;\
            background-size: contain;\
            background-repeat: no-repeat;\
            background-position: center;\
            margin-bottom: 5pt;\
            box-shadow: 0 0 2px grey;\
            }\
            \
            .translateButton > *{\
            display:inline;\
        }";

        headElem.appendChild(customStyleElem);
        if (window.wft.reviewApp.pageData.type === "EDIT") {
            addEditTranslationButtons();
            return;
        }

        let elems = document.getElementById("title-description-card").children[1].children[0].children;

        let style = "background-image: url(https://raw.githubusercontent.com/AlterTobi/WayFarerPlus/master/assets/translate.svg);";

        let allText = "";

        for (let i = 0; i < elems.length; i++){
            let translateButton = document.createElement("a");
                translateButton.setAttribute("target", "wfpTranslate");
            translateButton.setAttribute("class", "translateButton");
            translateButton.setAttribute("style", style);
            translateButton.href = "https://translate.google.com/?sl=auto&q=" + encodeURIComponent(elems[i].innerText);

            allText += elems[i].innerText + "\n\n";

            elems[i].appendChild(translateButton);
        }

        if (window.wft.reviewApp.pageData.supportingImageUrl != ""){
            let elem = document.getElementsByClassName("supporting-info-review-card flex-full xl:flex-1 ng-star-inserted")[0];

            let translateButton = document.createElement("a");
                translateButton.setAttribute("target", "wfpTranslate");
            translateButton.setAttribute("class", "translateButton");
            translateButton.setAttribute("style", style);
            translateButton.href = "https://translate.google.com/?sl=auto&q=" + (encodeURIComponent(elem.getElementsByClassName("wf-review-card__body")[0].innerText));

            allText += elem.getElementsByClassName("wf-review-card__body")[0].innerText + "\n\n";

            document.getElementsByClassName("supporting-info-review-card flex-full xl:flex-1 ng-star-inserted")[0].getElementsByClassName("wf-review-card__body")[0].children[0].children[1].appendChild(translateButton);
        }

        let translateButton = document.createElement("a");
        translateButton.setAttribute("target", "wfpTranslate");
        translateButton.setAttribute("class", "translateButton");
        translateButton.setAttribute("style", "display: inline; color: black;");
        translateButton.href = "https://translate.google.com/?sl=auto&q=" + encodeURIComponent(allText);

        let translateText = document.createElement("span");
        translateText.innerText = "Translate all";

        let translateImage = document.createElement("img");
        translateImage.setAttribute("style", "height: 1.3em;");
        translateImage.src = "https://raw.githubusercontent.com/AlterTobi/WayFarerPlus/master/assets/translate.svg";

        translateButton.appendChild(translateImage);
        translateButton.appendChild(translateText);

        let titleDiv = document.getElementById("title-description-card").children[0].children[0];
        titleDiv.appendChild(translateButton);
    }

    function addEditTranslationButtons(){
        let elems = document.getElementsByClassName("poi-edit-text");

        let style = "background-image: url(https://raw.githubusercontent.com/AlterTobi/WayFarerPlus/master/assets/translate.svg); margin-botton: 0 !important; margin-left: 5pt; display: inline-block;";

        for (let i = 0; i < elems.length; i++){
            let translateButton = document.createElement("a");
                translateButton.setAttribute("target", "wfpTranslate");
            translateButton.setAttribute("class", "translateButton");
            translateButton.setAttribute("style", style);
            translateButton.href = "https://translate.google.com/?sl=auto&q=" + encodeURIComponent(elems[i].innerText);

            elems[i].appendChild(translateButton);
        }
    }

    window.addEventListener("WFTReviewPageLoad", () => {setTimeout(addTranslationButtons,1)});
})();