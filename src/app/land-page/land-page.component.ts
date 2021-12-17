import { Component, OnInit, Renderer2 } from '@angular/core';
import * as THREE from 'three';
import {gsap} from 'gsap'; 
import { TextPlugin } from "gsap/TextPlugin";



gsap.registerPlugin(TextPlugin);





//const {SimplexNoise} = require('simplex-noise');
declare var SimplexNoise:any;




@Component({
  selector: 'app-land-page',
  templateUrl: './land-page.component.html',
  styleUrls: ['./land-page.component.css']
})
export class LandPageComponent implements OnInit {

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {


    /*
    const script = this.renderer.createElement('script');
    script.src = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/16327/SplitText3.min.js`;
    this.renderer.appendChild(document.head, script);




*/

    gsap.from(".letter", {rotationY: 36, opacity:0, duration: 0.8, yPercent: -100, stagger: 0.15, ease:"Expo.easeOut",repeat: 0})


   // gsap.to("#myText", {duration: 2, text: "thank you for waiting", delay: 1});

   // gsap.to(".myText", {duration: 3, text: "this is a to tween"})

   gsap.to("p", {
    text:"AS VISUAL AS TECHNICAL", 
    ease:"power1.in",
    duration: 4,
    //repeat:-1,
    yoyo: true,
    repeatDelay: 10.4
  })



  
/*
const titleList = gsap.utils.toArray('#titleEffects li')
const titlesTl = gsap.timeline({repeat: -1})

gsap.registerEffect({
  name: 'rotateIn',
  extendTimeline: true,
  defaults: {
    duration: 1,
    rotationY: 0,
    rotationX: 0,
    transformOrigin: '50% 50%',
    ease: 'back',
    parent: '.wrap',
  },

  effect: (targets, config) => {
    gsap.set(config.parent, { perspective: 800 })

    let tl = gsap.timeline()
    tl.from(targets, {
      duration: config.duration,
      rotationY: config.rotationY,
      rotationX: config.rotationX,
      transformOrigin: config.transformOrigin,
      ease: config.ease,
      stagger: {
        each: 0.06,
      },
    })

    tl.from(
      targets,
      {
        duration: 0.4,
        autoAlpha: 0,
        ease: 'none',
        stagger: {
          each: 0.05,
        },
      },
      0,
    )

    return tl
  },
})

gsap.registerEffect({
  name: 'rotateOut',
  extendTimeline: true,
  defaults: {
    duration: 0.5,
    x: 0,
    y: 0,
    rotationY: 0,
    rotationX: 0,
    rotationZ: 0,
    transformOrigin: '50% 50%',
    ease: 'power1.in',
    parent: '.wrap',
  },

  effect: (targets, config) => {
    gsap.set(config.parent, { perspective: 800 })

    let tl = gsap.timeline()
    tl.to(targets, {
      x: config.x,
      y: config.y,
      rotationY: config.rotationY,
      rotationX: config.rotationX,
      rotationZ: config.rotationZ,
      transformOrigin: config.transformOrigin,
      ease: config.ease,
      stagger: {
        each: 0.04,
      },
    })

    tl.to(
      targets,
      {
        duration: 0.45,
        opacity: 0,
        ease: 'none',
        stagger: {
          amount: 0.02,
        },
      },
      0,
    )

    return tl
  },
})

function splitElements() {
  gsap.set(titleList, { autoAlpha: 1 })
  titleList.forEach((element:any, dex) => {
    let split = new SplitText(element, { type: 'chars,words,lines' })

  titlesTl
    .rotateIn(split.words, { 
      rotationX: 90,
      transformOrigin: '100% 0',
      ease: 'back(2.3)' 
    }, dex > 0 ? '-=0.38' : 0, )
    .rotateOut(split.words, {
      y: 20,
      rotationX: -100,
      transformOrigin: '100% 100%'
    })
  })
}

splitElements()

  
   */
    

  }



}
