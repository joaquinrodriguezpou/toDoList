import { displayEditForm } from './formShowing.js';
import { closeForm } from './formShowing.js';
import { Task } from './createClasses.js';
import { proyectsManager } from './createClasses.js';
import { stylePriority } from './handleForm.js';

const tasksContainer = document.querySelector('.tasks-container');
const editTaskForm = document.getElementById('edit-task-form');
// const priorityBtns = document.querySelectorAll('.radios');

// store task that is being edited
let oldTask;

function getEditTaskValues(){
    let edittitle = document.getElementById('edit-title').value;
    let editdescription = document.getElementById('edit-description').value;
    let editdueDate = document.getElementById('edit-duedate').value;
    // get edited priority value 
    let radios = Array.from(document.querySelectorAll('.edit-priority'));
    let editpriority = radios.find(radio => radio.checked);
    
    // let priority = document.getElementById(priorityId)
    editpriority.checked = true;

    return [
        edittitle,
        editdescription,
        editdueDate,
        editpriority.value,
    ]   
}

function fillEditFormWithTaskValues(){
    // select edit form values 
    let edittitle = document.getElementById('edit-title');
    let editdescription = document.getElementById('edit-description');
    let editdueDate = document.getElementById('edit-duedate');
    // assign old task values to edit form values
    let editpriority = document.getElementById(`edit-${oldTask.priority}`);
    editpriority.checked = true;
    stylePriority();
    
    edittitle.value = oldTask.title;
    editdescription.value = oldTask.description;
    editdueDate.value = oldTask.dueDate;
}

function createEditedTask() {
    // create edited task 
    let editedTask = new Task(...getEditTaskValues());
    // add Home proyect to the task
    editedTask.addProyect('Home');
    // if oldtask was in a second proyect, add second proyect to the task
    if(oldTask.proyect[1]){
        editedTask.addProyect(oldTask.proyect[1]);
    }
    // create edited task container
    editedTask.createContainer();
    // find in wich proyect is the task
    let proyectsIn = oldTask.proyect;
        // iterate through each proyect the task is in
    proyectsIn.forEach(proyect => {
        // select actual proyect
        let actualProyect = proyectsManager.proyects[proyect];
        // select actual proyect container
        let actualProyectContainer = document.getElementById(actualProyect.name);
        // select old task container
        let oldTaskContainer = document.getElementById(oldTask.title);
        // add edited task container right next to the old one
        actualProyectContainer.insertBefore(editedTask.makeContainerCopy(), oldTaskContainer);
        // remove old task container
        if (oldTaskContainer) {
            oldTaskContainer.remove();
        }
        else {
            console.error(`havent found such contaienr from task: ${oldTask.title}`);
        }
        // remove old task from the proyect it was in
        actualProyect.removeTask(oldTask);
        // add edited task to the proyect it was in
        actualProyect.addTask(editedTask);
    })
}

export function EditeTask(){
    // listens to edit task form when submited
    editTaskForm.addEventListener('submit', (event) => {
        // prevents page for refreshing
        event.preventDefault();
        createEditedTask();
        closeForm();
    })
}

export function listenTaskBtns() {
    tasksContainer.addEventListener('click', (event) => {
        // verify if it is a remove button
        if (event.target.classList.contains('remove-btn')) {
            // remove task container
            event.target.parentNode.remove();
        }
        // verify if it is an edit button
        else if(event.target.classList.contains('edit-btn')) {
            // get the task name
            let taskName = event.target.parentNode.id;
            // select current task
            oldTask = proyectsManager.proyects['Home'].tasks[taskName];
            fillEditFormWithTaskValues();
            // stylePriority();
            displayEditForm();
        }
        else if(event.target.classList.contains('check-btn')) {
            // get the task name
            let taskName = event.target.parentNode.id;
            // select current task
            let selectedTask = proyectsManager.proyects['Home'].tasks[taskName];
            // check task or uncheck task
            selectedTask.check(event.target);
        }
        else if(event.target.classList.contains('details-btn')) {
            // get the task name
            let taskName = event.target.parentNode.id;
            // select current task
            let selectedTask = proyectsManager.proyects['Home'].tasks[taskName];
            // show details container
            selectedTask.showDetails();
        }
    });
}



