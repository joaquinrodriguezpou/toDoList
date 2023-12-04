import './handleForm.js';
import { displayForm, chooseForm, closeFormBtn } from './formShowing.js';
import { createTask, createProyect } from './handleForm.js';

displayForm();
chooseForm();
closeFormBtn();
createTask();
createProyect()
// let proyectShown = null;

// const proyectButtons = document.querySelector('.proyectBtns-container');

// proyectButtons.addEventListener('click', (event) => {
//     proyectShown = event.target.id;
//     console.log(proyectShown)
// })
