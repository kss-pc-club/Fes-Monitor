import { init } from "./react";
import { slide } from "./slide";
import { nowTimer } from "./timer";
// import { WebSoc } from "./ws";

window.addEventListener('load',()=>{
  init();
  setInterval(nowTimer,100);
  setInterval(slide,10000);
  // new WebSoc()
})