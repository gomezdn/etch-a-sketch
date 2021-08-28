function create_Elements(quantity, element) {
    let elements = []
    for (let i = 1; i <= quantity; i++) {
        elements.push(document.createElement(element))
    }
    return elements
}

const container = document.querySelector("#container"); 

create_Elements(256, "div").forEach(element => container.appendChild(element))

let divs = container.querySelectorAll("div")

divs.forEach(div => div.classList.add("untouched"))