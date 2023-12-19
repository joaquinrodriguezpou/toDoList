import { displayEditForm, closeForm } from './formShowing.js';
import { Task, proyectsManager} from './createClasses.js';
import { stylePriority, sayProyectShown, showEmptyProyectSign, changeProyectShown } from './handleForm.js';
import { removeTaskName, storeTaskName, storeTaskValues, removeProyectName } from './localStorage.js';

const tasksContainer = document.querySelector('.tasks-container');
const editTaskForm = document.getElementById('edit-task-form');

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
    // add fist proyect
    editedTask.addProyect(oldTask.proyectsIn[0]);
    // if oldtask was in a second proyect, add second proyect to the task
    if(oldTask.proyectsIn[1]){
        editedTask.addProyect(oldTask.proyectsIn[1]);
    }
    // create edited task container
    editedTask.createContainer();
    // find in wich proyect is the task
    let proyectsIn = editedTask.proyectsIn;
        // iterate through each proyect the task is in
    proyectsIn.forEach(proyectIn => {
        // select actual proyect
        let actualProyect = proyectsManager.proyects[proyectIn];
        console.log(proyectsManager.proyects)
        console.log(proyectsManager.proyects[proyectIn])
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
    })
    storeTaskName(editedTask.title);
    storeTaskValues(editedTask);
    removeTaskName(oldTask.title);
    localStorage.removeItem(oldTask.title);
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
            let taskName = event.target.parentNode.classList.item(1);
            const actualProyect = sayProyectShown();
            const removedTask = proyectsManager.proyects['Home'].tasks[taskName];
            removedTask.proyectsIn.splice(removedTask.proyectsIn.indexOf(actualProyect), 1);
            storeTaskValues(removedTask);
            if(removedTask.proyectsIn.length === 0){
                removeTaskName(removedTask.title);
                localStorage.removeItem(removedTask.title);
            }
            if(sayProyectShown() !== 'Home') {
                showEmptyProyectSign();
            }
        }
        // verify if it is an edit button
        else if(event.target.classList.contains('edit-btn')) {
            // get the task name
            let taskName = event.target.parentNode.classList.item(1);
            // select current task
            oldTask = proyectsManager.proyects['Home'].tasks[taskName];
            fillEditFormWithTaskValues();
            // stylePriority();
            displayEditForm();
        }
        else if(event.target.classList.contains('check-btn')) {
            // get the task name
            let taskName = event.target.parentNode.classList.item(1);
            // select current task
            let selectedTask = proyectsManager.proyects['Home'].tasks[taskName];
            // check task or uncheck task
            selectedTask.check(event.target);
            // update task
            storeTaskValues(selectedTask);
        }
        else if(event.target.classList.contains('details-btn')) {
            // get the task name
            let taskName = event.target.parentNode.classList.item(1);
            // select current task
            let selectedTask = proyectsManager.proyects['Home'].tasks[taskName];
            // show details container
            selectedTask.showDetails();
        }
        else if(event.target.classList.contains('delete-proyect-btn')) {
            // delete proyect
            const deletedProyect = proyectsManager.proyects[sayProyectShown()];
            const deletedProyectBtn = document.getElementById(`${deletedProyect.name}Btn`);
            const deletedProyectContainer = document.getElementById(deletedProyect.name);
            deletedProyectBtn.remove();
            deletedProyectContainer.remove();
            changeProyectShown('Home');
            document.getElementById('Home').style.display = 'flex';
            document.getElementById('HomeBtn').classList.add('proyect-btn-selected');
            removeProyectName(deletedProyect.name);
        }
    });
}



