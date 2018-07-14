let navItems = document.querySelector('nav').getElementsByTagName('img');
let sideText = document.getElementsByClassName('side-text');

for(let each of navItems){
    each.style.transform = "rotate(0deg)";
}

function navAnimation(clicked, direction) {
    for (let each of navItems) {
        
        if (each.classList.contains('currentNav')) {
            each.classList.remove('currentNav');
            each.classList.add('dormantNav');
            let rotation = each.style.transform.replace(/\D/g, '');
            rotation = parseInt(rotation) + 360;
            each.style.transform = `rotate( ${rotation}deg)`;
        }
    }
    setTimeout(function () {
        clicked.classList.remove('dormantNav');
        clicked.classList.add('currentNav');
        let rotation = clicked.style.transform.replace(/\D/g, '');
        rotation = parseInt(rotation) + 360;
        clicked.style.transform = `rotate( ${rotation}deg)`;
    }, 50)
}

