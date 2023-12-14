let video;
let snapshots = [];
let count = 0;
let value = 0;
let videoX;
let videoY;
let cameraSound;
let imgTree;
let myPicker;


function setup() {
  var canvas = createCanvas(230, 690);
  canvas.id("sketch-container");

  video = createCapture(VIDEO, initButton);
  video.size(200, 145);
  videoY = 15;
  videoX = 15;
  video.hide();
  
  myPicker = createColorPicker('rgb(140, 51, 51)');
  myPicker.position(50, 100);
  myPicker.id("picker-container");

  imgTree = loadImage('assets/tree.png');
  cameraSound = loadSound('assets/capture.mp3');

  textAlign(CENTER);
  textSize(50);
}

function initButton() {
  buttonSnap = createButton("Ready!");
  buttonSnap.mousePressed(takePhoto);
  buttonSnap.id("btnSnap")

  buttonSave = createButton("Save");
  buttonSave.mousePressed(savePhoto);
  buttonSave.id("btnSave")

  buttonReset = createButton("Reset");
  buttonReset.mousePressed(resetPhoto);
  buttonReset.id("btnReset")

}

function draw() {
  let bgColor = myPicker.value();
  background(bgColor);
  if (count >= 4) {
    video.hide();
  } else {
    image(video, videoX, videoY, 200, 145);
  }

  let rgbArray = hexToRgb(bgColor);
  if ((rgbArray[0] <= 100) && (rgbArray[1] <= 100) && (rgbArray[2] <= 100)) {
      fill('white');
  } else {
      fill('black');
  }

  textSize(20);
  text('Merry', 130, 648);
  text('Christmas', 175, 674);
  for (let i = 0; i < snapshots.length; i++) {
    image(snapshots[i], 15, i * 155 + 15, 200, 145);
  }

  image(imgTree, 15, 596);
}


//Credit: source for hexToRgb function: https://editor.p5js.org/TAPIWO/sketches/LqIec_-nv
function hexToRgb(hex) {
    // Remove the '#' symbol if present
    hex = hex.replace('#', '');
  
    // Extract the red (R), green (G), and blue (B) components
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
  
    // Return an array with the RGB values
    return [r, g, b];
}


function takePhoto() {
  count++;
  if (count <= 4) {
    cameraSound.play();
    let snap = video.get();
    snapshots.push(snap);
    video.position(videoX, videoY);
    videoY = count * 155 + 15;
  } else {
    alert("4 photos only! You can reset if you want to retake");
  }
}

function resetPhoto() {
  snapshots = [];
  count = 0;
  value = 0;
  videoY = 15;
  videoX = 15;
  clear();
  video.hide();
}

function savePhoto() {
  saveCanvas("myPhoto.jpg");
}


