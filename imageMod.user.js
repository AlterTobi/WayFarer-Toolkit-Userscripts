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
.material-icons-fontsize {
  font-size: 48px;
}
.lupe {
  z-index: 9999;
  position: absolute;
}
    `;
            headElem.appendChild(customStyleElem);
    	}
    }

    function addFullImageButton(elem, url, target, style = ""){
    	let a = document.createElement("a");
    	let span = document.createElement("span");

        span.className = "material-icons material-icons-fontsize";
        span.innerText = 'search';
    	a.appendChild(span);
    	a.target = target;
    	a.href = url;
        a.className = "lupe";

        elem.parentNode.style += " position: relative";
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
                elem = document.getElementsByClassName("wf-image-modal flex-grow bg-contain bg-center bg-no-repeat");
        		imageUrl = myData.imageUrl + "=s0";
        		addFullImageButton(elem[0],imageUrl,'mainImage');
    			break;
    		case "PHOTO":
    			break;
    	}
    }

    window.addEventListener("WFTReviewPageLoad", () => {setTimeout(addFullSizeImageLinks,100)});

    console.log('WFTU Script loaded: imageMod');
})();
