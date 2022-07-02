import algorithmImg from './assets/algorithmImg4.png'
import customFont from './assets/font2.ttf'
// import algorithmImg from './assets/test.png'

import p5 from 'p5'
import './style.css'

const app: HTMLDivElement = document.querySelector<HTMLDivElement>('#app')!;

let density = "@%#*+=-:. ";

let image: p5.Image;

let variation: p5.Vector;

let font: p5.Font;

function init(){
  new p5(sketch)
}

function sketch(p:p5){
  
  function setup():void{
    p.createCanvas(window.innerWidth, window.innerHeight).parent(app);
    image = p.loadImage(algorithmImg);
    font = p.loadFont(customFont)
    variation = new p5.Vector(0.1,0.3,0.6)
    p.angleMode(p.DEGREES)
  }

  function draw():void{
    p.background(0);
    // p.image(image, 0, 0, p.width, p.height);

    let w = p.width / image.width;
    let h = p.height / image.height;

    image.loadPixels();

    for (let i = 0; i < image.width; i++) {
      for (let j = 0; j < image.height; j++) {
        const pixelIndex = (i+j*image.width)*4;
        const r = image.pixels[pixelIndex + 0],
              g = image.pixels[pixelIndex + 1],
              b = image.pixels[pixelIndex + 2];

        const avg = ( r + g + b ) / 3;


        const charIndex = p.floor(p.map(Math.abs(avg*p.sin(variation.x)), 0, 255, density.length, 0))

        p.noStroke();
        p.fill(0,avg,0);
        // p.square(i*w, j*h, w);
        p.textFont(font);
        p.textSize(w<h?w-5:h-5);
        p.textAlign(p.CENTER, p.CENTER);
        p.text(
          density.charAt(charIndex), 
          i * w,
          j * h
          );
      }
    }

    variation.x+=p.deltaTime*0.01
    
    if(variation.x>360){
      variation.x=0
    }
  }

  
  function preload():void{}

  p.draw = draw
  p.setup = setup
  p.preload = preload
}


window.onload = init