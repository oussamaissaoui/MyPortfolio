import { Component, HostListener, OnInit, Renderer2 } from '@angular/core';

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import {CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer';
import {TrackballControls} from 'three/examples/jsm/controls/TrackballControls'


import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';





@Component({
  selector: 'app-third-one',
  templateUrl: './third-one.component.html',
  styleUrls: ['./third-one.component.css']
})

export class ThirdOneComponent implements OnInit {
  
  constructor(private rendererang:Renderer2) { }

 // @HostListener('window:scroll', ['$event'])

  ngOnInit(): void {

    this.main();

   

/*
    function track(event) {
      console.log("Scroll Event", window.pageYOffset );
    }
    track(event);*/

    //this.main();
  }


  main ()
  {
      
    let POSPOS:number;
    let ticking=false;
    window.addEventListener('scroll', function(e) {
      
      let POS = window.pageYOffset;
      POSPOS=POS;
      let limit=false;
      if (POS>1500 )
      {limit=true;
        
        
       
    
    
    
    //alert(1)
    
    };
    
      if (!ticking) {
        window.requestAnimationFrame(function() {
         
          ticking = false;
        });
      }
    
      ticking = true;
      //console.log(POSPOS)
      //console.log(typeof(POSPOS))

      

      
    }
    
    
    );

    

    let vv= document.querySelector('#css');
    
  const canvas: any = document.querySelector('canvas');
 // const renderer: any = new THREE.WebGLRenderer({canvas});
  //renderer.shadowMap.enabled = true;
  //renderer.shadowMap.type = THREE.PCFSoftShadowMap;




  const renderer2 = new CSS3DRenderer();
  
  renderer2.domElement.style.position = 'absolute';
  renderer2.domElement.style.top = 0;
  document.querySelector('#css').appendChild( renderer2.domElement );
  

  //renderer2.setSize( window.innerWidth/2.2, window.innerHeight );




  //const canvas: any = document.querySelector('#css').appendChild(renderer.domElement);

  // renderer.setPixelRatio( window.devicePixelRatio );

  //renderer.setSize(window.innerWidth, window.innerHeight);
  //renderer.setSize( window.innerWidth, window.innerHeight );
  

  
  //
  //
  const fov= 75;
  const aspect = 2;
  const near = 0.1;
  const far=1200;
  const camera = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.z=5500;
  //camera.position.x = Math.PI;
  
  //camera.position.y=15;
  //camera.position.x=15;
  
  //
  //
  
  const controls = new OrbitControls(camera,renderer2.domElement); //!!!XXXxxx!!!!!
  controls.enableDamping = true;
//controls.maxZoom=3800;

controls.enableZoom = false;
  controls.enablePan = true;
  controls.update();
  //
  //
  const scene = new THREE.Scene();
  const scene2 = new THREE.Scene();
  //scene2.background= new THREE.Color('black');


  
  //
  const vector = new THREE.Vector3();
  
  
  


  


    const targets = { table: [], sphere: [], helix: [], grid: [] };   
    const objects = [];
    const imagesList=[
      'https://cdn-icons-png.flaticon.com/512/59/59137.png',
      'https://cdn.worldvectorlogo.com/logos/hibernate-1.svg',
   
      'https://www.joykal.com/wp-content/uploads/2019/09/jquery.png',
      'https://www.iguanesolutions.com/wp-content/uploads/2021/04/Terraform_PrimaryLogo_FullColor_RGB.png',
      
      'http://www.pinevalleyinstitute.co.za/wp-content/uploads/2017/12/Developing-ASP.NET-MVC-Web-4-Applications.png',
      

      
  'http://assets.stickpng.com/images/58480979cef1014c0b5e4901.png',
  'https://www.idealconception.com/images/jee-282x300.png',
      'https://img.icons8.com/color/480/nodejs.png',
  
 
  'https://atomrace.com/blog/wp-content/uploads/2018/05/spring-boot-logo.png',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Symfony2.svg/1280px-Symfony2.svg.png',
  

  'https://cdn.pixabay.com/photo/2017/08/05/11/16/logo-2582748_640.png',

  'https://img.icons8.com/color/480/nodejs.png',
  
  'https://icons-for-free.com/iconfiles/png/512/design+development+facebook+framework+mobile+react+icon-1320165723839064798.png',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/1200px-Angular_full_color_logo.svg.png',
  

  'https://cdn.pixabay.com/photo/2017/08/05/11/16/logo-2582747_960_720.png',
  'https://logos-marques.com/wp-content/uploads/2021/03/JavaScript-Logo.png',

  'https://mareconversionpro.fr/wp-content/uploads/2017/04/bootstrap.png',
  'https://seeklogo.com/images/C/c-sharp-c-logo-02F17714BA-seeklogo.com.png',
 
  
  'https://icons-for-free.com/iconfiles/png/512/development+logo+mongodb+programming+icon-1320184807578986595.png',
  'https://upload.wikimedia.org/wikipedia/fr/thumb/6/62/MySQL.svg/1200px-MySQL.svg.png',
  'https://raw.githubusercontent.com/geraldobl58/geraldobl58/master/images/typescript.png',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/1200px-Python-logo-notext.svg.png',
  

  'https://marmelab.com/images/blog/graphql/logo.png',

  
  'https://f2i-formation.fr/wp-content/uploads/2020/08/formation-agile-scrum.png',
  'https://www.apollo-formation.com/wp-content/uploads/Unified_Modeling_Language-250x250.png',
  'https://iconape.com/wp-content/png_logo_vector/c-programming-language-logo.png',
  'https://www.advens.fr/sites/default/files/public/kisspng-devops-software-developer-agile-software-developme-icon-devops-logo-5b56503405fa76.4340629915323832840245.png',
 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/1200px-Amazon_Web_Services_Logo.svg.png',
 'https://www.pngkit.com/png/full/223-2232054_maven-logo-ethereum-logo-transparent-background.png',
 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Logo_Blender.svg/2560px-Logo_Blender.svg.png',
 'https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg', 
 'https://dyltqmyl993wv.cloudfront.net/assets/stacks/sonarqube/img/sonarqube-stack-220x234.png',
 'https://cdn.worldvectorlogo.com/logos/docker.svg',
 'https://projects.task.gda.pl/uploads/-/system/project/avatar/321/grafana_logo.png',
'https://cdn.freelogovectors.net/wp-content/uploads/2019/11/kibana-logo.png',
'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/PHP-logo.svg/2560px-PHP-logo.svg.png',
'https://cdn.jsdelivr.net/gh/angular-material-extensions/pages@master/assets/angular-material-extensions-logo.png',


'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/.NET_Core_Logo.svg/2048px-.NET_Core_Logo.svg.png',
'https://ingenuitysoftwarelabs.com/wp-content/uploads/2020/01/three-js-logo.png',


'https://logos-download.com/wp-content/uploads/2018/09/Kubernetes_Logo.png',
'https://cdn.freebiesupply.com/logos/large/2x/spring-3-logo-png-transparent.png',
'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Jenkins_logo.svg/1200px-Jenkins_logo.svg.png',
'https://cdn.freelogovectors.net/wp-content/uploads/2020/12/postman-logo.png',
'https://upload.wikimedia.org/wikipedia/commons/4/49/Redux.png'


  
  ];


  for ( let i = 0; i < 44; i ++ ) {


    const element = this.rendererang.createElement('div');

    const img = this.rendererang.createElement('img');
    img.src = imagesList[i]
    ;
    
    img.style="width:80px;height:80px;margin:auto;margin-top:30%"
    this.rendererang.addClass(element,'element');
    this.rendererang.setStyle(element,'background', 'red')

    //var element = document.createElement( 'div' );
    element.style.width = '120px';
    element.style.height = '160px';

    element.style.background = 'rgba(0,127,127,' + (Math.random() * 0.5 + 0.55) + ')';
   // element.textContent = "I am editable text!"
    element.setAttribute('contenteditable', '')



    element.setAttribute('onpointerover', 'element.textContent = "asba"');
    element.onpointerover=function(){element.style.width = '160px';element.style.height = '200px'; img.style="width:90%;height:90%;margin:auto;margin-top:5%"};
    element.onpointerout=function(){element.style.width = '120px'; element.style.height = '160px';img.style="width:80px;height:80px;margin:auto;margin-top:30%"};
    element.appendChild(img);
//'console.log("hiiiii"+ Math.random())'
    


    
                                                          var objectCSS = new CSS3DObject( element );
                                                         
                                                         
                                                         
                                                          objectCSS.position.x = Math.random() * 2500 - 1000;
                                                          //objectCSS.scale.y = Math.random() + 0.5;
                                                          objectCSS.position.y = Math.random() * 2000 - 1000;
                                                          objectCSS.position.z = Math.random() * 2500 - 1000;


                                                          objects.push( objectCSS );


                                                         // objectCSS.scale.x = Math.random() + 0.5;
                                                          
                                                          //objectCSS.position.x = ( ( i % 5 ) * 400 ) - 800;
                                                          //objectCSS.position.y = ( - ( Math.floor( i / 5 ) % 5 ) * 400 ) + 800;
                                                          //objectCSS.position.z = ( Math.floor( i / 25 ) ) * 1000 - 2000;



                                                          const object = new THREE.Object3D();
                                                          const phi = Math.acos( - 1 + ( 3 * i ) / 65 );
                                                          const theta = Math.sqrt( 65 * Math.PI ) * phi;

                                                          object.position.y = ( - ( Math.floor( i / 5 ) % 5 ) * 400 ) + 800;
                                                          object.position.x = ( ( i % 5 ) * 400 ) - 800;
                                                          object.position.z = ( Math.floor( i / 25 ) ) * 1000 - 2000;
                                                          
                                                
                                                          //objectCSS.position.setFromSphericalCoords( 600, phi, theta );
                                                          
                                                          
                                                          targets.grid.push( object );  
                                                          
                                                          



                                                                                          const thetaHel = i * 0.255 + Math.PI;
                                                                                            const y = - ( i * 11 ) + 300;

                                                                                           const objectHel = new THREE.Object3D();
                                                                                           
                                                                                            objectHel.position.setFromCylindricalCoords( 500, thetaHel, y );
                                                                                            vector.copy( objectHel.position ).multiplyScalar( 2 );

                                                                                           
                                                                                        

                                                                                            targets.helix.push( objectHel );
                                                          
                                                        
                                                          
                                                          
                                                          scene2.add( objectCSS );



    // make an invisible plane for the DOM element to chop
    // clip a WebGL geometry with it.
   
/*

        var material = new THREE.MeshPhongMaterial({
            opacity	: 0.2,
            color	: new THREE.Color('white'),
            blending: THREE.NoBlending,
            side	: THREE.DoubleSide,
        });
        var geometry = new THREE.PlaneGeometry( 100, 100 );
        var mesh = new THREE.Mesh( geometry, material );
        mesh.position.copy( domObject.position );
        mesh.rotation.copy( domObject.rotation );
        //mesh.scale.copy( domObject.scale );
        mesh.castShadow = false;
        mesh.receiveShadow = true;
        scene.add( mesh );
   */
   

}












  
  
  
  
  const Alight = new THREE.AmbientLight( "white",0.9 ); // soft white light
  
          
  scene.add( Alight );
  
  






                                              
  
 

                                                        
    
    
                                                            

                                                           // console.log(vv)
  
   
  const clock = new THREE.Clock();
  
  //const delta = clock.getDelta();
  //mixer.update(delta);
  
  
             
      
      
                  function render() {
                   
                    
                    //renderer.render(scene, camera);
                    
                  }
                //  render();
      
  ////////////////////////////////////////////////////
  ///////////////////////////////////////////////////
  //////////////////////////////////////////////////////

  function transform( targets, duration ) {

    TWEEN.removeAll();
let camx=[10,240,10,-240]
let camz=[50,2230,3000]
let camy=[- 600.055,800.1]
    for ( let i = 0; i < 44; i ++ ) {

      const object = objects[ i ];
					const target = targets[ i ];

      new TWEEN.Tween( object.position )
        .to( { x: target.position.x, y: target.position.y, z: target.position.z }, Math.random() * duration + duration )
        .easing( TWEEN.Easing.Exponential.InOut )
        .start();

      new TWEEN.Tween( object.rotation )
        .to( { x: target.rotation.x, y: target.rotation.y, z: target.rotation.z }, Math.random() * duration + duration )
        .easing( TWEEN.Easing.Exponential.InOut )
        .start();


        

    }

    new TWEEN.Tween( camera.position )
        .to( { x: camx, y: camy, z: camz },  duration + duration *6 )
        .easing( TWEEN.Easing.Exponential.InOut )
        .start();

    new TWEEN.Tween( this )
      .to( {}, duration * 2 )
      .onUpdate( render )
      .start();

  }

















  ///////////////////////////////////////////////////////////
  ///////////////////RAYCASTER/////////////////////////
  ////////////////////////////////////////////////////////////
  /*
  var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

function onMouseMove( event ) { 
  // calculate mouse position in normalized device coordinates 
  // (-1 to +1) for both components 
  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1; 
  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1; 

  //console.log(mouse.x)
  
} 
  
  
  */
    
    ///////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////




 




 
 let done=0;
 window.addEventListener('scroll', (event) => {
   // handle the scroll event 

  // console.log(scrollY)
   
   
   if (scrollY>1250 && done==0){
    transform( targets.helix, 3500 );
     done=1;
    // setTimeout(function(){  }, 3000);
   }

/*
   if (scrollY>1400 && scrollY<1800){
    //document.body.setAttribute('color-violet','color-violet')
    // setTimeout(function(){  }, 3000);
    document.body.style.backgroundColor = "black";
   }*/
});
 


 
 

  //transform( targets.helix, 500 );


  const width = window.innerWidth;
  const height = window.innerHeight;
    
  
    const animate= ()=>
    { requestAnimationFrame(animate);
      const delta = clock.getDelta();

      
      //if (mixer) mixer.update(clock.getDelta());

    
      

        // update the picking ray with the camera and mouse position
       
     

        /*
        window.addEventListener( 'mousemove', onMouseMove,false );

        



        raycaster.setFromCamera( mouse, camera );

        //console.log(mouse)
      
        // calculate objects intersecting the picking ray
        const intersects:any = raycaster.intersectObjects( scene2.children );
     

       
        if ( intersects.length > 0 ) {
          console.log(intersects.distance)
        }

          */


      
       
    
       //   xa.addEventListener("mouseenter", function( event ){

          //  event.target.style.backgroundColor = "red";
            
        //  },false);
        

      

        /*
    
        
*/

/*
function resizeRenderer(renderer2) {
  const canvas = renderer2.domElement;
  const width = window.innerWidth/2.2;
  const height = window.innerHeight;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer2.setSize(width, height);
  }
  return needResize;
}
let renderRequested = false;

renderRequested = null;
  
if (resizeRenderer(renderer2)) {
  const canvas = renderer2.domElement;
  camera.aspect =  (window.innerHeight / window.innerHeight);
 camera.updateProjectionMatrix();
}

controls.update();*/


const needResize = window.innerWidth !== width || window.innerHeight !== height;

 // renderRequested = null;
 //(window.innerHeight+1200)

  if (needResize) {
    const canvas = renderer2.domElement;
    camera.aspect = (window.innerWidth/2.2) / (window.innerHeight);
    //camera2.aspect = ((window.innerWidth) / (window.innerHeight));
   camera.updateProjectionMatrix();
   //camera2.updateProjectionMatrix();
    //renderer.setSize(window.innerWidth, window.innerHeight);
    

  }
  renderer2.setSize( window.innerWidth/2.2, window.innerHeight );

//renderer2.setSize( window.innerWidth/2.2, window.innerHeight );
      controls.update();
      
      //camera.rotation.x = 3
      TWEEN.update();
  
      //
     // renderer.render( scene, camera );
      renderer2.render( scene2, camera );
      
    };

    
    
/*
    for ( let i; i<xa.length;i++){
      xa[i].addEventListener("mouseenter", function( event ){
        event.target.style.color = "orange";
      },false);
      
    }
*/

    

    animate();
    
    
  
    // gltf.scene.animations.forEach(animation =>{mixer.clipAction(animation).play();});
    //const action = mixer.clipAction( gltf.animations[0] );
    //action.setLoop(THREE.LoopOnce,1)
    
    
    //console.log(gltf.animations)
    
    //action.play();
    
    
    
    // requestAnimationFrame( animate );
  
      //		const delta = clock.getDelta();
  
          //if ( this.mixer ) this.mixer.update( delta );
  
        //	renderer.render( scene, camera );
  
          //this.stats.update();
    //controls.update();
  
  
  /*
    const loader = new GLTFLoader();
  loader.load(
    '/assets/shark.glb',
    ( gltf ) => {
      const bojet=gltf;
      console.log(gltf);
  
      const animation = gltf.animations[0];
      // called when the resource is loaded
      scene.add( gltf.scene );
      
    },
    ( xhr ) => {
      // called while loading is progressing
      console.log( `${( xhr.loaded / xhr.total * 100 )}% loaded` );
    },
    ( error ) => {
      // called when loading has errors
      console.error( 'An error happened', error );
    },
  );
  */
  
  //
  //RENDER + ANIMATE//////
  //const clock = new THREE.Clock();
  
  //function animate(){
    //requestAnimationFrame( animate );
  
          //const delta = clock.getDelta();
  
          //if ( this.mixer ) this.mixer.update( delta );
          
            ////////////////////  CAMERA FOLLOW MOUSE /////////////////
          /*camera.position.x += ( mouseX - camera.position.x ) * .05;
          camera.position.y += ( - mouseY - camera.position.y ) * .05 + 0.1;
          camera.position.z += (mouseX - camera.position.z ) * 0.5 + 3;*/
    
    
          //camera.lookAt( scene.position );
          //renderer.render( scene, camera );
  
          //this.stats.update();
    //controls.update();
    //render();
  //};
  
  
  
  
  //function render (){
    //renderer.render(scene, camera);
  //}
  }

}
