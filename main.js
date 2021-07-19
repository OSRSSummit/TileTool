var amtTilesX = 20;
var amtTilesY = 20;
var tileSize = 25;
var tiles;

var colorpicker;
var currentColor;

function setup() {
    tiles = [];

    canvas = createCanvas(amtTilesX * tileSize, amtTilesY * tileSize);
    canvas.parent("canvas");
    frameRate(5/3);    
    background('#CEB775');
    noFill();
    stroke(0);
    strokeWeight(1);
    noLoop();

    // controls
    cpDiv = createDiv();
    colorpicker = createColorPicker(color('black'));
    colorpicker.parent(cpDiv);
    colorpicker.size(25, 25);
    var maxwidthDiv = createDiv();
    createSpan("width: ").parent(maxwidthDiv);
    maxwidthInput = createInput(amtTilesX).parent(maxwidthDiv);    
    var maxheightDiv = createDiv();
    createSpan("height: ").parent(maxheightDiv);
    maxheightInput = createInput(amtTilesY).parent(maxheightDiv);
    var tilesizeDiv = createDiv();
    createSpan("tilesize: ").parent(tilesizeDiv);
    tilesizeInput = createInput(tileSize).parent(tilesizeDiv);

    // background tiles
    for (let y = 0; y < amtTilesY; y++) {
        for (let x = 0; x < amtTilesX; x++) {
            drawTile(x, y);
        }        
    }
}

function mouseClicked() {
    currentColor = colorpicker.color();

    var x = Math.floor(mouseX / tileSize);
    var y = Math.floor(mouseY / tileSize);
    if(x < amtTilesX*tileSize && y < amtTilesY*tileSize)
        drawTile(x, y, currentColor);    
}

function drawTile(x, y, color) {
    if (color != null)
        fill(color);
    else
        fill('#CEB775');
    if (tiles == null)
        tiles = [];
    if (tiles[x] == null)
        tiles[x] = [];
    tiles[x][y] = color;
    rect(x*tileSize, y*tileSize, tileSize, tileSize);
    noFill();
}

function keyTyped() {
    if (key === '1' || key === '&') {
        // create new picker with hovered color
        var x = Math.floor(mouseX / tileSize);
        var y = Math.floor(mouseY / tileSize);
        colorpicker.remove();
        if (tiles[x] != null && tiles[x][y] != null)
            colorpicker = createColorPicker(tiles[x][y]);
        else
            colorpicker = createColorPicker(color('#CEB775'))
        colorpicker.parent(cpDiv);
        colorpicker.size(25, 25);
    } else if (key === 'Enter') {
        // reload with new settings
        amtTilesX = maxwidthInput.value();
        amtTilesY = maxheightInput.value();
        tileSize = tilesizeInput.value();
        removeElements();
        canvas.remove();
        setup();
    }
}