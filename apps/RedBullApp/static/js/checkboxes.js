//let inputs = document.querySelector('.checkboxes').getElementsByTagName('input');

let inputs = new Array;

for (let each of document.querySelectorAll('.checkboxes')) {
    for (let input of each.querySelectorAll('input')) {
        inputs.push(input);
    }
}

let fakeBoxes = document.getElementsByClassName('fakebox');

//let fakeMobile = document.querySelector('#mobile').querySelector('.checkboxes').getElementsByClassName('fakebox');


function checkBox(box) {
    for (let each of fakeBoxes) {
        each.querySelector('.check').classList.add('hide');
    }
    box.querySelector('.check').classList.remove('hide');

    for (let each of inputs) {
        each.checked = false;
        if (each.getAttribute('name') === box.getAttribute('name')) {
            each.checked = true;

            if (each.getAttribute('name') === 'no') {

                for (let each of document.getElementsByClassName('invitation')) {
                    each.disabled = true;
                    each.value = "";
                    each.classList.add('disabled');
                }
                for (let each of document.getElementsByClassName('invitation-text')) {
                    each.classList.add('disabled');
                }

            } else {

                for (let each of document.getElementsByClassName('invitation')) {
                    console.log(each);
                    each.disabled = false;
                    each.classList.remove('disabled');
                }
                for (let each of document.getElementsByClassName('invitation-text')) {
                    each.classList.remove('disabled');
                }

            }
        }
    }

}

for (let each of fakeBoxes) {
    each.onclick = function () {
        checkBox(each);
    }
}
