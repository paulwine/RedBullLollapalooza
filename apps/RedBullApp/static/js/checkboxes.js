let inputs = document.querySelector('.checkboxes').getElementsByTagName('input');

let fakeBoxes = document.querySelector('.checkboxes').getElementsByClassName('fakebox');

function checkBox(box){
    for(let each of fakeBoxes){
        each.querySelector('.check').classList.add('hide');
    }    
    box.querySelector('.check').classList.remove('hide');
    
    for (let each of inputs){
        each.checked = false;
        if(each.getAttribute('name') === box.getAttribute('name')){
            each.checked = true;
            
            if (each.getAttribute('name') === 'no'){
                document.querySelector('#invitation').disabled = true;
                document.querySelector('#invitation').value = "";
                
                document.querySelector('#invitation').classList.add('disabled');
                document.querySelector('#invitation-text').classList.add('disabled');
                
            }else{
                document.querySelector('#invitation').disabled = false;    
                document.querySelector('#invitation').classList.remove('disabled');
                document.querySelector('#invitation-text').classList.remove('disabled');
            }
        }
    }
    
}

for(let each of fakeBoxes){
    each.onclick = function(){
        checkBox(each);
    }
}