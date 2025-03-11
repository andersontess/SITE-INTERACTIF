let photos = [];
let currentImage;
let drawing = false;
let currentFilter = null;

function preload() {
    for (let i = 1; i < 25; i++) {
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
}


function draw() {
    if (currentImage && drawing) {
        let decoupeSize = 50; 

        let randomX = random(currentImage.width - decoupeSize);
        let randomY = random(currentImage.height - decoupeSize);


        let decoupe = currentImage.get(randomX, randomY, decoupeSize, decoupeSize);

        if (currentDecoupe) {
            if (currentDecoupe === 'star') {
                let maskedDecoupe = createStarMask(decoupe);
                tint(random(255), random(255), random(255));
                image(maskedDecoupe, mouseX, mouseY);
                noTint();
            } else if (currentDecoupe === 'square') {
                tint(random(255), random(255), random(255));
                image(decoupe, mouseX, mouseY);
                noTint();
            }
        }

        
    }
}

function createStarMask(img) {
    let pg = createGraphics(img.width, img.height);
    pg.clear();

    let starSize = img.width * 0.75; 
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

function mousePressed(event) {
    // Check if the click happened inside a button
    if (event.target.closest("button")) {
        return; // Do nothing if a button was clicked
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














