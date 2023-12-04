const toDoForm = document.getElementById('toDoForm');
const proyectForm = document.getElementById('proyectForm');

// select the entire form container to be display
const entireForm = document.querySelector('.form-container-background');

// select button to show the form container
const addButton = document.getElementById('addButton');

// select button to close the form container
const closeBtn = document.getElementById('closeBtn');

// select buttons to change form wheter you want to create a ToDo or a Proyect
const btns = document.querySelectorAll('.show-form-btn');

// variable to store form that is going to be shown
let formShown = null;

export function displayForm(){
    addButton.addEventListener('click', () => {
        entireForm.style.display = 'flex';
    })
}

//  tell wich form to show
export function chooseForm(){
    btns.forEach(btn => {
        btn.addEventListener('click', (event) => {
            formShown = event.target.id;
            console.log(formShown)
            
            if(formShown === 'toDoFormBtn'){
                toDoForm.style.display = 'flex';
                proyectForm.style.display = 'none';
            }
            else if(formShown === 'proyectFormBtn'){
                toDoForm.style.display = 'none';
                proyectForm.style.display = 'flex';
            }
        });
    });
};

export function closeForm(){
        entireForm.style.display = 'none';
}

export function closeFormBtn(){
    closeBtn.addEventListener('click', () => {
        closeForm()
    })
}


