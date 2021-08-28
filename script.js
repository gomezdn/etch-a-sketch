function create_Elements(quantity, element) {  // creates X amount of elements in memory
    let elements = []
    for (let i = 1; i <= quantity; i++) {
        elements.push(document.createElement(element))
    }
    return elements
}


const container = document.querySelector(".container");   // creates default board in memory
create_Elements(256, "div").forEach(element => container.appendChild(element))  // attaches board to container
let divs = container.querySelectorAll("div")            // retrieves divs from default board
divs.forEach(div => div.classList.add("untouched"))    // assigns class untouched to divs


let drawing;                                      // all this block defines the logic for drawing
window.addEventListener("keydown", (e) => {       
    if (e.key == "c") { drawing = true }          
})
window.addEventListener("keyup", (e) => {
    if (e.key == "c") { drawing = false }
})
container.addEventListener("mouseleave", () => drawing = false)
divs.forEach(div => div.addEventListener("mouseover", () => {
    if (drawing) {
        div.classList.add("touched")
    }
}))



const resetBtn = document.querySelector(".resetBtn");

resetBtn.addEventListener("click", () => {
    resetBtn.classList.add("resetClicked")
})
resetBtn.addEventListener("transitionend", () => resetBtn.classList.remove("resetClicked"))

resetBtn.addEventListener("click", () => {
    divs.forEach(div => div.classList.remove("touched"))
})