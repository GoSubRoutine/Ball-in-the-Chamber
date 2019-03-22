"use strict";
function adjustFrameSize() {
    const frame = frameElement;
    if (frame) {
        frame.width = getDocWidth() + 'px';
        frame.height = '0px'; // FF workaround to force scrollHeight recalculation!
        frame.height = getDocHeight() + 'px';
    }
}
function getDocWidth() {
    return Math.max(document.body.scrollWidth, document.documentElement.scrollWidth, document.body.offsetWidth, document.documentElement.offsetWidth, document.body.clientWidth, document.documentElement.clientWidth);
}
function getDocHeight() {
    return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight);
}
