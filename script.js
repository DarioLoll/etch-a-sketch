let hoveredCell;
let isMouseDown = false;

const grid = document.querySelector(".grid");
grid.addEventListener("mousedown", () => {
    console.log("grid clicked, hovered cell: " + hoveredCell)
    if (hoveredCell === null) return;
    let hoverClass = "hoveredCell";
    if(!hoveredCell.classList.contains(hoverClass)) {
        hoveredCell.classList.add(hoverClass);
    }
});
addEventListeners();
generateGrid(16, grid);

function generateGrid(size, container) {
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
    let hoverClass = "hoveredCell";
    if(!cell.classList.contains(hoverClass)) {
        cell.classList.add(hoverClass);
    }
}

function onResetClick() {
    alert("reset");
}

function onChangeGridSizeClick() {
    alert("change grid size");
}

function onToggleRainbowClick() {
    alert("toggle rainbow");
}

function onToggleShadingClick() {
    alert("toggle shading");
}

function addEventListeners() {
    document.addEventListener("mousedown", () => isMouseDown = true);
    document.addEventListener("mouseup", () => isMouseDown = false);
    addListener(".button-reset", onResetClick);
    addListener(".button-change-grid-size", onChangeGridSizeClick);
    addListener(".button-toggle-rainbow", onToggleRainbowClick);
    addListener(".button-toggle-shading", onToggleShadingClick);
}

function addListener(selector, func, eventName = "click") {
    let element = document.querySelector(selector);
    if (element === null) {
        console.log("No element found with the selector: " + selector);
        return;
    }
    element.addEventListener(eventName, func);
}