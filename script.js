let hoveredCell;
let hoverClass = "hoveredCell";
let isMouseDown = false;

let isRainbowToggled = false;
let isShadingToggled = false;

const grid = document.querySelector(".grid");
grid.addEventListener("mousedown", () => {
    if (hoveredCell === null) return;
    colorCell(hoveredCell);
});
addEventListeners();
generateGrid(16, grid);

function generateGrid(size, container) {
    container.replaceChildren();
    let containerWidth = getComputedStyle(container).width;
    containerWidth = parseInt(containerWidth.slice(0, -2));
    let cellSize = containerWidth  / size;

    for (let i = 0; i < size * size; i++) {
        let cell = document.createElement("div");
        cell.draggable = false;
        cell.classList.toggle("cell");
        cell.style.width = cellSize + "px";
        cell.style.height = cellSize + "px";

        cell.addEventListener("mouseleave", () => hoveredCell = null)
        cell.addEventListener("mouseenter", () => onCellHovered(cell))

        container.appendChild(cell);
    }
}

function onCellHovered(cell) {
    hoveredCell = cell;
    if(!isMouseDown) return;
    colorCell(cell);
}

function colorCell(cell) {
    if(!cell.classList.contains(hoverClass)) {
        cell.classList.add(hoverClass);
    }
    if (isRainbowToggled) {
        cell.style.backgroundColor = getRandomColor();
    } else if (isShadingToggled) {
        applyShading(cell);
    }
}

function applyShading(cell) {
    let currentBackground = getComputedStyle(cell).backgroundColor;
    console.log("current background " + currentBackground);
    let currentOpacity = getOpacity(currentBackground);
    console.log("current opacity " + currentOpacity);

    //opacity shouldn't exceed 1 and should reset to 0.1 instead
    let newOpacity = currentOpacity + 0.1 > 1 ? 0.1 : currentOpacity + 0.1;
    let newColor = setOpacity(currentBackground, newOpacity);
    cell.style.backgroundColor = newColor;
    console.log("setting new color " + cell.style.backgroundColor);
}

function getOpacity(rgbaString) {
    if (!rgbaString.includes("rgba")) {
        return 1;
    }
    let colorValues = rgbaString.replace(")", "").split(", ");
    return parseFloat(colorValues[3]);
}

function setOpacity(rgbString, opacity) {
    if (!rgbString.includes("rgba")) {
        rgbString = rgbString.replace("rgb", "rgba");
    }
    let colorValues = rgbString.replace(")", "").replace("rgba(", "").split(", ");
    let newColor = `rgba(${colorValues[0]}, ${colorValues[1]}, ${colorValues[2]}, ${opacity})`;
    return newColor;
}

function getRandomColor() {
    let randomRed = Math.random() * 255;
    let randomBlue = Math.random() * 255;
    let randomGreen = Math.random() * 255;
    return `rgb(${randomRed}, ${randomBlue}, ${randomGreen})`;
}

function onResetClick() {
    let cellsToReset = document.querySelectorAll("." + hoverClass);
    cellsToReset.forEach(cell => {
        cell.classList.remove(hoverClass);
        cell.style["background-color"] = ""
    });
}

function onChangeGridSizeClick() {
    let newSize = prompt("Enter the new grid size: ", 16);
    if (newSize === null) return;
    newSize = parseInt(newSize);
    if (newSize === NaN || newSize > 100 || newSize < 1) {
        alert("Please enter a valid number between 1 and 100!");
        return;
    }
    generateGrid(newSize, grid);
}

function addEventListeners() {
    document.addEventListener("mousedown", () => isMouseDown = true);
    document.addEventListener("mouseup", () => isMouseDown = false);
    addListener(".button-reset", onResetClick);
    addListener(".button-change-grid-size", onChangeGridSizeClick);
    addListener(".button-toggle-rainbow", () => {
        isRainbowToggled = !isRainbowToggled;
        isShadingToggled = false;
    });
    addListener(".button-toggle-shading", () => {
        isShadingToggled = !isShadingToggled;
        isRainbowToggled = false;
    });
}

function addListener(selector, func, eventName = "click") {
    let element = document.querySelector(selector);
    if (element === null) {
        console.log("No element found with the selector: " + selector);
        return;
    }
    element.addEventListener(eventName, func);
}