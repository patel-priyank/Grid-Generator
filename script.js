const canvas = document.getElementById('gridCanvas');
const ctx = canvas.getContext('2d');
const downloadBtn = document.getElementById('downloadBtn');

// Input elements
const bgColorInput = document.getElementById('bgColor');
const gridColorInput = document.getElementById('gridColor');
const gridSizeInput = document.getElementById('gridSize');
const lineWidthInput = document.getElementById('lineWidth');
const imageWidthInput = document.getElementById('imageWidth');
const imageHeightInput = document.getElementById('imageHeight');

function drawGrid() {
  const width = parseInt(imageWidthInput.value);
  const height = parseInt(imageHeightInput.value);
  const gridSize = parseInt(gridSizeInput.value);
  const lineWidth = parseFloat(lineWidthInput.value);
  const bgColor = bgColorInput.value;
  const gridColor = gridColorInput.value;

  // Set canvas size
  canvas.width = width;
  canvas.height = height;

  // Fill background
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, width, height);

  // Calculate starting positions to center the grid
  const startX = (width % gridSize) / 2;
  const startY = (height % gridSize) / 2;

  // Draw vertical lines
  ctx.beginPath();
  ctx.strokeStyle = gridColor;
  ctx.lineWidth = lineWidth;

  // Draw vertical lines from the center out
  for (let x = startX; x < width; x += gridSize) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
  }
  for (let x = startX - gridSize; x >= 0; x -= gridSize) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
  }

  // Draw horizontal lines from the center out
  for (let y = startY; y < height; y += gridSize) {
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
  }
  for (let y = startY - gridSize; y >= 0; y -= gridSize) {
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
  }

  ctx.stroke();
}

// Event listeners for all inputs
[bgColorInput, gridColorInput, gridSizeInput, lineWidthInput, imageWidthInput, imageHeightInput].forEach(input => {
  input.addEventListener('input', drawGrid);
});

// Download functionality
downloadBtn.addEventListener('click', () => {
  const link = document.createElement('a');
  link.download = 'grid.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
});

// Initial draw
drawGrid();
