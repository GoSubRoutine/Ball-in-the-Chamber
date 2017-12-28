"use strict";
var frame_utils;
(function (frame_utils) {
    function expandFrame() {
        const frame = frameElement;
        if (frame) {
            frame.width = scrollWidth() + 'px';
            frame.height = scrollHeight() + 'px';
        }
    }
    frame_utils.expandFrame = expandFrame;
    function scrollWidth() {
        return Math.max(document.body.scrollWidth, document.documentElement.scrollWidth, document.body.offsetWidth, document.documentElement.offsetWidth, document.body.clientWidth, document.documentElement.clientWidth);
    }
    frame_utils.scrollWidth = scrollWidth;
    function scrollHeight() {
        return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight);
    }
    frame_utils.scrollHeight = scrollHeight;
})(frame_utils || (frame_utils = {}));
