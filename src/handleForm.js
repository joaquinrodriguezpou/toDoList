import { closeForm } from './formShowing.js';
import { Task, Proyect } from './createClasses.js';
import { proyectsManager } from './createClasses.js';

const tasksContainer = document.querySelector('.tasks-container');
const proyectButtons = document.querySelector('.proyect-btns-container');
const taskForm = document.getElementById('taskForm');
const proyectForm = document.getElementById('proyectForm');
const editTaskForm = document.getElementById('edit-task-form');

// define proyect to be shown
let proyectShown = 'Home';

// create and add "Home" proyect to proyect buttons container
const Home = new Proyect('Home');
Home.createBtn();
proyectButtons.insertBefore( Home.button, proyectButtons.firstChild)
Home.createContainer();
Home.appendProyectTo(tasksContainer)
Home.container.style.display = 'flex';
proyectsManager.addProyect(Home.name, Home);

const joaquin = new Proyect('joaquin');
joaquin.createBtn();;
joaquin.appendBtnTo(proyectButtons);
joaquin.createContainer();
joaquin.appendProyectTo(tasksContainer)
proyectsManager.addProyect(joaquin.name, joaquin);
console.log(proyectsManager.proyects)

const clean = new Task('clean', 'gggg', '12/12', 'alta');
clean.createContainer()
Home.addTask(clean);
clean.appendTaskTo(Home.container); 
clean.addProyect(Home.name)
console.log(clean)

export function addTask(){
    // listens to form when submited
    taskForm.addEventListener('submit', (event) => {
        // prevents page for refreshing
        event.preventDefault();
        createTask()
        closeForm();
    })
} 

export function addProyect(){
    // listens to form when submited
    proyectForm.addEventListener('submit', (event) => {
        // prevents page for refreshing
        event.preventDefault();
        createProyect();
        closeForm();
    })
} 

export function showSelectedProyect(){
    proyectButtons.addEventListener('click', (event) => {
    console.log('worksss')
    // define selected proyect
    proyectShown = event.target.textContent;
    // select selected proyect
    let selectedProyect = document.getElementById(proyectShown);
    // hide all proyects containers
    Array.from(tasksContainer.children).forEach(child => {
        child.style.display = 'none'
    });
    // show selected proyect container 
    selectedProyect.style.display = 'flex';
})
}

function getTaskFormValues(){
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    let dueDate = document.getElementById('duedate').value;
    let priority = document.getElementById('priority').value;

    return [ 
        title,
        description,
        dueDate,
        priority,
    ]
}

function getProyectFormValues(){
    let name = document.getElementById('name').value;
    return name
}

function createTask(){
    // create task
    let newTask = new Task(...getTaskFormValues());
    // select current selected proyect
    let selectedProyect = proyectsManager.proyects[proyectShown]
    // create task container
    newTask.createContainer();
    // add created task to current selected proyect
    selectedProyect.addTask(newTask);
    // append created task container to current selected proyect container
    newTask.appendTaskTo(selectedProyect.container);
    // add current selected proyect to the task
    newTask.addProyect(selectedProyect.name);
    

    if(proyectShown !== 'Home') {
        // add task to home proyect
        Home.addTask(newTask); 
        // append created task container to Home container
        newTask.appendTaskTo(Home.container);   
        // add Home proyect to the task
        newTask.addProyect('Home');
        // newTask.taskContainer.id = newTask.title;
    };
}

function createProyect() {
    // create proyect
    let newProyect = new Proyect(getProyectFormValues());
    // create proyect button
    newProyect.createBtn();
    // append proyect button
    newProyect.appendBtnTo(proyectButtons);
    // create proyect container to show tasks
    newProyect.createContainer();
    // append proyect container
    newProyect.appendProyectTo(tasksContainer)
    // add proyect to the proyects object
    proyectsManager.addProyect(newProyect.name, newProyect)
}








