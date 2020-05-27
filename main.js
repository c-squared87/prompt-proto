var logging = false;

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
inputField.onkeyup = function() {
    if (logging) console.log("keyup");
    UpdatePrompter();
}

speedButton.addEventListener('click', e => {
    if (logging) console.log("SPEED button clicked");
})

contrastButton.addEventListener('click', e => {
    if (logging) console.log("CONTRAST button clicked");
})

sizeButton.addEventListener('click', e => {
    if (logging) console.log("SIZE button clicked");
})

viewButton.addEventListener('click', e => {
    if (logging) console.log("VIEW button clicked");
})


// copied and pasted somewhat works lets rework this later.
ScrollRate = 60;

function scrollDiv_init() {

    DivElmnt = document.getElementById('box-1');

    ReachedMaxScroll = false;

    DivElmnt.scrollTop = 0;
    PreviousScrollTop = 0;

    ScrollInterval = setInterval('scrollDiv()', ScrollRate);
}

function scrollDiv() {

    if (!ReachedMaxScroll) {

        DivElmnt.scrollTop = PreviousScrollTop;
        PreviousScrollTop++;

        ReachedMaxScroll = DivElmnt.scrollTop >= (DivElmnt.scrollHeight - DivElmnt.offsetHeight);
    } else {
        ReachedMaxScroll = (DivElmnt.scrollTop == 0) ? false : true;

        DivElmnt.scrollTop = PreviousScrollTop;
        PreviousScrollTop--;
    }
}

function pauseDiv() {
    clearInterval(ScrollInterval);
}

function resumeDiv() {
    PreviousScrollTop = DivElmnt.scrollTop;
    ScrollInterval = setInterval('scrollDiv()', ScrollRate);
}

scrollDiv_init();