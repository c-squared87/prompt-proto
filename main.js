var console_logging_active = false;
console_logging_active ? alert("logging is on dummy") : console_logging_active = false;

function updatePrompterDisplay() {
    prompter.innerText = inputField.value.toUpperCase();
}

function updateInfoDisplay() {
    // infoField.innerText = "TXT " + currentFontSize + " SPD " + currentScrollSpeed;

    var d = new Date(),
        minutes = d.getMinutes().toString().length == 1 ? '0' + d.getMinutes() : d.getMinutes(),
        hours = d.getHours().toString().length == 1 ? '0' + d.getHours() : d.getHours(),
        ampm = d.getHours() >= 12 ? 'pm' : 'am',
        months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    // return days[d.getDay()] + ' ' + months[d.getMonth()] + ' ' + d.getDate() + ' ' + d.getFullYear() + ' ' + hours + ':' + minutes + ampm;

    // infoField.innerText += hours + " " + minutes;
    clockDisplay.innerText = hours + " : " + minutes;
}
/*

TODO: IMPERATIVE THINGS:
    - STYLE AND LINK UP DISPLAY
    - STYLE BUTTONS
    - MERGE TO MASTER - THIS IS A RELEASE READY.


ALSO OPTION FOR LINE BY LINE JUMPING

CONSOLE DISPLAY FOR SETTINGS? OR UPDATE BUTTON LABELS WITH CURRENT VALUES
- LETS TRY A DISPLAY BOX IN THE LOWER LEFT CORNER OF THE PROMPTER

RESET TO TOP BUTTON? 
- TODO: LETS USE THE 'ALT VIEW' BUTTON SINCE WE WONT BE GETTING TO THAT RIGHT YET.


WEEK OF THIS TO DO:
make the status bar
STATUS BAR LAYOUT

[ EDIT MODE   SCROLL SPD TXT SIZE TIME ]

implement edit/presenter mode.


*/

function scrollDiv_init() {
    // TODO: can we use the other selector instead of the id?
    // EDIT: I tried it but the selector needs be the parent div not the prompter directly.
    scrollingDiv = document.getElementById('box-1'); // move this?

    reachedMaxScroll = false;
    scrollingDiv.scrollTop = 0;
    previousScrollTop = 0;

    ScrollInterval = setInterval('scrollDiv()', currentScrollSpeed);

    updateInfoDisplay();


}

function resetPrompter() {
    inputField.value = "";
    updatePrompterDisplay();
}

function scrollDiv() {

    // ableToScroll ? scrollDownPrompter() : console.log("not able");

    // this is silly but it works.
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
    speedDisplay.innerText = "SPEED "
    switch (currentScrollSpeed) {
        case ScrollSpeeds.slow:
            currentScrollSpeed = ScrollSpeeds.medium;
            speedDisplay.innerText += "MED"
            break;
        case ScrollSpeeds.medium:
            currentScrollSpeed = ScrollSpeeds.fast;
            speedDisplay.innerText += "FAST"
            break;
        case ScrollSpeeds.fast:
            currentScrollSpeed = ScrollSpeeds.manual;
            speedDisplay.innerText += "MANUAL"
            break;
        default:
            currentScrollSpeed = ScrollSpeeds.slow
            speedDisplay.innerText += "SLOW"
            break;
    }

    speedDisplay.innerText = currentScrollSpeed.
    clearInterval(ScrollInterval);
    ScrollInterval = setInterval('scrollDiv()', currentScrollSpeed);
    updateInfoDisplay();

}

function cycleFontSize() {
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
    updateInfoDisplay();

}

// Variables
const ScrollSpeeds = {
    "manual": 0,
    "slow": 14,
    "medium": 8,
    "fast": 3,
}

// const FontSizes = {
//     "small": "55", // Sainz
//     "medium": "66",
//     "large": "77", // Bottas
//     "zoom": "88", // Kubica
// }
const FontSizes = {
    small: "55", // Sainz
    medium: "66",
    large: "77", // Bottas
    zoom: "88", // Kubica
}

Object.freeze(ScrollSpeeds);
Object.freeze(FontSizes);

var currentScrollSpeed = ScrollSpeeds.medium; // maybe have a second value for slower rewind?
var currentFontSize = FontSizes.medium;

var horizontal = true; // A false value will load the vertical view option when we build that.

var ableToScroll = false;
var reachedMaxScroll = false;

const color_A = "black";
const color_B = "white";

// Fields
const prompter = document.querySelector('[data-prompter-field]');
const inputField = document.querySelector('[data-input-field]');

const infoField = document.querySelector('[data-session-info]');

const textSizeDisplay = document.querySelector('[data-size-field]');
const speedDisplay = document.querySelector('[data-speed-field]');
const clockDisplay = document.querySelector('[data-clock-field]');

//FOR TESTING
const promptBKG = document.getElementById("box-1");

// Buttons
const speedButton = document.querySelector('[data-scrolling-btn]');
// const contrastButton = document.querySelector('[data-contrast-btn]');
const sizeButton = document.querySelector('[data-size-btn]');
const resetButton = document.querySelector('[data-view-btn]');

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

// contrastButton.addEventListener('click', e => {
//     if (console_logging_active) console.log("CONTRAST button clicked");
//     swapColorScheme();

// })

sizeButton.addEventListener('click', e => {
    if (console_logging_active) console.log("SIZE button clicked");
    cycleFontSize();

})

resetButton.addEventListener('click', e => {
    if (console_logging_active) console.log("RESET button clicked");
    resetPrompter();
})

// inititializes the scrolling action
scrollDiv_init();