function updatePrompterDisplay() {
    prompter.innerText = inputField.value.toUpperCase();
}

/*
TODO: FIGURE OUT HOW TO DO SPEED AND SUCH VIA AN ENUM

ALSO OPTION FOR LINE BY LINE JUMPING

CONSOLE DISPLAY FOR SETTINGS? OR UPDATE BUTTON LABELS

ADD END-OF-TEXT FOR MAIN DISPLAY

*/

function scrollDiv_init() {
    // TODO: can we use the other selector instead of the id?
    // EDIT: I tried it but the selector needs be the parent div not the prompter directly.
    scrollingDiv = document.getElementById('box-1');
    reachedMaxScroll = false;
    scrollingDiv.scrollTop = 0;
    previousScrollTop = 0;

    ScrollInterval = setInterval('scrollDiv()', scrollSpeed);
}

function scrollDiv() {
    if (ableToScroll) {
        if (!reachedMaxScroll) {
            scrollingDiv.scrollTop = previousScrollTop;
            previousScrollTop++;
            reachedMaxScroll = scrollingDiv.scrollTop >= (scrollingDiv.scrollHeight - scrollingDiv.offsetHeight);
            console.log(("func " + scrollSpeed));
        } else {
            reachedMaxScroll = (scrollingDiv.scrollTop == 0) ? false : true;
            scrollingDiv.scrollTop = previousScrollTop;
            previousScrollTop--;
        }
    }
}

// this isnt used currently
function pauseDiv() {
    clearInterval(ScrollInterval);
}

// this isnt used currently
function resumeDiv() {
    previousScrollTop = scrollingDiv.scrollTop;
    ScrollInterval = setInterval('scrollDiv()', scrollSpeed);
}

function increaseScrollSpeed() {
    switch (scrollSpeed) {
        case 10:
            scrollSpeed = 8;
            break;
        case 8:
            scrollSpeed = 2;
            break;
        case 2:
            scrollSpeed = 10;
            break;
    }
    clearInterval(ScrollInterval);
    ScrollInterval = setInterval('scrollDiv()', scrollSpeed);
}

function swapColorScheme() {
    // getComputedStyle(document.documentElement).setProperty('--primary-background-color', 'green');
    document.documentElement.style.setProperty('--primary-background-color', 'green');
}

// Variables
var scrollSpeed = 10; // How fast we scroll, maybe have a second value for slower rewind?
var horizontal = true; // A false value will load the vertical view option when we build that.
var console_logging_active = false;
var ableToScroll = false;
var reachedMaxScroll = false;

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
    if (e.keyCode == 18) {
        ableToScroll = true;
        if (console_logging_active) console.log("Space pressed");
    }
};

document.onkeyup = function(e) {
    e = e || window.event;
    if (e.keyCode == 18) {
        ableToScroll = false;
        if (console_logging_active) console.log("Space lifted");
    }
};

inputField.onkeyup = function() {
    if (console_logging_active) console.log("keyup");
    updatePrompterDisplay();
}

speedButton.addEventListener('click', e => {
    if (console_logging_active) console.log("SPEED button clicked");
    increaseScrollSpeed();
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

// inititializes the scrolling action
scrollDiv_init();

swapColorScheme();