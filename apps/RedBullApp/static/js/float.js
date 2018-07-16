let containers = document.getElementsByClassName('containerFloat');


const boundry = 100; //controls speed of reset
const speed = 1.5;
const thresh = .2;
const gravity = 0;


//calculates the dy which can be positve or negative and must maintain a speed threshold
function calculateDY() {
    let temDY = (Math.random() * (speed * 2)) - speed;
    if (temDY < 0) {
        temDY -= thresh;
    } else {
        temDY += thresh;
    }
    return temDY;
}

function calculateDX() {
    let temDX = (Math.random() * (speed * 2)) - speed;
    if (temDX < 0) {
        temDX -= thresh;
    } else {
        temDX += thresh;
    }
    return temDX;
}

function calculateR() {
    let temR = (Math.random() * .2) - .1;
    if (temR < 0) {
        temR -= thresh;
    } else {
        temR += thresh;
    }
    return temR;
}

function Icon(svg, container) {

    this.svg = svg;
    this.x = (Math.random() * (container.offsetWidth * 2)) - container.offsetWidth - 100;
    this.y = Math.random() * (container.offsetHeight - 100);
    this.dx = calculateDX();
    this.dy = calculateDY();
    this.rotate = Math.random() * 360;
    this.dr = calculateR();
    this.width = svg.offsetWidth;
    //use this later to resize imgs and keep scale of boundries

}

//icons is just the svg graphic
function makeObjects(icons, container) {
    let currentContain = container;
    let iconArray = new Array;
    for (i = 0; i < icons.length; i++) {
        let hold = new Icon(icons[i], currentContain)
        hold.svg.style.left = hold.x + 'px';
        hold.svg.style.top = hold.y + 'px';
        iconArray.push(hold);
    }
    //icon array consists of Icon objects with dy dx x y and svg properties
    moveObjects(iconArray, currentContain);
}

function moveObjects(array, container) {

    let currentContainer = container
    let iconArray = array;
    for (i = 0; i < iconArray.length; i++) {
        let hold = iconArray[i];
        hold.x += hold.dx;
        hold.y += hold.dy;
        hold.dy += gravity;
        hold.svg.style.left = hold.x + 'px';
        hold.svg.style.top = hold.y + 'px';
        hold.rotate += hold.dr;
        hold.width = hold.svg.offsetWidth;
        hold.svg.style.transform = `rotate(${hold.rotate}deg)`;

        if (hold.x > currentContainer.offsetWidth + hold.width + 100 || hold.y < -boundry || hold.y > currentContainer.offsetHeight + hold.width || hold.x < -boundry) {

            //resets animation
            let number = Math.random() * 1;

            if (number < .25) {
                hold.x = -100
                hold.y = Math.random() * currentContainer.offsetHeight - hold.width;
            } else if (number < .5) {
                hold.x = (Math.random() * currentContainer.offsetWidth - boundry);
                hold.y = currentContainer.offsetHeight + 10; 
            } else if(number < .75){
                
                //spawn right
                hold.x = currentContainer.offsetWidth + 10 + hold.width;
                hold.y = Math.random() * currentContainer.offsetHeight;
                console.log(hold.x + "x");
                console.log(hold.y + "y");
                
            }else {
                
                hold.x = Math.random() * currentContainer.offsetWidth - hold.width;
                hold.y = (Math.random() * -boundry) - hold.width;
            }

            hold.svg.style.left = hold.x;
            hold.svg.style.top = hold.y;
            hold.dx = calculateDX();
            hold.dy = calculateDY();

        }
    }
    window.requestAnimationFrame(function () {
        moveObjects(iconArray, currentContainer);
    });
}

