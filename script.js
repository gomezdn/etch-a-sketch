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

const container = document.querySelector(".container");  // retrieves main container for divs

appendChildren(container, create_Elements(256, "div"))  // attaches divs to container

let divs = container.querySelectorAll("div")            // retrieves divs from default board

divs.forEach(div => div.classList.add("untouched"))    // assigns class untouched to divs

const sizeSelect = document.querySelector("#selectSize");


for (let i = 2; i <= 50; i++) {                        // creates the options to select the size of the container
    let option = document.createElement("option")      
    option.value = i;
    option.label = `${i}`;
    if (i == 16) {option.selected = true}
    sizeSelect.appendChild(option)
}                                                      



function makeBoardDrawable(board, boardDivs) {
    let drawing;                                     
    window.addEventListener("keydown", (e) => {       
        if (e.key == "c") { drawing = true }          
    })
    window.addEventListener("keyup", (e) => {
        if (e.key == "c") { drawing = false }
    })
    board.addEventListener("mouseleave", () => drawing = false)
    boardDivs.forEach(div => div.addEventListener("mouseover", () => {
        if (drawing) {
            div.classList.add("touched")
        }
    }))     
}

makeBoardDrawable(container, divs)


const clearBtn = document.querySelector(".clearBtn");

clearBtn.addEventListener("click", () => {      // retrieves the button from html to clear the board 
    clearBtn.classList.add("clearClicked")
})
clearBtn.addEventListener("transitionend", () => clearBtn.classList.remove("clearClicked")) // just clearButton styling

clearBtn.addEventListener("click", () => {        // clears the board when clear button pressed
    divs.forEach(div => div.classList.remove("touched"))
})


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
    makeBoardDrawable(container, newDivs)
    appendChildren(container, newDivs)
})

