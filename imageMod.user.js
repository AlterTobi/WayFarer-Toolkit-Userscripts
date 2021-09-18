// ==UserScript==
// @name         WFTU image Mods
// @namespace    http://tampermonkey.net/
// @version      0.0.1
// @description  open fullsize images in "named" tabs
// @author       AlterTobi
// @match        https://wayfarer.nianticlabs.com/*
// @downloadURL  https://github.com/AlterTobi/WayFarer-Toolkit-Userscripts/raw/release/imageMod.user.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function addCSS(){
    	let myID = 'imageModsCSS';
    	//already there?
    	if ( null === document.getElementById(myID)) {
            let headElem = document.getElementsByTagName("HEAD")[0];
            let customStyleElem = document.createElement("style");
            customStyleElem.setAttribute('id',myID);
            customStyleElem.innerText = `
    `;
            headElem.appendChild(customStyleElem);
    	}
    }

    function addFullImageButton(elem, url, target, style = ""){
    	let a = document.createElement("a");
    	let span = document.createElement("span");

        span.className = "glyphicon glyphicon-search";
    	a.appendChild(span);
    	a.setAttribute("style", style);
    	a.className = "button btn btn-default";
    	a.style.width = "min-content";
    	a.style.position = "absolute";
    	a.target = target;
    	a.href = url;

    	elem.insertAdjacentElement("afterBegin",a);
    }

    function addFullSizeImageLinks() {
    	let elem, imageUrl;
    	let myData = window.wft.reviewApp.pageData;

    	switch (myData.type) {
    		case "NEW":
    			elem = document.getElementById("photo-card").querySelector("div.card__body");
    			imageUrl = myData.imageUrl + "=s0";
    			addFullImageButton(elem,imageUrl,'mainImage');

    			//Supporting Image
        		if (myData.supportingImageUrl){
        			elem = document.getElementById("supporting-card").querySelector("div.card__body");
        			imageUrl = myData.supportingImageUrl + "=s0";
        			addFullImageButton(elem,imageUrl,'supportingImage')
        		}
    			break;
    		case "EDIT":
        		elem = document.querySelector("div.known-information.known-information__image.clickable");
        		imageUrl = myData.imageUrl + "=s0";
        		addFullImageButton(elem,imageUrl,'mainImage', "position: relative; top: -125px; left: 25px;");
    			break;
    		case "PHOTO":
    			break;
    	}
    }

    window.addEventListener("WFTReviewPageLoad", () => {setTimeout(addFullSizeImageLinks,100)});

    console.log('WFTU Script loaded: imageMod');
})();
