
let video;
let poseNet;
let poses = [];
let canvas = null;

const grillaCapturas = document.querySelector(".grid");
const cuerpo = ["leftWrist", "rightWrist", "nose", "leftEye", "rightEye", "leftElbow", "rightElbow"];

let parteCuerpo = null;
let posicionParteCuerpo = {x: -100, y: -100}
let objetivo = null;

function setup() {
  canvas = createCanvas(640, 480, document.querySelector("canvas"));
  video = createCapture(VIDEO, { flipped:true });
  video.size(width, height);
  rectMode(CENTER);
  objetivo = nuevoObjetivo();
  parteCuerpo = elegirElemento(cuerpo);

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, "single", function cargoModelo() {
    console.log("Ya cargo ML5 posenet");
  });
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', function(results) {
    console.log(parteCuerpo);
    poses = results[0];

    if (poses.pose[parteCuerpo].confidence > 0.8 ) {
      posicionParteCuerpo.x = width - poses.pose[parteCuerpo].x;
      posicionParteCuerpo.y = poses.pose[parteCuerpo].y;
    };
  });
  
  video.hide();
}

function elegirElemento(lista) {
  return lista[Math.floor(Math.random()*lista.length)];
}

function nuevoObjetivo() {
  return {
    x: random(50, width - 50),
    y: random(50, height - 50)
  }
}

function draw() {
  image(video, 0, 0, width, height);

  if (dist(objetivo.x, objetivo.y, posicionParteCuerpo.x, posicionParteCuerpo.y) < 20) { 
    objetivo = nuevoObjetivo();
    parteCuerpo = elegirElemento(cuerpo);
    const captura = canvas.elt.toDataURL();
    console.log(captura);
    crearImagen(grillaCapturas, captura);
  }

  stroke(0, 255, 0);
  fill(0, 255, 0);
  circle(objetivo.x, objetivo.y, 10);
  rect(posicionParteCuerpo.x, posicionParteCuerpo.y, 40, 40);
}

function crearImagen(grilla, src) {
  const div = document.createElement("div");
  div.className = "obra";
  const img = document.createElement("img");
  img.src = src;
  div.append(img);
  grilla.append(div);
}