import { displayEditForm } from './formShowing.js';
import { closeForm} from './formShowing.js';
import { Task } from './createClasses.js';
import { proyectsManager } from './createClasses.js';

const tasksContainer = document.querySelector('.tasks-container');
const editTaskForm = document.getElementById('edit-task-form');

// store task that is being edited
let oldTask;

function getEditTaskValues(){
    let edittitle = document.getElementById('edit-title').value;
    let editdescription = document.getElementById('edit-description').value;
    let editdueDate = document.getElementById('edit-duedate').value;
    let editpriority = document.getElementById('edit-priority').value;

    return [
        edittitle,
        editdescription,
        editdueDate,
        editpriority,
    ]   
}

function fillEditFormWithTaskValues(){
    // select edit form values 
    let edittitle = document.getElementById('edit-title');
    let editdescription = document.getElementById('edit-description');
    let editdueDate = document.getElementById('edit-duedate');
    let editpriority = document.getElementById('edit-priority');
    // assign old task values to edit form values 
    edittitle.value = oldTask.title;
    editdescription.value = oldTask.description;
    editdueDate.value = oldTask.dueDate;
    editpriority.value = oldTask.priority;
}

function createEditedTask() {
    // create edited task 
    let editedTask = new Task(...getEditTaskValues());
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
            let oldTaskContainer = actualProyectContainer.querySelector(`.${oldTask.title}`);
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
            // add current selected proyect to the task
            editedTask.addProyect(actualProyect.name);
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

export function listenEditAndRemoveBtns() {
    tasksContainer.addEventListener('click', (event) => {
        // verify if it is a remove button
        if (event.target.classList.contains('remove-btn')) {
            // remove task container
            event.target.parentNode.remove();
        }
        // verify if it is an edit button
        else if(event.target.classList.contains('edit-btn')) {
            // get the identificator class of the old task container
            let classes = event.target.parentNode.classList;
            // select old task
            oldTask = proyectsManager.proyects['Home'].tasks[classes[1]];
            fillEditFormWithTaskValues();
            displayEditForm();
        }
        else if(event.target.classList.contains('check-btn')) {
            // get the identificator class of the old task container
            let classes = event.target.parentNode.classList;
            // select current task
            let selectedTask = proyectsManager.proyects['Home'].tasks[classes[1]];
            // check task or uncheck task
            selectedTask.check(event.target);
        }
    });
}

// handle checking task

