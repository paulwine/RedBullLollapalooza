let modules = document.getElementsByClassName('module');
let leftView = document.getElementById('left');
let rightView = document.getElementById('right');

let body = document.querySelector('body');
let arrow = document.getElementById('arrow-ting');
let pointers = document.querySelector('nav').querySelector('.container').getElementsByTagName('img');
let circles = document.querySelector('nav').querySelectorAll('svg');

//initially tags all divs with classes
function tagItems() {

    for (i = 0; i < modules.length; i++) {
        let current = modules[i];
        if (!(current.classList.contains('view'))) {
            current.classList.add('invisible');
        } else {}
    }
    let height = window.innerHeight;
    let rightInvisible = rightView.getElementsByClassName('invisible');
    let leftInvisible = leftView.getElementsByClassName('invisible');

    for (i = 0; i < rightInvisible.length; i++) {
        rightInvisible[i].style.top = rightInvisible[i].offsetTop + height + 'px';

    }

    for (i = 0; i < leftInvisible.length; i++) {
        leftInvisible[i].style.top = leftInvisible[i].offsetTop - height + 'px';
    }

}

//operates the left div movement takes direction of slide as parameter
function tagLeft(direction) {
    let now = leftView.querySelector('.view');
    let next = now.nextElementSibling;
    let previous = now.previousElementSibling;
    if (direction === 'up') {
        slideUp(now, false);
        slideUp(next, true);
        let titleImg = next.querySelector('.lax');
        parallaxImg(titleImg, "up");

    } else if (direction === 'down') {
        slideDown(now, false);
        slideDown(previous, true);

        let titleImg = previous.querySelector('.lax');
        parallaxImg(titleImg, "down");
    }
}

//operates right div movement. takes direction of slide as parameter
function tagRight(direction) {
    let now = rightView.querySelector('.view');
    let next = now.nextElementSibling;
    let previous = now.previousElementSibling;

    if (direction === 'up') {
        slideUp(now, false);
        slideUp(next, true);

        let delay = 0;
        let laxers = next.getElementsByClassName('lax');

        for (let each of laxers) {
            setTimeout(function () {
                parallaxImg(each, "up");
            }, delay);
            delay += 50;
        }

    } else if (direction === 'down') {
        slideDown(now, false);
        slideDown(previous, true);
        let delay = 0;
        let laxers = previous.getElementsByClassName('lax');

        for (let each of laxers) {
            setTimeout(function () {
                parallaxImg(each, "down");
            }, delay);
            delay += 50;
        }
    }
}

//lets us use svg circles to trigger animation
function triggerCircle(circle) {
    for (let each of pointers) {
        if (circle.getAttribute('position') === each.getAttribute('position')) {
            navAnimation(each);
            triggerBackground(circle.getAttribute('position'));
        }
    }
    clearCircle(circle);
}

function triggerBackground(position) {
    let background = document.querySelector('.background').querySelector('img');
    let percentage = 5 * position * -1;
    background.style.transform = 'translateY(' + percentage + '%)';

}

function clearCircle(circle) {

    for (let each of circles) {
        each.classList.remove('shrink');
    }
    circle.classList.add('shrink');
}

//lets navigation jump view to section, takes nav element as param
function toSection(section) {

    let number = section.getAttribute('position');

    //left side
    for (each of leftView.getElementsByClassName('module')) {
        let current = leftView.querySelector('.view');
        let currentPos = current.getAttribute('position');

        if (each.getAttribute('position') === number) {
            //div moving into the space
            let goTo = each;
            if (goTo.getAttribute('position') > currentPos) {
                slideDown(goTo, true);
                slideDown(current, false);

                let titleImg = goTo.querySelector('.lax');
                parallaxImg(titleImg, "down");

            } else {
                slideUp(goTo, true);
                slideUp(current, false);

                let titleImg = goTo.querySelector('.lax');
                if (!(titleImg === null)) {
                    parallaxImg(titleImg, "up");
                }
            }
        } else {
            //positions other divs correctly
            if (each.getAttribute('position') > number) {
                each.style.top = (window.innerHeight * -1) + "px";
            } else {
                each.style.top = (window.innerHeight) + "px";
            }
        }
    }

    //right side, opposite of left
    for (each of rightView.getElementsByClassName('module')) {
        let current = rightView.querySelector('.view');
        let currentPos = current.getAttribute('position');

        if (each.getAttribute('position') === number) {
            //div moving into the space
            let goTo = each;
            if (goTo.getAttribute('position') < currentPos) {
                slideDown(goTo, true);
                slideDown(current, false);
                let delay = 0;
                let laxers = goTo.getElementsByClassName('lax');

                for (let each of laxers) {
                    setTimeout(function () {
                        parallaxImg(each, "down");
                    }, delay);
                    delay += 50;
                }
            } else {
                slideUp(goTo, true);
                slideUp(current, false);

                let delay = 0;
                let laxers = goTo.getElementsByClassName('lax');

                for (let each of laxers) {
                    setTimeout(function () {
                        parallaxImg(each, "up");
                    }, delay);
                    delay += 50;
                }
            }
        } else {
            //positions other divs correctly
            if (each.getAttribute('position') < number) {
                each.style.top = (window.innerHeight * -1) + "px";
            } else {
                each.style.top = (window.innerHeight) + "px";
            }
        }
    }

}

//slides items up according to window height
function slideUp(move, intoView) {
    let height = window.innerHeight;

    if (intoView === true) {
        move.classList.remove('invisible');
        move.classList.add('view');
        move.style.top = '0px';

    } else {
        move.classList.remove('view');
        move.classList.add('invisible');
        move.style.top = move.offsetTop - height + 'px';
    }

}

//slides items down according to window height
function slideDown(move, intoView) {
    let height = window.innerHeight;

    if (intoView === true) {
        move.classList.remove('invisible');
        move.classList.add('view');
        move.style.top = "0px";

    } else {
        move.classList.remove('view');
        move.classList.add('invisible');
        move.style.top = move.offsetTop + height + 'px';
    }

}

//scrolling down?
function pageDown() {
    if (!(rightView.querySelector('.view').classList.contains('edge-bottom'))) {
        tagRight('up');
        tagLeft('down');
        let currentPos = rightView.querySelector('.view').getAttribute('position');
        for (let each of navItems) {
            if (each.getAttribute('position') === currentPos) {
                navAnimation(each);
                triggerBackground(each.getAttribute('position'));
            }
        }
        for (let each of circles) {
            if (each.getAttribute('position') === currentPos) {
                clearCircle(each);
            }
        }
    }
}

//scrolling up?
function pageUp() {
    if (!(rightView.querySelector('.view').classList.contains('edge-top'))) {
        tagRight('down');
        tagLeft('up');
        let currentPos = rightView.querySelector('.view').getAttribute('position');
        for (let each of navItems) {
            if (each.getAttribute('position') === currentPos) {
                navAnimation(each);
                triggerBackground(each.getAttribute('position'));
            }
        }
        for (let each of circles) {
            if (each.getAttribute('position') === currentPos) {
                clearCircle(each);
            }
        }
    }
}

function sideTextOn(circle){
    let text = circle.nextElementSibling;    
    if(!(text === null)){
        
    text.style.left = '59px';
    }

}
function sideTextOff(circle){
    let text = circle.nextElementSibling;    
    
    if(!(text === null)){
        
    let width = text.offsetWidth;
    text.style.left = width * -1 + "px";
    }
}


function parallaxImg(item, direction) {
    if (!(item === null) && !(item === undefined)) {
        if (direction === "up") {
            item.classList.add("movingUp");
            setTimeout(function () {
                item.classList.remove("movingUp");
            }, 20);

        } else {
            item.classList.add("movingDown");
            setTimeout(function () {
                item.classList.remove("movingDown");
            }, 20);
        }
    }
}

let canGo = true;
let delay = 1800

function MouseWheelHandler() {
    return function (e) {
        // cross-browser wheel delta
        var e = window.event || e;
        var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));

        //scrolling down?
        if (canGo === true) {
            if (delta < 0) {
                pageDown();
                canGo = false;
                setTimeout(function () {
                    canGo = true;
                }, delay)
            } else { //scrolling up?
                pageUp();
                canGo = false;
                setTimeout(function () {
                    canGo = true;
                }, delay)
            }
        }
        return false;
    }
}

//detects mouse movement up or down
if (document.addEventListener) {
    document.addEventListener("mousewheel", MouseWheelHandler(), false);
    document.addEventListener("DOMMouseScroll", MouseWheelHandler(), false);
} else {
    sq.attachEvent("onmousewheel", MouseWheelHandler());
}

tagItems();
arrow.onclick = function () {
    pageDown();
}


for (let each of circles) {
    each.onclick = function () {
        triggerCircle(each);
        toSection(each);
    }
}

function test() {
    let test = rightView.querySelector('.view');
    slideUp(test, false);
}

for(let each of circles){
    each.onmouseenter = function(){
        sideTextOn(each);
    }
    each.onmouseleave = function(){
        sideTextOff(each);
    }
}
