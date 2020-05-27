// Fields
const prompter = document.querySelector('[data-prompter-field]')
const inputField = document.querySelector('[data-input-field]')

//Buttons
const speedButton = document.querySelector('[data-scrolling-btn]')
const contrastButton = document.querySelector('[data-contrast-btn]')
const sizeButton = document.querySelector('[data-size-btn]')
const viewButton = document.querySelector('[data-view-btn]')

//Listeners
speedButton.addEventListener('click', e => {
    console.log("SPEED button clicked");
})

contrastButton.addEventListener('click', e => {
    console.log("CONTRAST button clicked");
})

sizeButton.addEventListener('click', e => {
    console.log("SIZE button clicked");
})

viewButton.addEventListener('click', e => {
    console.log("VIEW button clicked");
})