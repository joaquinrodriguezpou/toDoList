import './handleForm.js';
import { displayForm, chooseForm, closeFormBtn } from './formShowing.js';
import { showSelectedProyect, createTask, createProyect, editAndRemoveBtns, createEditedTask } from './handleForm.js';

displayForm();
chooseForm();
closeFormBtn();
showSelectedProyect();
createTask();
createProyect();
createEditedTask();
editAndRemoveBtns();
// let proyectShown = null;

// const proyectButtons = document.querySelector('.proyectBtns-container');

// proyectButtons.addEventListener('click', (event) => {
//     proyectShown = event.target.id;
//     console.log(proyectShown)
// })
