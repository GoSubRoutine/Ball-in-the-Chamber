"use strict";
function expandFrame() {
    const frame = frameElement;
    if (frame) {
        frame.width = scrollWidth() + 'px';
        frame.height = scrollHeight() + 'px';
    }
}
function scrollWidth() {
    return Math.max(document.body.scrollWidth, document.documentElement.scrollWidth, document.body.offsetWidth, document.documentElement.offsetWidth, document.body.clientWidth, document.documentElement.clientWidth);
}
function scrollHeight() {
    return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight);
}
