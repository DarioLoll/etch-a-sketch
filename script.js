const grid = document.querySelector(".grid");
addEventListeners();
generateGrid(16, grid);

function generateGrid(size, container) {
    let containerWidth = getComputedStyle(container).width;
    containerWidth = parseInt(containerWidth.slice(0, -2));
    let cellSize = containerWidth  / size;

    for (let i = 0; i < size * size; i++) {
        let cell = document.createElement("div");
        cell.classList.toggle("cell");
        cell.style.width = cellSize + "px";
        cell.style.height = cellSize + "px";

        cell.addEventListener("mouseenter", () => {
            let hoverClass = "hoveredCell";
            if(!cell.classList.contains(hoverClass)) {
                cell.classList.add(hoverClass);
            }
        })

        container.appendChild(cell);
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