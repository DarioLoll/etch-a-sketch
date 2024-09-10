generateGrid(64);

function generateGrid(size) {
    const container = document.querySelector(".grid");

    let containerWidth = getComputedStyle(container).width;
    containerWidth = parseInt(containerWidth.slice(0, -2));
    let cellSize = containerWidth  / size;

    for (let i = 0; i < size * size; i++) {
        let cell = document.createElement("div");
        cell.classList.toggle("cell");
        cell.style.width = cellSize + "px";
        cell.style.height = cellSize + "px";
        container.appendChild(cell);
    }
}