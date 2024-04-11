// console.log("Hola JS");
// console.log(5);
// console.log("5");
// console.log(5 + 5);
// console.log(5 + 5 + "5" + 5);
// console.log("hola" - 5);
/*
fgfdknkjl
hjdghod
njkgd
*/

function setup() {
  console.log("Hola p5 js");
  rectMode(CENTER);
  
  let canvas = createCanvas(400, 400);
  canvas.parent("anim");

  background(100, 0, 0);
}

function draw() {
  // console.log("Nro de frame: " + frameCount);
  // console.log("Hola estoy en el draw");
  // 

  fill(0, 150, 0);
  circle(mouseX, mouseY, 50);
  // console.log("mouse x: " + mouseX + " mouse y: " + mouseY);
  
  fill(mouseY, mouseX, 150);
  square(width/2, height/2, 400 - frameCount);
}