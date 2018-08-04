//let inputs = document.querySelector('.checkboxes').getElementsByTagName('input');

let inputs = new Array;

for (let each of document.querySelectorAll('.checkboxes')) {
    for (let input of each.querySelectorAll('input')) {
        inputs.push(input);
    }
}

function validate(button){
    let form = button.closest('form');
    let number = form.querySelector('.invitation');
    let first = form.querySelector('.first');
    let last = form.querySelector('.last');
    let email = form.querySelector('.email');
    let cell = form.querySelector('.cell');
    let info = [first, last, email, cell];
    let mark = 0;

    for(let each of info){
        if(each.querySelector('input').value.length > 0){
            mark += 1;
        }
    }
    console.log(mark);
    if(mark === 4){
        form.querySelector('#submit').click();
    }else{
        alert('Please be sure you filled out all required (*) fields.')
    }
}

let submits = document.getElementsByClassName('submit')
for(let each of submits){
    let button = each.querySelector('button');
    button.onclick = function(){
        validate(button)
    }
}

//TODO UNCOMMENT EVERYTHING IN HTML





//let fakeBoxes = document.getElementsByClassName('fakebox');

//let fakeMobile = document.querySelector('#mobile').querySelector('.checkboxes').getElementsByClassName('fakebox');


//function checkBox(box) {
//    for (let each of fakeBoxes) {
//        each.querySelector('.check').classList.add('hide');
//    }
//    box.querySelector('.check').classList.remove('hide');
//
//    for (let each of inputs) {
//        each.checked = false;
//        if (each.getAttribute('name') === box.getAttribute('name')) {
//            each.checked = true;
//
//            if (each.getAttribute('name') === 'no') {
//
//                for (let each of document.getElementsByClassName('invitation')) {
//                    each.disabled = true;
//                    each.value = "";
//                    each.classList.add('disabled');
//                }
//                for (let each of document.getElementsByClassName('invitation-text')) {
//                    each.classList.add('disabled');
//                }
//
//            } else {
//
//                for (let each of document.getElementsByClassName('invitation')) {
//                    console.log(each);
//                    each.disabled = false;
//                    each.classList.remove('disabled');
//                }
//                for (let each of document.getElementsByClassName('invitation-text')) {
//                    each.classList.remove('disabled');
//                }
//
//            }
//        }
//    }
//
//}
//
//for (let each of fakeBoxes) {
//    each.onclick = function () {
//        checkBox(each);
//    }
//}

