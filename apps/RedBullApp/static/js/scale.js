let titleSecond = document.querySelector('#right').querySelector('.second').getElementsByTagName('h2');
let titleThird = document.querySelector('#right').querySelector('.third').getElementsByTagName('h2');
let titleFourth = document.querySelector('#right').querySelector('.fourth').getElementsByTagName('h2');
let bodyFont = document.getElementsByTagName('p');

let svgs = document.getElementsByClassName('svg');

let fontItems = new Array;
let svgItems = new Array;

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

    for (let each of titleSecond) {
        let object = new typeObject(each, .043);
        resize(object);
        fontItems.push(object);
    }

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
        let object = new typeObject(each, .016)
        resize(object);
        fontItems.push(object);

    }
    for (let each of svgs) {
        let object = new svgObject(each, .04)
        resizeSVG(object);
        svgItems.push(object);
    }

    for (let each of sideText) {
        let width = each.offsetWidth;
        each.style.left = -width + "px"
    }
}

window.onresize = function () {
    for (let each of fontItems) {
        resize(each);
    }
    for (let each of svgItems) {
        resizeSVG(each);
    }
}
