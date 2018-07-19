let titleFirst = document.getElementsByTagName('h1');

let titleSecond = document.querySelector('#right').querySelector('.second').getElementsByTagName('h2');
let titleThird = document.querySelector('#right').querySelector('.third').getElementsByTagName('h2');
let titleFourth = document.querySelector('#right').querySelector('.fourth').getElementsByTagName('h2');
let bodyFont = document.getElementsByTagName('p');
let checkBoxOptions = document.querySelector('.checkboxes').getElementsByTagName('span');

let svgs = document.getElementsByClassName('svg');

let fontItems = new Array;
let svgItems = new Array;
let main = document.querySelector('.main');
let background = document.querySelector('.background');

console.log(background);

function typeObject(typeElement, proportion) {
    this.element = typeElement;
    this.proportion = proportion;
}

function svgObject(svg, proportion) {
    this.svg = svg
    this.proportion = proportion
}


function resize(item) {
    item.element.style.fontSize = (body.offsetWidth * item.proportion) + "px";

    if (item.element.tagName === 'P') {

        item.element.style.lineHeight = (body.offsetWidth * item.proportion * 1.2) + "px"
    }
}

function resizeSVG(item) {
    item.svg.style.width = (body.offsetWidth * item.proportion) + "px";
    item.svg.style.height = (body.offsetWidth * item.proportion) + "px";
}

body.onload = function () {
    for (let each of containers) {
        let icons = each.getElementsByClassName('svg');
        makeObjects(icons, each);
    }

}
for (let each of titleFirst) {
    let object = new typeObject(each, .12);
    resize(object);
    fontItems.push(object);
}

for (let each of titleSecond) {
    let object = new typeObject(each, .04);
    resize(object);
    fontItems.push(object);

    for (let each of titleThird) {
        let object = new typeObject(each, .037);
        resize(object);
        fontItems.push(object);
    }

    for (let each of titleFourth) {
        let object = new typeObject(each, .045);
        resize(object);
        fontItems.push(object);
    }

    for (let each of bodyFont) {
        let object = new typeObject(each, .012);
        resize(object);
        fontItems.push(object);
    }    
    
    for (let each of checkBoxOptions) {
        let object = new typeObject(each, .011);
        resize(object);
        fontItems.push(object);
    }
    for (let each of svgs) {
        let object = new svgObject(each, .06)
        resizeSVG(object);
        svgItems.push(object);
    }

    for (let each of sideText) {
        let width = each.offsetWidth;
        each.style.left = -width + "px"
    }
    
    setTimeout(function(){
        background.style.zIndex = "-1";
    }, 1000)

}

window.onresize = function () {
    for (let each of fontItems) {
        resize(each);
    }
    for (let each of svgItems) {
        resizeSVG(each);
    }

}
