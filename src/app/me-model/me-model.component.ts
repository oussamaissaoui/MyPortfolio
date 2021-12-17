import { Component, HostListener, Input, OnInit } from '@angular/core';
import * as THREE from 'three';

import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
//import {MatDialog} from '@angular/material/dialog';


import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';



import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-me-model',
  templateUrl: './me-model.component.html',
  styleUrls: ['./me-model.component.css']
})
export class MeModelComponent implements OnInit {


  closeResult = '';
  @Input() ChildEventX;
 /*
  @HostListener('document:mousemove', ['$event']) 
  onMouseMove(e) {
    console.log(e.clientX);
  }*/


  FormData: FormGroup;
  constructor(private modalService: NgbModal,private builder: FormBuilder,private contact: ContactService) { }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',centered:true,size:'lg'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


  onSubmit(FormData) {
    console.log(FormData)
    this.contact.PostMessage(FormData)
    .subscribe(response => {
    location.href = 'https://mailthis.to/confirm'
    console.log(response)
    //alert('sent')
    }, error => {
    console.warn(error.responseText)
    console.log({ error })
    //alert('error')
    })
  
    }

  ngOnInit(): void {

    this.FormData = this.builder.group({
      Fullname: new FormControl('', [Validators.required]),
      Email: new FormControl('', [Validators.compose([Validators.required, Validators.email])]),
      Comment: new FormControl('', [Validators.required])
      })

      
      
    

   console.log(this.ChildEventX)

    let canvass:any=Array.from(document.querySelectorAll('canvas'));
    var canvas:any=canvass[3];
      
    // // 
//const canvas: any = document.querySelector('#canvas');
const renderer: any = new THREE.WebGLRenderer({canvas,alpha:true});

//
//
const fov= 75;
const aspect = 2;
const near = 0.1;
const far=1200;
const camera = new THREE.PerspectiveCamera(fov,aspect,near,far);
camera.position.z=6;

//camera.position.y=15;
//camera.position.x=15;

//
//
/*
const controls = new OrbitControls(camera,renderer.domElement); //!!!XXXxxx!!!!!
controls.enableDamping = true;
controls.enablePan = true;
controls.update();
//*/
//
const scene = new THREE.Scene();
//scene.background= new THREE.Color('rgba(221, 221, 221, 0.466)');

//





//scene.add(cube)


let data2:any;
let mixer2;


////////////////////////////////////////////////GLB/////////////////////////////////////////////

var loader = new GLTFLoader();
loader.crossOrigin = true;
loader.load( '../../assets/me.glb', function ( data ) {


  var object = data.scene;
   //object.position.set(0, 0, 22.75);
//     object.rotation.set(Math.PI / -2, 0, 0);

//     TweenLite.from( object.rotation, 1.3, {
//       y: Math.PI * 2,
//       ease: 'Power3.easeOut'
//     });




 
  object.position.z = 0;
  object.position.y = -11.5;
  object.scale.set(20,20,20)
  scene.add( object );
//, onProgress, onError );

let ele;
console.log(ele)

document.getElementById('memodId').addEventListener('mousemove', (event) => {
  // handle the scroll event 

  // console.log(scrollY)
  
  //this.globalMouseX=event.clientX;
  //this.globalMouseY=event.clientX;

 //console.log(event.clientX)
 object.rotation.y=event.clientX*0.000116-0.08;
 object.rotation.x=event.clientY*0.0000116;
 //object.rotation.y=event.clientY*0.000016;

})
});



/////////////////////////////////////////////////////////////////////////////////////////////  
const Alight = new THREE.AmbientLight("rgb(235, 251, 251)",1.48 ); // soft white light

        
scene.add( Alight );

const light = new THREE.PointLight( 'rgb(235, 251, 251)', 3.5, 100 );
light.position.set( 0, -6.5, 35 );
scene.add( light );





 
const clock = new THREE.Clock();

//const delta = clock.getDelta();
//mixer.update(delta);


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
                  
                  //renderer.render(scene, camera);
                  
                }
                render();
    





           

  

  

  const animate= ()=>
  { requestAnimationFrame(animate);
    const delta = clock.getDelta();
    //if (mixer) mixer.update(clock.getDelta());

   
   
    //controls.update();

   // object.rotation.z +=0.02;
   // var delta = clock.getDelta();

   //mxx(delta);


    
    renderer.render( scene, camera );
    
  };
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

