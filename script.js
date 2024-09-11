const grid = document.querySelector(".grid");
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