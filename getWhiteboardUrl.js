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

function DOMtoString(document_root) {
    var html = '',
        node = document_root.firstChild;
    while (node) {
        switch (node.nodeType) {
        case Node.ELEMENT_NODE:
            html += node.outerHTML;
            break;
        case Node.TEXT_NODE:
            html += node.nodeValue;
            break;
        case Node.CDATA_SECTION_NODE:
            html += '<![CDATA[' + node.nodeValue + ']]>';
            break;
        case Node.COMMENT_NODE:
            html += '<!--' + node.nodeValue + '-->';
            break;
        case Node.DOCUMENT_TYPE_NODE:
            // (X)HTML documents are identified by public identifiers
            html += "<!DOCTYPE " + node.name + (node.publicId ? ' PUBLIC "' + node.publicId + '"' : '') + (!node.publicId && node.systemId ? ' SYSTEM' : '') + (node.systemId ? ' "' + node.systemId + '"' : '') + '>\n';
            break;
        }
        node = node.nextSibling;
    }
    return html;
}

function getWhiteboardURL(){
    // get document html
    var pageData = DOMtoString(document);

    // get image tag position
    var tagPosition = pageData.indexOf("<image");
    var tagEndPosition = pageData.indexOf("</image>");

    // substring image tag
    var imageHtml = pageData.substring(tagPosition, tagEndPosition);

    // get url start position (by attribute)
    var urlBeginPosition = imageHtml.indexOf('xlink:href="')+12;
    var urlEndPosition = imageHtml.indexOf('"', urlBeginPosition+1);

    // substring to url
    var imgSmall = imageHtml.substring(urlBeginPosition, urlEndPosition);

    // remove last part of url (page)
    var imgUrl = imgSmall.substring(0, imgSmall.lastIndexOf("/")+1);

    // save to chrome storage
    chrome.storage.sync.set({wbUrl: imgUrl}, function() {});
}

setInterval(getWhiteboardURL, 3000);

window.onerror = function myErrorHandler(errorMsg, url, lineNumber) {
    console.log("Error occured: " + errorMsg); //or any message
    return false;
}