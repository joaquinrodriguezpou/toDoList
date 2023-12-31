import { resetForm } from "./handleForm";

const taskForm = document.getElementById('taskForm');
const proyectForm = document.getElementById('proyectForm');

// select the entire form container to be display
export const entireForm = document.querySelector('.form-container-background');

// select form container
const formContainer = document.querySelector('.form-container');

// select edit form container
const editFormContainer = document.querySelector('.edit-form-container');

// select button to show the form container
const addButton = document.getElementById('addButton');

// select button to close the form container
const closeBtn = document.querySelectorAll('.closeBtn');

// select buttons to change form wheter you want to create a ToDo or a Proyect
const btns = document.querySelectorAll('.show-form-btn');

// select task form button
const taskFormBtn = document.getElementById('taskFormBtn');

// select proyect form button
const proyectFormBtn = document.getElementById('proyectFormBtn');

// variable to store form that is going to be shown
let formShown = null;

export function displayForm(){
    addButton.addEventListener('click', () => {
        entireForm.style.display = 'flex';
        formContainer.style.display = 'flex';
        editFormContainer.style.display = 'none';
    })
}

export function displayEditForm(){
    entireForm.style.display = 'flex';
    editFormContainer.style.display = 'flex';
    formContainer.style.display = 'none';
}

export function displayJustEntireForm(){
    entireForm.style.display = 'flex';
    editFormContainer.style.display = 'none';
    formContainer.style.display = 'none';
}

//  tell wich form to show wether it is proyect form or task form
export function chooseForm(){
    btns.forEach(btn => {
        btn.addEventListener('click', (event) => {
            formShown = event.target.id;
            if(formShown === 'taskFormBtn'){
                taskForm.style.display = 'flex';
                proyectForm.style.display = 'none';
                taskFormBtn.classList.add('selected-form');
                proyectFormBtn.classList.remove('selected-form');
            }
            else if(formShown === 'proyectFormBtn'){
                taskForm.style.display = 'none';
                proyectForm.style.display = 'flex';
                proyectFormBtn.classList.add('selected-form');
                taskFormBtn.classList.remove('selected-form');
            }
        });
    });
};

export function closeForm(){
    entireForm.style.display = 'none';
}

export function closeFormBtn(){
    closeBtn.forEach(btn => {
        btn.addEventListener('click', () => {
        closeForm();
        resetForm();
    })
    })
}


