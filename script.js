function create_Elements(quantity, element) {  // creates X amount of elements in memory
    let elements = []
    for (let i = 1; i <= quantity; i++) {
        elements.push(document.createElement(element))
    }
    return elements
}

function appendChildren(parent, children) {
    children.forEach(child => parent.appendChild(child))
}

            // ALL THIS BLOCK BELOW CREATES THE DEFAULT BOARD --> //

const container = document.querySelector(".container");  // retrieves main container for divs
container.addEventListener("contextmenu", e => e.preventDefault())
appendChildren(container, create_Elements(256, "div"))  // attaches divs to container
let divs = container.querySelectorAll("div")            // retrieves divs from default board
divs.forEach(div => div.classList.add("untouched"))    // assigns class untouched to divs
const sizeSelect = document.querySelector("#selectSize");

for (let i = 2; i <= 50; i++) {                       // creates the options to select the size of the container
    let option = document.createElement("option")      
    option.value = i;
    option.label = `${i}*${i}`;
    if (i == 16) {option.selected = true}
    sizeSelect.appendChild(option)
}                                                      

let drawingColor = "rgb(36, 36, 36)";                
const colorPicker = document.querySelector("#colorPicker");       
colorPicker.addEventListener("change", () => drawingColor = colorPicker.value)




function makeBoardDrawable(boardDivs) {
    let drawing;
    boardDivs.forEach(div => div.addEventListener("mousedown", e => {
        drawing = e.button == "0";
        if (drawing) {div.style.backgroundColor = drawingColor}
    }))
    window.addEventListener("mouseup", () => drawing = false)
    boardDivs.forEach(div => div.addEventListener("mouseover", () => {
        if (drawing) {div.style.backgroundColor = drawingColor}
    }))     
}

function makeBoardErasable(boardDivs) {
    let erasing;
    window.addEventListener("mouseup", () => erasing = false)
    boardDivs.forEach(div => div.addEventListener("mousedown", e => {
        erasing = e.button == "2";
        if (erasing) {div.style.backgroundColor = "rgb(236, 234, 234)"}
    }))

    boardDivs.forEach(div => div.addEventListener("mouseover", () => {
        if (erasing) {div.style.backgroundColor = "rgb(236, 234, 234)"}
    }))   
}

makeBoardDrawable(divs)
makeBoardErasable(divs)

const clearBtn = document.querySelector(".clearBtn");

clearBtn.addEventListener("click", () => {      // retrieves the button from html to clear the board 
    clearBtn.classList.add("clearClicked")
})
clearBtn.addEventListener("transitionend", () => clearBtn.classList.remove("clearClicked")) // just clearButton styling

clearBtn.addEventListener("click", () => {        // clears the board when clear button pressed
    divs.forEach(div => div.style.backgroundColor = "rgb(236, 234, 234)")
})

                    // ALL THE BLOCK ABOVE CREATES THE DEFAULT BOARD //




                    // THIS BLOCK BELOW CREATES A NEW BOARD WHEN RESIZING --> //


function removeAllChildren(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild)
    }
}


sizeSelect.addEventListener("change", () => {            // this block deletes all the divs from the board
    removeAllChildren(container);                        // and creates a new amount equally distributed,
    let sideSize = Number(sizeSelect.value)                   // making them also drawable
    let newDivs = create_Elements(sideSize*sideSize, "div")
    newDivs.forEach(div => div.classList.add("untouched"))
    container.style.gridTemplateColumns = `repeat(${sideSize}, 1fr)`
    container.style.gridTemplateRows = `repeat(${sideSize}, 1fr)`
    makeBoardDrawable(newDivs)
    makeBoardErasable(newDivs)
    clearBtn.addEventListener("click", () => newDivs.forEach(div => div.style.backgroundColor = "rgb(236, 234, 234)"))
    appendChildren(container, newDivs)

    
})


                    // THIS BLOCK ABOVE CREATES A NEW BOARD WHEN RESIZING //
