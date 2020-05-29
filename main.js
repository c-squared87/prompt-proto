var console_logging_active = false;

console_logging_active ? alert("logging is on dummy") : console_logging_active = false;

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

    ScrollInterval = setInterval('scrollDiv()', currentScrollSpeed);
}

function scrollDiv() {

    // ableToScroll ? scrollDownPrompter() : console.log("not able");

    // this is silly we will get back to this but it works.
    if (ableToScroll) {
        if (!reachedMaxScroll) {
            scrollDownPrompter();
        } else {
            // This is disabled for now until scrolling back up is implemented.

            // reachedMaxScroll = (scrollingDiv.scrollTop == 0) ? false : true;
            // scrollingDiv.scrollTop = previousScrollTop;
            // previousScrollTop--;
        }
    }
}

function scrollDownPrompter() {
    scrollingDiv.scrollTop = previousScrollTop;
    previousScrollTop++;
    reachedMaxScroll = scrollingDiv.scrollTop >= (scrollingDiv.scrollHeight - scrollingDiv.offsetHeight);
    console.log(("func " + currentScrollSpeed));
}

// this isnt used currently
function pauseDiv() {
    clearInterval(ScrollInterval);
}
// this isnt used currently
function resumeDiv() {
    previousScrollTop = scrollingDiv.scrollTop;
    ScrollInterval = setInterval('scrollDiv()', currentScrollSpeed);
}

function cycleScrollSpeed() {
    switch (currentScrollSpeed) {
        case ScrollSpeeds.slow:
            currentScrollSpeed = ScrollSpeeds.medium;
            break;
        case ScrollSpeeds.medium:
            currentScrollSpeed = ScrollSpeeds.fast;
            break;
        case ScrollSpeeds.fast:
            currentScrollSpeed = ScrollSpeeds.keystroke;
            break;
        default:
            currentScrollSpeed = ScrollSpeeds.slow
            break;
    }
    clearInterval(ScrollInterval);
    // console.log(currentScrollSpeed)
    ScrollInterval = setInterval('scrollDiv()', currentScrollSpeed);
}

function swapColorScheme() {
    // getComputedStyle(document.documentElement).setProperty('--primary-background-color', 'green');
    document.documentElement.style.setProperty('--primary-background-color', 'green');
}

// Variables
const ScrollSpeeds = {
    "keystroke": 0,
    "slow": 14,
    "medium": 8,
    "fast": 3,
}

const FontSizes = {
    "small": "55", // Sainz
    "medium": "66",
    "large": "77", // Bottas
    "zoom": "88", // Kubica
}

Object.freeze(ScrollSpeeds);
Object.freeze(FontSizes);

var currentScrollSpeed = ScrollSpeeds.medium; // maybe have a second value for slower rewind?
var currentFontSize = FontSizes.medium;

var horizontal = true; // A false value will load the vertical view option when we build that.

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
    cycleScrollSpeed();
})

contrastButton.addEventListener('click', e => {
    if (console_logging_active) console.log("CONTRAST button clicked");
})

sizeButton.addEventListener('click', e => {
    if (console_logging_active) console.log("SIZE button clicked");
    switch (currentFontSize) {
        case FontSizes.small:
            currentFontSize = FontSizes.medium;
            break;
        case FontSizes.medium:
            currentFontSize = FontSizes.large;
            break;
        case FontSizes.large:
            currentFontSize = FontSizes.zoom;
            break;
        default:
            currentFontSize = FontSizes.small;
            break;
    }
    prompter.style.fontSize = currentFontSize;

})

viewButton.addEventListener('click', e => {
    if (console_logging_active) console.log("VIEW button clicked");
})

// inititializes the scrolling action
scrollDiv_init();

swapColorScheme();