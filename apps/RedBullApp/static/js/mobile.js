let mBackground = document.querySelector('.background-mobile');
let increment = .5;
let topBack = 0;
let move;

function backgroundUp(){
    move = topBack + increment
    mBackground.style.transform = `translateY(${move}px)`;
    topBack += increment;
}

function backgroundDown(){
    move = topBack + increment
    mBackground.style.transform = `translateY(${move}px)`;
    topBack -= increment;
}

let lastScrollTop = 0;
// element should be replaced with the actual target element on which you have applied scroll, use window in case of no target element.
window.addEventListener("scroll", function(){ // or window.addEventListener("scroll"....
   let st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
   if (st > lastScrollTop){
      backgroundDown();
   } else {
      backgroundUp();
   }
   lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
}, false);