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
				@font-face {
				  font-family: 'Material Icons';
				  font-style: normal;
				  font-weight: 400;
				  src: url(https://fonts.gstatic.com/s/materialicons/v103/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2) format('woff2');
				}
				
				.material-icons {
				  font-family: 'Material Icons';
				  font-weight: normal;
				  font-style: normal;
				  font-size: 36px;
				  line-height: 1;
				  letter-spacing: normal;
				  text-transform: none;
				  display: inline-block;
				  white-space: nowrap;
				  word-wrap: normal;
				  direction: ltr;
				  -webkit-font-feature-settings: 'liga';
				  -webkit-font-smoothing: antialiased;
				}
				.lupe {
				  z-index: 9999;
				  position: fixed;
				}
            `;
            headElem.appendChild(customStyleElem);
    	}
    }

    function addFullImageButton(elem, url, target, style = ""){
    	let a = document.createElement("a");
    	let span = document.createElement("span");

        span.className = "material-icons";
        span.innerText = 'search';
    	a.appendChild(span);
    	a.target = target;
    	a.href = url;
        a.className = "lupe";
    	elem.insertAdjacentElement("afterEnd",a);
    }

    function addFullSizeImageLinks() {
    	let elem, imageUrl;
    	let myData = window.wft.reviewApp.pageData;

        addCSS();
    	switch (myData.type) {
    		case "NEW":
    			elem = document.getElementsByClassName("wf-image-modal flex-grow bg-contain bg-center bg-no-repeat");
    			imageUrl = myData.imageUrl + "=s0";
    			addFullImageButton(elem[0],imageUrl,'mainImage');

    			//Supporting Image
        		if (myData.supportingImageUrl){
        			imageUrl = myData.supportingImageUrl + "=s0";
        			addFullImageButton(elem[1],imageUrl,'supportingImage')
        		}
    			break;
    		case "EDIT":
                break;
//        		elem = document.querySelector("div.known-information.known-information__image.clickable");
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
