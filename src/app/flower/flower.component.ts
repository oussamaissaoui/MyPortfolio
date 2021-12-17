import { Component, HostListener, OnInit } from '@angular/core';
import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';



import {} from 'three/';

import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';

import {RendererPass} from 'three/examples/jsm/postprocessing/RenderPass.js';

import { MaskPass } from "three/examples/jsm/postprocessing/MaskPass.js";
import { CopyShader } from "three/examples/jsm/shaders/CopyShader.js";
import { ConvolutionShader } from "three/examples/jsm/shaders/ConvolutionShader.js";
import { LuminosityHighPassShader } from "three/examples/jsm/shaders/LuminosityHighPassShader.js";

import { ShaderPass } from      "three/examples/jsm/postprocessing/ShaderPass.js";
import { FXAAShader } from      "three/examples/jsm/shaders/FXAAShader.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { EffectComposer } from  "three/examples/jsm/postprocessing/EffectComposer.js";

@Component({
  selector: 'app-flower',
  templateUrl: './flower.component.html',
  styleUrls: ['./flower.component.css']
})
export class FlowerComponent implements OnInit {

  
  constructor() { }

  //@HostListener('mousemove', ['$event'])
  
  
  
  
  ngOnInit(): void {

    this.main();
  }

  main ()
{
    
    // // 
const canvas: any = document.getElementById('canvas');
const renderer: any = new THREE.WebGLRenderer({canvas,antialias: true,alpha:true});



const second: any = document.getElementById('second');
const renderer2: any = new THREE.WebGLRenderer({canvas:document.getElementById('second'),alpha: true});
renderer2.setClearColor( 0x000000, 0 ); 






//
//
const fov= 75;
const aspect = 2;
const near = 0.1;
const far=1200;
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 200);
const camera2 = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 1.1, 200);


//camera.position.z=25;

//camera.position.y=15;
//camera.position.x=15;

//
//

//const controls = new OrbitControls(camera,renderer.domElement); //!!!XXXxxx!!!!!
//controls.enableDamping = true;
//controls.enablePan = true;
//controls.update();
//
//
const scene = new THREE.Scene();
//scene.background= new THREE.Color("white");


const scene2 = new THREE.Scene();



//scene.fog = new THREE.Fog(new THREE.Color("black"), 0.0025, 2);


//






///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////

let sphereFragShader:any = `
  #define PHONG

  uniform vec3 diffuse;
  uniform vec3 emissive;
  uniform vec3 specular;
  uniform float shininess;
  uniform float opacity;
  uniform float time;
  varying vec2 vUv;
  varying vec3 newPosition;
  varying float noise;
  varying vec3 vNormal;

  #include <common>
  #include <packing>
  #include <color_pars_fragment>
  #include <uv_pars_fragment>
  #include <uv2_pars_fragment>
  #include <map_pars_fragment>
  #include <alphamap_pars_fragment>
  #include <aomap_pars_fragment>
  #include <lightmap_pars_fragment>
  #include <emissivemap_pars_fragment>
  #include <envmap_pars_fragment>
  #include <gradientmap_pars_fragment>
  #include <fog_pars_fragment>
  #include <bsdfs>
  #include <lights_pars_begin>
  #include <envmap_physical_pars_fragment>
  #include <lights_phong_pars_fragment>
  #include <shadowmap_pars_fragment>
  #include <bumpmap_pars_fragment>
  #include <normalmap_pars_fragment>
  #include <specularmap_pars_fragment>
  #include <logdepthbuf_pars_fragment>
  #include <clipping_planes_pars_fragment>

  void main() {
    #include <clipping_planes_fragment>

    vec3 color = vec3(vUv * (0.2 - 2.0 * noise), 1.0);
    vec3 finalColors = vec3(color.b * 1.5, color.r, color.r);
    vec4 diffuseColor = vec4(cos(finalColors * noise * 3.0), 1.0);
    ReflectedLight reflectedLight = ReflectedLight(vec3(0.0), vec3(0.0), vec3(0.0), vec3(0.0));
    vec3 totalEmissiveRadiance = emissive;

    #include <logdepthbuf_fragment>
    #include <map_fragment>
    #include <color_fragment>
    #include <alphamap_fragment>
    #include <alphatest_fragment>
    #include <specularmap_fragment>
    #include <normal_fragment_begin>
    #include <normal_fragment_maps>
    #include <emissivemap_fragment>
    #include <lights_phong_fragment>
    #include <lights_fragment_begin>
    #include <lights_fragment_maps>
    #include <lights_fragment_end>
    #include <aomap_fragment>

    vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;

    #include <envmap_fragment>
    #include <premultiplied_alpha_fragment>
    #include <tonemapping_fragment>
    #include <encodings_fragment>
    #include <fog_fragment>

    gl_FragColor = vec4(outgoingLight, diffuseColor.a);
  }
`;

const sphereVertShader = `
  vec3 mod289(vec3 x)
  {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
  }
  vec4 mod289(vec4 x)
  {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
  }
  vec4 permute(vec4 x)
  {
    return mod289(((x * 34.0) + 1.0) * x);
  }
  vec4 taylorInvSqrt(vec4 r)
  {
    return 1.79284291400159 - 0.85373472095314 * r;
  }
  vec3 fade(vec3 t) {
    return t*t*t*(t*(t*6.0-15.0)+10.0);
  }

  // Classic Perlin noise
  float cnoise(vec3 P)
  {
    vec3 Pi0 = floor(P); // Integer part for indexing
    vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1
    Pi0 = mod289(Pi0);
    Pi1 = mod289(Pi1);
    vec3 Pf0 = fract(P); // Fractional part for interpolation
    vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
    vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
    vec4 iy = vec4(Pi0.yy, Pi1.yy);
    vec4 iz0 = Pi0.zzzz;
    vec4 iz1 = Pi1.zzzz;
    vec4 ixy = permute(permute(ix) + iy);
    vec4 ixy0 = permute(ixy + iz0);
    vec4 ixy1 = permute(ixy + iz1);
    vec4 gx0 = ixy0 * (1.0 / 7.0);
    vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
    gx0 = fract(gx0);
    vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
    vec4 sz0 = step(gz0, vec4(0.0));
    gx0 -= sz0 * (step(0.0, gx0) - 0.5);
    gy0 -= sz0 * (step(0.0, gy0) - 0.5);
    vec4 gx1 = ixy1 * (1.0 / 7.0);
    vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
    gx1 = fract(gx1);
    vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
    vec4 sz1 = step(gz1, vec4(0.0));
    gx1 -= sz1 * (step(0.0, gx1) - 0.5);
    gy1 -= sz1 * (step(0.0, gy1) - 0.5);
    vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
    vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
    vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
    vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
    vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
    vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
    vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
    vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);
    vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
    g000 *= norm0.x;
    g010 *= norm0.y;
    g100 *= norm0.z;
    g110 *= norm0.w;
    vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
    g001 *= norm1.x;
    g011 *= norm1.y;
    g101 *= norm1.z;
    g111 *= norm1.w;
    float n000 = dot(g000, Pf0);
    float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
    float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
    float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
    float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
    float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
    float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
    float n111 = dot(g111, Pf1);
    vec3 fade_xyz = fade(Pf0);
    vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
    vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
    float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
    return 2.2 * n_xyz;
  }

  // Classic Perlin noise, periodic variant
  float pnoise(vec3 P, vec3 rep)
  {
    vec3 Pi0 = mod(floor(P), rep); // Integer part, modulo period
    vec3 Pi1 = mod(Pi0 + vec3(1.0), rep); // Integer part + 1, mod period
    Pi0 = mod289(Pi0);
    Pi1 = mod289(Pi1);
    vec3 Pf0 = fract(P); // Fractional part for interpolation
    vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
    vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
    vec4 iy = vec4(Pi0.yy, Pi1.yy);
    vec4 iz0 = Pi0.zzzz;
    vec4 iz1 = Pi1.zzzz;
    vec4 ixy = permute(permute(ix) + iy);
    vec4 ixy0 = permute(ixy + iz0);
    vec4 ixy1 = permute(ixy + iz1);
    vec4 gx0 = ixy0 * (1.0 / 7.0);
    vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
    gx0 = fract(gx0);
    vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
    vec4 sz0 = step(gz0, vec4(0.0));
    gx0 -= sz0 * (step(0.0, gx0) - 0.5);
    gy0 -= sz0 * (step(0.0, gy0) - 0.5);
    vec4 gx1 = ixy1 * (1.0 / 7.0);
    vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
    gx1 = fract(gx1);
    vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
    vec4 sz1 = step(gz1, vec4(0.0));
    gx1 -= sz1 * (step(0.0, gx1) - 0.5);
    gy1 -= sz1 * (step(0.0, gy1) - 0.5);
    vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
    vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
    vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
    vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
    vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
    vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
    vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
    vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);
    vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
    g000 *= norm0.x;
    g010 *= norm0.y;
    g100 *= norm0.z;
    g110 *= norm0.w;
    vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
    g001 *= norm1.x;
    g011 *= norm1.y;
    g101 *= norm1.z;
    g111 *= norm1.w;
    float n000 = dot(g000, Pf0);
    float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
    float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
    float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
    float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
    float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
    float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
    float n111 = dot(g111, Pf1);
    vec3 fade_xyz = fade(Pf0);
    vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
    vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
    float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
    return 2.2 * n_xyz;
  }

  float turbulence(vec3 p) {
    float w = 100.0;
    float t = -.5;
    for (float f = 1.0 ; f <= 10.0 ; f++) {
      float power = pow(2.0, f);
      t += abs(pnoise(vec3(power * p), vec3(10.0, 10.0, 10.0)) / power);
    }
    return t;
  }

  // START
  uniform float time;
  varying vec2 vUv;
  varying vec3 vNormal;
  varying float noise;

  #define PHONG

  varying vec3 vViewPosition;

  #include <common>
  #include <uv_pars_vertex>
  #include <uv2_pars_vertex>
  #include <displacementmap_pars_vertex>
  #include <envmap_pars_vertex>
  #include <color_pars_vertex>
  #include <fog_pars_vertex>
  #include <morphtarget_pars_vertex>
  #include <skinning_pars_vertex>
  #include <shadowmap_pars_vertex>
  #include <logdepthbuf_pars_vertex>
  #include <clipping_planes_pars_vertex>

  
  void main() {
    #include <uv_vertex>
    #include <uv2_vertex>
    #include <color_vertex>
    #include <beginnormal_vertex>
    #include <morphnormal_vertex>
    #include <skinbase_vertex>
    #include <skinnormal_vertex>
    #include <defaultnormal_vertex>
    #ifndef FLAT_SHADED // Normal computed with derivatives when FLAT_SHADED
      vNormal = normalize(transformedNormal);
    #endif
    #include <begin_vertex>
    #include <displacementmap_vertex>
    #include <morphtarget_vertex>
    #include <skinning_vertex>
    #include <project_vertex>
    #include <logdepthbuf_vertex>
    #include <clipping_planes_vertex>

    vViewPosition = - mvPosition.xyz;

    #include <worldpos_vertex>
    #include <envmap_vertex>
    #include <shadowmap_vertex>
    #include <fog_vertex>

    vUv = uv;

    noise = turbulence(0.01 * position + normal + time * 0.8);
    vec3 displacement = vec3((position.x) * noise, position.y * noise, position.z * noise);
    gl_Position = projectionMatrix * modelViewMatrix * vec4((position + normal) + displacement, 1.0);
  }
`;



///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
let mouseX = 0, mouseY = 0;

		

///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////

let rand: any = Math.random();

let uniforms:any = THREE.UniformsUtils.merge([
  THREE.UniformsLib['ambient'],
  THREE.UniformsLib['lights'],
  THREE.ShaderLib.phong.uniforms,
  { time: { type: 'f', value: 0 } },
]);

const material = new THREE.ShaderMaterial({
  uniforms: uniforms,
  vertexShader: sphereVertShader,
  fragmentShader: sphereFragShader,
  lights: true,
});

const geometry = new THREE.SphereBufferGeometry(32, 128, 128);
const sphere = new THREE.Mesh(geometry, material);
const sphere2 = new THREE.Mesh(geometry, material);
renderer.setSize(window.innerWidth, window.innerHeight);

renderer2.setSize( window.innerWidth, window.innerHeight);
camera.position.z = 32;
camera.position.x = 28;

camera.position.y = 17;


camera2.position.z = 32;
camera2.position.x = 28;

camera2.position.y = 17;

scene.add(sphere);

//sphere.position.z = 10;
sphere.position.x = 60;
sphere.position.y = 26;
sphere.position.z = -26;


//sphere.rotation.z=260;
sphere.modifier = rand;


///+/+/+/+/+/+/+/+/

//scene2.background= new THREE.Color("white");
scene2.add(sphere2);
sphere2.position.x = -19;
sphere2.position.y = 16;
sphere2.position.z = -40;

//sphere2.rotation.z=260;




        ///////////////////////////////////////////////////////

       

        const ambientLight2 = new THREE.AmbientLight(0xffffff, 0.72);

        scene.add(ambientLight2);
        

        const lighte = new THREE.PointLight( 0xffffff, 0.5, 100 );
lighte.position.set( 50, 5, 50 );
scene.add( lighte );
      

    


        const light = new THREE.DirectionalLight(0xffffff, 0.63);
        light.position.z = 500;
        light.position.x = -1200;
        light.position.y = -300;
        //scene.add(light);
        //scene.add(light);



        






///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////

 
const clock = new THREE.Clock();

//const delta = clock.getDelta();
//mixer.update(delta);


           
                
    






  

                const start = Date.now();
            
                function onDocumentMouseMove( event ) {

                  mouseX =  event.clientX ;
                  
                  mouseY = event.clientY ;
                  
                  //console.log(mouseX)
       
       
                }


              //  const canvas = renderer.domElement;
const width = window.innerWidth;
const height = window.innerHeight;

  const animate= ()=>
  { requestAnimationFrame(animate);
    const delta = clock.getDelta();
    //if (mixer) mixer.update(clock.getDelta());
   
  uniforms.time.value = 0.00007 * (Date.now() - start);
  //sphere.rotation.x += 0.0011;


    //controls.update();


    

    document.addEventListener( 'mousemove', onDocumentMouseMove );
    

sphere.rotation.y=(sphere.position.y+mouseX*0.000225)*(-1);
sphere.rotation.z=sphere.position.z+mouseY*0.000225;

sphere2.rotation.y=(sphere.position.y+mouseX*0.000225)*(1);
sphere2.rotation.z=sphere.position.z+mouseY*0.000225*(-1);

    
   // console.log(targetX)

 


//////////////////////////////////////////////////////////////////////////////////////////////////////////



/*
function resizeRenderer(renderer) {
 
  
  if () {
    
  }
  return needResize;
}
let renderRequested = false;

*/

const needResize = window.innerWidth !== width || window.innerHeight !== height;

 // renderRequested = null;
 //(window.innerHeight+1200)

  if (needResize) {
    const canvas = renderer.domElement;
    camera.aspect = (window.innerWidth*0.9) / (window.innerHeight);
    camera2.aspect = ((window.innerWidth) / (window.innerHeight));
   camera.updateProjectionMatrix();
   //camera2.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer2.setSize( window.innerWidth, window.innerHeight );

  }

  
 
  renderer2.setSize( window.innerWidth, window.innerHeight );






////////////////////////////////////////////////////////////////////////////////////////////////////////////////











  
  //renderer.setSize( window.innerWidth, window.innerHeight );

renderer2.render( scene2, camera2 );
  renderer.render( scene, camera );
   
  //camera2.rotation.z+=2260;
  //lightSphere2.rotation.z+=2260;
  };

  
  animate();
  
  
}

}
