<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>INTERACTIVE PHOTOS</title>

    <link rel="stylesheet" type="text/css" href="style.css">

    <script src="libraries/p5.min.js"></script>
    <script src="procedure.js"></script>
    
  </head>

  <body>

    <div id="filter-buttons">
      <button type="button" class="filters" onclick="applyFilter('INVERT')">Invert</button> 
      <button type="button" class="filters" onclick="applyFilter('POSTERIZE')">Posterize</button> 
      <button type="button" class="filters" onclick="applyFilter('THRESHOLD')">Threshold</button> 
      <button type="button" class="filters" onclick="applyFilter('GRAY')">Gray</button> 
  </div>

    <div id="shape-buttons">
      <button type="button" class="shapes" onclick="applyShape('star')">Star</button> 
      <button type="button" class="shapes" onclick="applyShape('heart')">Heart</button> 
  </div>

    <div id="color-buttons">
      <button type="button" class="colors" onclick="applyColor('white')">White</button>
      <button type="button" class="colors" onclick="applyColor('black')">Black</button>
      <button type="button" class="colors" onclick="applyColor('random')">Random</button>
  </div>    



  <script>
    function applyFilter(selectedFilter) {
        if (currentImage) { // Ensure there's an image on screen before applying a filter
            if (selectedFilter === 'POSTERIZE') {
                currentImage.filter(POSTERIZE, 10);
            } else if (selectedFilter === 'INVERT') {
                currentImage.filter(INVERT);
            } else if (selectedFilter === 'THRESHOLD') {
                currentImage.filter(THRESHOLD, 0.3);
            } else if (selectedFilter === 'GRAY') {
                currentImage.filter(GRAY);
            }
  
            // Redraw the image with the applied filter
            background(0);
            let imgW = currentImage.width;
            let imgH = currentImage.height;
            let scaleFactor = min(width / imgW, height / imgH) / 1.5;
            let newWidth = imgW * scaleFactor;
            let newHeight = imgH * scaleFactor;
  
            image(currentImage, width / 2, height / 2, newWidth, newHeight);
            noTint();
        }
    }
  </script>

    <script>
      function applyShape(selectedShape) {
        currentDecoupe = selectedShape;
        redraw();
      }
    </script>
    
    <script>
      function applyColor(selectedColor) {
        currentColor = selectedColor;
      }
    </script>
  </body>
</html>
