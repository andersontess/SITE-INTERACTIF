let photos = [];
let currentImage;
let drawing = false;
let currentFilter = null;
let currentDecoupe = 'star';         
let currentColor = 'random'                                     ;


function preload() {
    for (let i = 2; i < 13; i++) {
        photos[i] = loadImage('img/photo' + i + '.png');
    }
}


function setup() {
    let cnv = createCanvas(windowWidth, windowHeight);
    cnv.position(0, 0);  
    cnv.style('display', 'block'); 
    imageMode(CENTER);
    frameRate(60);
    background(0);

    let instructions = createP("Press 'D' to draw, Press 'S' to save");
    instructions.style("color", "white");
    instructions.style("font-size", "18px");
    instructions.style("font-weight", "bold");
    instructions.style("text-align", "center");
    instructions.style("background", "black");
    instructions.style("padding", "10px");
    instructions.style("width", "100%");
    instructions.style("font-family", "Arial");
    instructions.position(0, 0);
}


function draw() {
    if (currentImage && drawing) {
        let decoupeSize = 50; 

        let randomX = random(currentImage.width - decoupeSize);
        let randomY = random(currentImage.height - decoupeSize);

        let decoupe = currentImage.get(randomX, randomY, decoupeSize, decoupeSize);

        // Change color manually instead of using tint()
        if (currentColor !== 'original') {
            decoupe = recolorImage(decoupe, currentColor);
        }

        if (currentDecoupe) {
            let maskedDecoupe;
            if (currentDecoupe === 'star') {
                maskedDecoupe = createStarMask(decoupe);
            } else if (currentDecoupe === 'heart') {
                maskedDecoupe = createHeartMask(decoupe);
            }

            image(maskedDecoupe, mouseX, mouseY);
        }
    }
}

function recolorImage(img, color) {
    let recolored = createImage(img.width, img.height);
    recolored.loadPixels();
    img.loadPixels();

    let rNew, gNew, bNew;
    if (color === 'white') {
        rNew = 255; gNew = 255; bNew = 255;
    } else if (color === 'black') {
        rNew = 0; gNew = 0; bNew = 0;
    } else if (color === 'random') {
        rNew = random(255);
        gNew = random(255);
        bNew = random(255);
    }

    for (let i = 0; i < img.pixels.length; i += 4) {
        let alpha = img.pixels[i + 3]; 
        if (alpha > 0) { 
            recolored.pixels[i] = rNew;
            recolored.pixels[i + 1] = gNew;
            recolored.pixels[i + 2] = bNew;
            recolored.pixels[i + 3] = alpha;
        } else {
            recolored.pixels[i] = img.pixels[i];
            recolored.pixels[i + 1] = img.pixels[i + 1];
            recolored.pixels[i + 2] = img.pixels[i + 2];
            recolored.pixels[i + 3] = img.pixels[i + 3];
        }
    }

    recolored.updatePixels();
    return recolored;
}


function createStarMask(img) {
    let pg = createGraphics(img.width, img.height);
    pg.clear();

    let starSize = img.width * 0.35; 
    let cx = img.width / 2;
    let cy = img.height / 2;
    let radius1 = starSize / 2; 
    let radius2 = starSize / 4; 
    let points = 5; 

    pg.beginShape();
    for (let i = 0; i < points * 2; i++) {
        let angle = map(i, 0, points * 2, 0, TWO_PI);
        let r = i % 2 === 0 ? radius1 : radius2;
        let x = cx + cos(angle) * r;
        let y = cy + sin(angle) * r;
        pg.vertex(x, y);
    }
    pg.endShape(CLOSE);

    
    img.mask(pg);
    return img;
}


function createHeartMask(img) {
    let pg = createGraphics(img.width, img.height);
    pg.clear();

    let size = img.width * 0.5; 
    let cx = img.width / 2;
    let cy = img.height / 2;
    let topOffset = size * 0.1; 

    pg.fill(255); // White mask
    pg.noStroke();

    pg.beginShape();
    
    // Left curve
    pg.vertex(cx, cy + size * 0.3); 
    pg.bezierVertex(cx - size * 0.5, cy - topOffset, cx - size * 0.3, cy - size * 0.6, cx, cy - size * 0.3);
    
    // Right curve
    pg.bezierVertex(cx + size * 0.3, cy - size * 0.6, cx + size * 0.5, cy - topOffset, cx, cy + size * 0.3);
    
    pg.endShape(CLOSE);

    img.mask(pg);
    return img;
}


function mousePressed(event) {
    // Check if the click happened inside a button
    if (event.target.closest("button")) {
        return; 
    }

    // Otherwise, proceed with showing a random image
    background(0);
    let img = random(photos);
    currentImage = img;

    let imgW = currentImage.width;
    let imgH = currentImage.height;
    let scaleFactor = min(width / imgW, height / imgH) / 1.5;

    let newWidth = imgW * scaleFactor;
    let newHeight = imgH * scaleFactor;

    image(img, width / 2, height / 2, newWidth, newHeight);
    noTint();
}


function keyPressed() {
    if (key === 's') {
        saveCanvas('p2', 'png');
    } else if (key === 'd') {
        drawing = !drawing;
    }
}














