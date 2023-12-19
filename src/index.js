import './handleForm.js';
import { displayForm, chooseForm, closeFormBtn } from './formShowing.js';
import { showSelectedProyect, addTask, addProyect } from './handleForm.js';
import { listenTaskBtns, EditeTask } from './editTask.js'
import './localStorage.js';

displayForm();
chooseForm();
closeFormBtn();
showSelectedProyect();
addTask();
addProyect();
EditeTask();
listenTaskBtns();

