"use strict";
var frame_utils;
(function (frame_utils) {
    function adjustFrameSize() {
        const frame = frameElement;
        if (frame) {
            frame.width = getDocWidth() + 'px';
            frame.height = '0'; // FF workaround to force scrollHeight recalculation!
            frame.height = getDocHeight() + 'px';
        }
    }
    frame_utils.adjustFrameSize = adjustFrameSize;
    function getDocWidth() {
        return Math.max(document.body.scrollWidth, document.documentElement.scrollWidth, document.body.offsetWidth, document.documentElement.offsetWidth, document.body.clientWidth, document.documentElement.clientWidth);
    }
    frame_utils.getDocWidth = getDocWidth;
    function getDocHeight() {
        return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight);
    }
    frame_utils.getDocHeight = getDocHeight;
})(frame_utils || (frame_utils = {}));
