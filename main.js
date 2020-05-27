var console_logging_active = false;

var ableToScroll = false;

function UpdatePrompter() {
    prompter.innerText = inputField.value.toUpperCase();
}

// Variables
var scrollSpeed = 5; // How fast we scroll, maybe have a second value for slower rewind?
var horizontal = true; // A false value will load the vertical view option when we build that.

// Fields
const prompter = document.querySelector('[data-prompter-field]')
const inputField = document.querySelector('[data-input-field]')

// Buttons
const speedButton = document.querySelector('[data-scrolling-btn]')
const contrastButton = document.querySelector('[data-contrast-btn]')
const sizeButton = document.querySelector('[data-size-btn]')
const viewButton = document.querySelector('[data-view-btn]')

// Listeners
document.onkeydown = function(e) {
    e = e || window.event;
    if (e.keyCode == 32) {
        ableToScroll = true;
        if (console_logging_active) console.log("Space pressed");
    }
};

document.onkeyup = function(e) {
    e = e || window.event;
    if (e.keyCode == 32) {
        ableToScroll = false;
        if (console_logging_active) console.log("Space lifted");
    }
};

inputField.onkeyup = function() {
    if (console_logging_active) console.log("keyup");
    UpdatePrompter();
}

speedButton.addEventListener('click', e => {
    if (console_logging_active) console.log("SPEED button clicked");
})

contrastButton.addEventListener('click', e => {
    if (console_logging_active) console.log("CONTRAST button clicked");
})

sizeButton.addEventListener('click', e => {
    if (console_logging_active) console.log("SIZE button clicked");
})

viewButton.addEventListener('click', e => {
    if (console_logging_active) console.log("VIEW button clicked");
})


// copied and pasted somewhat works lets rework this later.
ScrollRate = 20;
reachedMaxScroll = false;

function scrollDiv_init() {

    // TODO: can we use the other selector instead of the id?
    // EDIT: i tried it but the selector needs be the parent div not the prompter directly.
    scrollingDiv = document.getElementById('box-1');


    reachedMaxScroll = false;

    scrollingDiv.scrollTop = 0;
    previousScrollTop = 0;

    ScrollInterval = setInterval('scrollDiv()', ScrollRate);
}

function scrollDiv() {

    if (ableToScroll) {
        if (!reachedMaxScroll) {

            scrollingDiv.scrollTop = previousScrollTop;
            previousScrollTop++;

            reachedMaxScroll = scrollingDiv.scrollTop >= (scrollingDiv.scrollHeight - scrollingDiv.offsetHeight);

        } else {

            reachedMaxScroll = (scrollingDiv.scrollTop == 0) ? false : true;

            scrollingDiv.scrollTop = previousScrollTop;
            previousScrollTop--;
        }
    }


}

function pauseDiv() {
    clearInterval(ScrollInterval);
}

function resumeDiv() {
    previousScrollTop = scrollingDiv.scrollTop;
    ScrollInterval = setInterval('scrollDiv()', ScrollRate);
}

scrollDiv_init();