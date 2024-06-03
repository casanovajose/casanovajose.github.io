
let video;
let poseNet;
let poses = [];
let canvas = null;

const margen = 100;
const grillaCapturas = document.querySelector(".grid");
const cuerpo = [
  { parte: "leftWrist", imagen: null},
  { parte: "rightWrist", imagen: null},
  { parte: "nose", imagen: null},
  { parte: "leftEye", imagen: null},
  { parte: "rightEye", imagen: null},
  { parte: "leftEar", imagen: null},
  { parte: "rightEar", imagen: null},
  { parte: "leftElbow", imagen: null},
  { parte: "rightElbow", imagen: null},
  // { parte: "leftHip", imagen: null},
  // { parte: "rightHip", imagen: null},
  // { parte: "leftKnee", imagen: null},
  // { parte: "rightKnee", imagen: null},
  // { parte: "leftAnkle", imagen: null},
  // { parte: "rightAnkle", imagen: null}
];
let imgsCuerpo = [];

let parteCuerpo = null;
let posicionParteCuerpo = {x: -100, y: -100}
let objetivo = null;

function preload() {  
    cuerpo.forEach(function cargarImagen(parte) {
      parte.imagen = loadImage("img/" + parte.parte + ".png");
    });
}

function setup() {
  video = createCapture(VIDEO, { flipped:true });
  // console.log("Video", video);
  canvas = createCanvas(640, 480, document.querySelector("canvas"));
  // console.log("canvas", canvas);
  video.size(width, height);
  
  rectMode(CENTER);
  imageMode(CENTER);
  objetivo = nuevoObjetivo();
  parteCuerpo = elegirElemento(cuerpo);

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, "single", function cargoModelo() {
    console.log("Ya cargo ML5 posenet");
  });
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', function(results) {
    // console.log(results);
    poses = results[0];

    if (poses.pose[parteCuerpo.parte].confidence > 0.8 ) {
      posicionParteCuerpo.x = width - poses.pose[parteCuerpo.parte].x;
      posicionParteCuerpo.y = poses.pose[parteCuerpo.parte].y;
    };
  });
  
  video.hide();
}

function elegirElemento(lista) {
  return lista[Math.floor(Math.random()*lista.length)];
}

function nuevoObjetivo() {
  return {
    x: random(margen, width - margen),
    y: random(margen, height - margen)
  }
}

function draw() {
  image(video, width/2, height/2, width, height);

  if (dist(objetivo.x, objetivo.y, posicionParteCuerpo.x, posicionParteCuerpo.y) < 80) { 
    objetivo = nuevoObjetivo();
    parteCuerpo = elegirElemento(cuerpo);
    const captura = canvas.elt.toDataURL();
    // console.log(captura);
    crearImagen(grillaCapturas, captura);
  }

  stroke(0, 255, 0);
  fill(0, 255, 0);
  circle(objetivo.x, objetivo.y, 10);
  noFill();
  image(parteCuerpo.imagen, posicionParteCuerpo.x, posicionParteCuerpo.y, 100, 100);
  // circle(posicionParteCuerpo.x, posicionParteCuerpo.y, 40);
}

function crearImagen(grilla, src) {
  const div = document.createElement("div");
  div.className = "obra";
  const img = document.createElement("img");
  img.src = src;
  div.append(img);
  grilla.append(div);
}