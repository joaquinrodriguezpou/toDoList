import { createInitialElements } from "../src/handleForm";
import { Task, Proyect, proyectsManager } from './createClasses';
import { proyectButtonsContainer, tasksContainer } from './handleForm';

// localStorage.removeItem('proyectNames')
// localStorage.removeItem('taskNames')
// localStorage.clear();


window.addEventListener('load', () => {
    if (localStorage.getItem('proyectNames') || localStorage.getItem('taskNames')) {
        console.log('the user has already been here')
        loadProyects();
        loadTasks();
        console.log(getStoredTaskName())
        console.log(getStoredProyectName())
        console.log(proyectsManager)
    } 
    else {
        console.log('the user has never been here')
        createInitialElements();
        // console.log(localStorage.getItem('proyectNames'))
    }
});

export function rewriteTask(newTask, oldTask) {
    // Get the task values
    const newTaskValues = newTask.getValues();
    const oldTaskValues = oldTask.getValues();
    // Update the task values
    newTaskValues.title = oldTaskValues.title;
    newTaskValues.description = oldTaskValues.description;
    newTaskValues.duedate = oldTaskValues.duedate;
    newTaskValues.priority = oldTaskValues.priority;
  
    // Store the task values in localStorage
    storeTaskValues(newTask);
  }

function circularReplacer() {
const seen = new WeakSet();
return (_, value) => {
    if (typeof value === 'object' && value !== null) {
    if (seen.has(value)) {
        return; // Evitar la referencia circular
    }
    seen.add(value);
    }
    return value;
};
}

export function storeTaskValues(task) {
    const taskValues = task.getValues();
    const jsonString = JSON.stringify(taskValues, circularReplacer(), 2);
    localStorage.setItem(task.title, jsonString);
}


export function storeTaskName(task) {
    const taskNames = getStoredTaskName();
    taskNames.push(task);
    localStorage.setItem('taskNames', JSON.stringify(taskNames));
}

export function getStoredTaskValues(taskName){
    const taskValues = localStorage.getItem(taskName)
    return JSON.parse(taskValues)
}

export function getStoredTaskName() {
    const taskNames = (localStorage.getItem('taskNames')); 
    return taskNames ? JSON.parse(taskNames) : [];;
}

function loadProyects() {
    let storedProyects = getStoredProyectName();
    storedProyects.forEach(proyect => {
        // create proyect
        let loadedProyect = new Proyect(proyect);
        // create proyect button
        loadedProyect.createBtn();
        // append proyect button
        loadedProyect.appendBtnTo(proyectButtonsContainer);
        // create proyect container to show tasks
        loadedProyect.createContainer();
        // append proyect container
        loadedProyect.appendProyectTo(tasksContainer)
        // add proyect to the proyects object
        proyectsManager.addProyect(loadedProyect.name, loadedProyect)
        // store proyect in localStorage
    })
}

function loadTasks() {
    let storedTasks = getStoredTaskName();
    storedTasks.forEach(task => {
        let values = getStoredTaskValues(task);
        // create task
        let loadedTask = new Task( values.title, values.description, values.duedate, values.priority );
        // add proyects
        loadedTask.proyectsIn = values.proyectsIn
        // add check value
        loadedTask.checked = values.checked;

        // create task container
        loadedTask.createContainer();

        // loaded task proyects in
        let proyectsIn = values.proyectsIn;

        proyectsIn.forEach(proyectIn => {
            let selectedProyect = proyectsManager.proyects[proyectIn];
            // console.log(proyectsManager.proyects)
            // console.log(proyect)
            // console.log(proyectsManager.proyects[proyect])
            // add created task to current selected proyect
            selectedProyect.addTask(loadedTask);
            // append created task container to current selected proyect container
            loadedTask.appendTaskTo(selectedProyect.container);

            if(loadedTask.checked){
                const loadedTaskContainer = document.querySelector(`.${loadedTask.title}`);
                const checkBtn = loadedTaskContainer.querySelector('.check-btn');
                checkBtn.classList.remove('unchecked-btn');
                checkBtn.classList.add('checked-btn');
                checkBtn.parentNode.querySelector('.completed').style.display = 'flex';
                checkBtn.parentNode.classList.add('task-completed');
            }
        })

        
    })
}

export function getStoredProyectName() {
    const proyectNames = localStorage.getItem('proyectNames'); 
    return proyectNames ? JSON.parse(proyectNames) : [];
}

export function storeProyect(project) {
    const proyectNames = getStoredProyectName();
    proyectNames.push(project.name);
    localStorage.setItem('proyectNames', JSON.stringify(proyectNames));
}

export function removeTaskName(taskName) {
    const taskNames = getStoredTaskName();
    const index = taskNames.indexOf(taskName);

    if (index !== -1) {
      taskNames.splice(index, 1); 
    }

    localStorage.setItem('taskNames', JSON.stringify(taskNames)); 
    console.log(getStoredTaskName())
}

export function removeProyectName(proyectName) {
    const proyectNames = getStoredProyectName();
    const index = proyectNames.indexOf(proyectName);

    if (index !== -1) {
        proyectNames.splice(index, 1); 
    }

    localStorage.setItem('proyectNames', JSON.stringify(proyectNames)); 
    console.log(getStoredProyectName())
}
  