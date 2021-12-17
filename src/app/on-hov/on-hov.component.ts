import { Component, HostListener, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import * as THREE from 'three';

@Component({
  selector: 'app-on-hov',
  templateUrl: './on-hov.component.html',
  styleUrls: ['./on-hov.component.css']
})
export class OnHovComponent implements OnInit {

  constructor() { }
 
  ngOnInit(): void {
    
    //fromEvent(this._div.nativeElement,'scroll').subscribe((e: Event) => console.log({scrollPosition: e.target['scrollTop']}));
    
    



    let images = 
 { imageOne : '../../assets/dari.jpg',
 imageTwo : '../../assets/dashboard.png',
 imageThree : '../../assets/starry.jpg',
 //imageFour : '../../assets/starry.jpg',
  }

    ///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
const vertex = `uniform sampler2D uTexture;
uniform vec2 uOffset;
varying vec2 vUv;

float M_PI = 3.141529;

vec3 deformationCurve(vec3 position, vec2 uv, vec2 offset){
    position.x = position.x + (sin(uv.y * M_PI) * offset.x);
    position.y = position.y + (sin(uv.x * M_PI) * offset.y);
    return position;
}

void main(){
    vUv = uv;
    vec3 newPosition = deformationCurve(position, uv, uOffset);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}`;

const fragment = `uniform sampler2D uTexture;
uniform float uAlpha;
uniform vec2 uOffset;
varying vec2 vUv;

vec3 rgbShift(sampler2D textureimage, vec2 uv, vec2 offset ){
    float r = texture2D(textureimage, uv + offset).r;
    vec2 gb = texture2D(textureimage, uv).gb;
    return vec3(r, gb);
}

void main(){
    // vec3 color = texture2D(uTexture, vUv).rgb;
    vec3 color = rgbShift(uTexture, vUv, uOffset);
    gl_FragColor = vec4(color, uAlpha);
}`;

		

///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
let linkHovered=false;

function lerp(start, end, t){
  return start * ( 1 - t ) + end * t;
}


let targetX = 0;
let targetY = 0;

const textureOne = new THREE.TextureLoader().load(images.imageOne);
const textureTwo = new THREE.TextureLoader().load(images.imageTwo);
const textureThree = new THREE.TextureLoader().load(images.imageThree);
//const textureFour = new THREE.TextureLoader().load(images.imageFour);
console.log(images.imageOne)


//let links  = [document.querySelectorAll('li')]
let links =  Array.from(document.querySelectorAll('li'));

let scene = new THREE.Scene();
//scene.background= new THREE.Color("black");
let perspective = 1000;
let sizes = new THREE.Vector2(0,0);
let offset = new THREE.Vector2(0,0)

let uniforms = {
  uTexture: {value: new THREE.TextureLoader().load(images.imageThree)},
  uAlpha: {value: 0.0},
  uOffset: {value: new THREE.Vector2(0.0, 0.0)}
}



  links.forEach((link, idx) => {
  link.addEventListener('mouseenter', () => {
      
      switch(idx){
          case 0:
              
              uniforms.uTexture.value = textureOne;
              break;
          case 1:
              uniforms.uTexture.value = textureTwo;
              break;
          case 2:
              uniforms.uTexture.value = textureThree;
              break;
          //case 3:
            //  uniforms.uTexture.value = textureFour;
              //break;
      }
  })

  link.addEventListener('mouseleave', () => {
      uniforms.uAlpha.value = lerp(uniforms.uAlpha.value, 0.0, 0.1);
  });
  
  });


                                  addEventListeners(document.querySelector('ul'));
                                  //.setUpCamera();
                                  //.onMouseMove();
                                  //.createMesh();
                                  //.render()







function addEventListeners(element){
  element.addEventListener('mouseenter', () => {
      linkHovered = true;
      console.log(linkHovered)
  })
  element.addEventListener('mouseleave', () => {
      linkHovered = false;
      console.log(linkHovered) 
  })
}




let width = window.innerWidth;
let height = window.innerHeight;
let aspectRatio = width / height;


let fov = (180 * (2 * Math.atan(height / 4 / perspective))) / Math.PI;
let camera = new THREE.PerspectiveCamera(fov, aspectRatio, 0.1, 1000);
camera.position.set(0, 0 , perspective);



//let canvas0: any = document.querySelector('canvas');

//let cc:any=document.getElement ('canvas1')
//console.log(cc)

let canvass:any=Array.from(document.querySelectorAll('canvas'));

//onsole.log(canvass)
//console.log(canvas)


var canvas:any=canvass[2];
//console.log(canvas)

     let renderer = new THREE.WebGLRenderer({canvas, antialias: true, alpha: true,powerPreference: "high-performance" }  );
     //renderer.compile(scene,camera);



  let geometry = new THREE.PlaneGeometry(2,0.75,10,10);
  let material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: vertex,
      fragmentShader: fragment,
      transparent: true,
      //wireframe: true,
      // side: THREE.DoubleSide
  })
  let mesh = new THREE.Mesh(geometry, material);
  sizes.set(250, 350, 1);
  mesh.scale.set(sizes.x, sizes.y, 1);

  mesh.position.set(offset.x, offset.y, 0);
  
  scene.add(mesh);




function resizeRenderer(renderer) {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
}
let renderRequested = false;


function render() {
  renderRequested = null;

  if (resizeRenderer(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }

  //controls.update();
  

  
}
render();


document.getElementById('onhov').addEventListener( 'mousemove', onMouseMove );

  
  

function onMouseMove(e){
  
      targetX = e.clientX;
      targetY = e.clientY;
 
}


const animate= ()=>
{ 
  
  
  
    
    requestAnimationFrame( animate );


  offset.x = lerp(offset.x, targetX, 0.05);

  offset.y = lerp(offset.y, targetY, 0.05);
        uniforms.uOffset.value.set((targetX- offset.x) * 0.0005 , -(targetY- offset.y) * 0.0005 )
        // .mesh.scale.set(.sizes.x, .sizes.y)
        mesh.position.set(offset.x - (window.innerWidth / 2)  , -offset.y + (window.innerHeight / 2), 0);

if (linkHovered){
  uniforms.uAlpha.value = lerp(uniforms.uAlpha.value, 1.0, 0.1)
} else {
  uniforms.uAlpha.value = lerp(uniforms.uAlpha.value, 0.0, 0.1);
}


for(let i = 0; i< links.length; i++){
  if(linkHovered){
      links[i].style.opacity = '0.15'
     // links[i].style.color = 'red'
      links[i].style.fontSize = '105px'
  }else{
      links[i].style.opacity = '1'
     //links[i].style.color = 'black'
      links[i].style.fontSize = '85px'
  }

  //renderer.compile( scene, camera );
renderer.render( scene, camera );

//camera2.rotation.z+=2260;
//lightSphere2.rotation.z+=2260;
};
}


animate();


  }

}
