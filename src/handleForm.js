import { closeForm } from './formShowing.js';
import { Task, Proyect, proyectsManager } from './createClasses.js';
import { getStoredProyectName, storeProyect, getStoredTaskName, storeTaskName, storeTaskValues} from './localStorage.js';

export const tasksContainer = document.querySelector('.tasks-container');
export const proyectButtonsContainer = document.querySelector('.proyect-btns-container');
const taskForm = document.getElementById('taskForm');
const proyectForm = document.getElementById('proyectForm');
const editTaskForm = document.getElementById('edit-task-form');
const priorityBtns = document.querySelectorAll('.radios');

// define proyect to be shown
let proyectShown = 'Home';

 export function sayProyectShown(){
    return proyectShown;
}

const Home = new Proyect('Home');
    Home.createBtn();
    proyectButtonsContainer.insertBefore( Home.button, proyectButtonsContainer.firstChild)
    Home.createContainer();
    Home.appendProyectTo(tasksContainer)
    Home.container.style.display = 'flex';
    proyectsManager.addProyect(Home.name, Home);
    Home.button.classList.add('proyect-btn-selected');

export function createInitialElements() {
    const Proyect1 = new Proyect('Proyect1');
    Proyect1.createBtn();;
    Proyect1.appendBtnTo(proyectButtonsContainer);
    Proyect1.createContainer();
    Proyect1.appendProyectTo(tasksContainer)
    proyectsManager.addProyect(Proyect1.name, Proyect1);
    storeProyect(Proyect1)

    const clean = new Task('clean', 'gggg', '12/12', 'high');
    clean.addProyect(Home.name);
    clean.createContainer();
    Home.addTask(clean);
    clean.appendTaskTo(Home.container); 
    storeTaskName(clean.title);
    storeTaskValues(clean)
    console.log(clean.proyectsIn)
}

export function stylePriority(){
    priorityBtns.forEach(btn => {
        if(btn.checked){
            btn.nextElementSibling.style.backgroundColor = 'rgb(94, 181, 158)';
            btn.nextElementSibling.style.color = 'white';
        }
        else{
            btn.nextElementSibling.style.backgroundColor = '';
            btn.nextElementSibling.style.color = 'black'; 
        }
    });
}

priorityBtns.forEach(btn => {
    btn.addEventListener('change', () => {
        priorityBtns.forEach(btn => {
            if(btn.checked){
                btn.nextElementSibling.style.backgroundColor = 'rgb(94, 181, 158)';
                btn.nextElementSibling.style.color = 'white';
            }
            else{
                btn.nextElementSibling.style.backgroundColor = '';
                btn.nextElementSibling.style.color = 'black'; 
            }
        });
        
    })
});

export function addTask(){
    // listens to form when submited
    taskForm.addEventListener('submit', (event) => {
        // prevents page for refreshing
        event.preventDefault();
        createTask()
        closeForm();
        resetForm();
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
    proyectButtonsContainer.addEventListener('click', (event) => {
    if(event.target.tagName !== "BUTTON"){
        console.log(getStoredTaskName());
        return
    }
    // define selected proyect
    proyectShown = event.target.textContent;
    // select selected proyect
    let selectedProyect = document.getElementById(proyectShown);
    // select selected proyect button
    let selectedProyectBtn = document.getElementById(event.target.id);
    // hide all proyects containers
    Array.from(tasksContainer.children).forEach(child => {
        child.style.display = 'none'
    });
    // show selected proyect container 
    selectedProyect.style.display = 'flex';
    // select all proyercts buttons
    let proyectBtns = document.querySelectorAll('.proyect-btn');
    // remove all buttons style
    proyectBtns.forEach(element => {
        element.classList.remove('proyect-btn-selected')
    });
    // style selected proyect button
    selectedProyectBtn.classList.add('proyect-btn-selected');
})
}

export function resetForm() {
    taskForm.reset();
    priorityBtns.forEach(btn => {
        btn.checked = false;
        btn.nextElementSibling.style.backgroundColor = '';
        btn.nextElementSibling.style.color = 'black'; 
    })
}

function getTaskFormValues(){
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    let dueDate = document.getElementById('duedate').value;
    let radios = Array.from(document.querySelectorAll('.priority'));
    let priority = radios.find(radio => radio.checked).value;

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
    // add Home proyect to the task
    newTask.addProyect(proyectShown);
    // create task container
    newTask.createContainer();
    // add created task to current selected proyect
    selectedProyect.addTask(newTask);
    // append created task container to current selected proyect container
    newTask.appendTaskTo(selectedProyect.container);
    
    if(proyectShown !== 'Home') {
        // add task to home proyect
        Home.addTask(newTask); 
        // append created task container to Home container
        newTask.appendTaskTo(Home.container);   
        // add Home proyect to the task
        newTask.addProyect('Home');
        // newTask.taskContainer.id = newTask.title;
    };
    
    storeTaskName(newTask.title);
    storeTaskValues(newTask)
}

function createProyect() {
    // create proyect
    let newProyect = new Proyect(getProyectFormValues());
    // create proyect button
    newProyect.createBtn();
    // append proyect button
    newProyect.appendBtnTo(proyectButtonsContainer);
    // create proyect container to show tasks
    newProyect.createContainer();
    // append proyect container
    newProyect.appendProyectTo(tasksContainer)
    // add proyect to the proyects object
    proyectsManager.addProyect(newProyect.name, newProyect)
    // store proyect in localStorage
    storeProyect(newProyect)
}








