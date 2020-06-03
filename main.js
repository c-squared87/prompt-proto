var console_logging_active = false;
console_logging_active ? alert("logging is on dummy") : console_logging_active = false;

function updatePrompterDisplay() {
    prompter.innerText = inputField.value.toUpperCase();
}

// TODO: UNUSED FOR NOW.
function updateInfoDisplay() {

}

// TODO: COMMENT THIS ONE
function scrollDiv_init() {
    scrollingDiv = document.getElementById('box-1'); // move this?

    reachedMaxScroll = false;
    scrollingDiv.scrollTop = 0;
    previousScrollTop = 0;

    ScrollInterval = setInterval('scrollDiv()', currentScrollSpeed);

    updateClock();

    setInterval(function() {
        updateClock();
    }, 1000);

    updateInfoDisplay();
}

function resetPrompter() {
    inputField.value = "";
    updatePrompterDisplay();
}

// TODO: FIGURE OUT HOW TO RESET THE reachedMaxScroll BOOL IF NOT AT BOTTOM E.G. WHEN YOU MANUALLY SCROLL UP.
function scrollDiv() {

    // this is silly but it works.
    if (ableToScroll) {
        if (!reachedMaxScroll) {
            scrollDownPrompter();
        }
    }
}

function updateClock() {

    // TODO: GET TIMEZONE IN THERE.
    // USE getTimezoneOffset - then figure out to take the outputs to a GMT+ value.

    var d = new Date();
    seconds = d.getSeconds().toString().length == 1 ? '0' + d.getSeconds() : d.getSeconds();
    minutes = d.getMinutes().toString().length == 1 ? '0' + d.getMinutes() : d.getMinutes();
    hours = d.getHours().toString().length == 1 ? '0' + d.getHours() : d.getHours();
    // ampm = d.getHours() >= 12 ? 'pm' : 'am',
    // months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    // days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    // return days[d.getDay()] + ' ' + months[d.getMonth()] + ' ' + d.getDate() + ' ' + d.getFullYear() + ' ' + hours + ':' + minutes + ampm;

    clockDisplay.innerText = hours + " : " + minutes + " : " + seconds;
}


function scrollDownPrompter() {
    scrollingDiv.scrollTop = previousScrollTop;
    previousScrollTop++;
    reachedMaxScroll = scrollingDiv.scrollTop >= (scrollingDiv.scrollHeight - scrollingDiv.offsetHeight);
}


// TODO: REBUILD AND STREAMLINE ONCE DICTIONARIES ARE IMPLEMENTED
function cycleScrollSpeed() {

    speedDisplay.innerText = "";

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

    clearInterval(ScrollInterval);
    ScrollInterval = setInterval('scrollDiv()', currentScrollSpeed);
}

// TODO: REBUILD AND STREAMLINE ONCE DICTIONARIES ARE IMPLEMENTED
function cycleFontSize() {

    switch (currentFontSize) {
        case FontSizes.small:
            currentFontSize = FontSizes.medium;
            textSizeDisplay.innerText = "MEDIUM";
            break;
        case FontSizes.medium:
            currentFontSize = FontSizes.large;
            textSizeDisplay.innerText = "LARGE";
            break;
        case FontSizes.large:
            currentFontSize = FontSizes.zoom;
            textSizeDisplay.innerText = "XLARGE";
            break;
        default:
            currentFontSize = FontSizes.small;
            textSizeDisplay.innerText = "SMALL";
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

const FontSizes = {
    small: "55", // Sainz
    medium: "66",
    large: "77", // Bottas
    zoom: "88", // Kubica
}

Object.freeze(ScrollSpeeds);
Object.freeze(FontSizes);

// TODO: MOVE THESE TO INIT? THEN WE CAN UPDATE UI AND SUCH
var currentScrollSpeed = ScrollSpeeds.medium; // maybe have a second value for slower rewind?
var currentFontSize = FontSizes.medium;

var horizontal = true; // A false value will load the vertical view option when we build that.

var ableToScroll = false;
var reachedMaxScroll = false;

// Fields
const prompter = document.querySelector('[data-prompter-field]');
const inputField = document.querySelector('[data-input-field]');

const infoField = document.querySelector('[data-session-info]');

const textSizeDisplay = document.querySelector('[data-size-field]');
const speedDisplay = document.querySelector('[data-speed-field]');
const clockDisplay = document.querySelector('[data-clock-field]');

// Buttons
const speedButton = document.querySelector('[data-scrolling-btn]');
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