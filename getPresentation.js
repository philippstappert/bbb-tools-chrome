/**
 * Copyright (c) 2021 philipprogramm aka. Philipp Stappert
 * https://www.philipprogramm.de
 * 
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 * 
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

function imageExists(image_url){
    var http = new XMLHttpRequest();
    http.open('HEAD', image_url, false);
    http.send();
    return http.status != 404;
}

function loadPage(page){
    // get whiteboard url from chrome storage
    chrome.storage.sync.get(['wbUrl'], function(result) {
        // create full image url
        var fullUrl = result.wbUrl + page;

        // check if image exists
        if (imageExists(fullUrl)){
            // load image into page
            let imageContainer = document.getElementById('imagecontainer'); // get element
            imageContainer.innerHTML = '<img src="' + fullUrl + '" width="100%" height="100%" alt="Image not found.">'

            // save page into div
            let actPage = document.getElementById('actPage');
            actPage.innerHTML = page;

        }
    });
}

function nextPage(){
    // get actual page
    var page = parseInt(document.getElementById('actPage').innerHTML);

    // load image
    loadPage(page+1);
}

function lastPage(){
    // get actual page
    var page = parseInt(document.getElementById('actPage').innerHTML);

    // load image
    loadPage(page-1);
}

// next button
let nextButton = document.getElementById('nextPage');
nextButton.onclick = function(element) {
    nextPage();
}

// last button
let lastButton = document.getElementById('lastPage');
lastButton.onclick = function(element) {
    lastPage();
}

window.onload = function() {
    loadPage(1);
}