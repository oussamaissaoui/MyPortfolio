import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Portfo';

  globalMouseX:any;
  globalMouseY:any;
  
                              done=0;
                            aa=window.addEventListener('scroll', (event) => {
                              // handle the scroll event 

                              // console.log(scrollY)
                              
                              
                              if (scrollY>2150 && scrollY<3600){
                                
                                //this.done=1;
                                //alert(1)
                                document.body.style.backgroundColor='#555555';
                                document.body.style.color='#ffffff'
                                document.body.style.transition='background-color 1650ms linear';



                                
                                //setTimeout(function(){  document.body.style.backgroundColor='black'; }, 20);
                              
                                
                                

                              } else{
                                document.body.style.backgroundColor='#ebebeb';
                                document.body.style.color='black'
                              };

/*
                              if (scrollY>3800 && scrollY<7600){
                                
                                this.done=1;
                                //alert(1)
                               document.body.style.backgroundColor='rgb(44, 44, 44)';
                                document.body.style.color='#ffffff'
                                document.body.style.transition='background-color 1650ms linear';



                                
                                //setTimeout(function(){  document.body.style.backgroundColor='black'; }, 20);
                              
                                
                                

                              } */

                            /*
                              if (scrollY>1400 && scrollY<1800){
                                //document.body.setAttribute('color-violet','color-violet')
                                // setTimeout(function(){  }, 3000);
                                document.body.style.backgroundColor = "black";
                              }*/
                            });
















          







}
