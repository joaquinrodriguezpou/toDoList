import { closeForm } from './formShowing.js';
import { Task, Proyect } from './createClasses.js';

const tasksContainer = document.querySelector('.tasks-container');
const proyectButtons = document.querySelector('.proyect-btns-container');
const toDoForm = document.getElementById('toDoForm');
const proyectForm = document.getElementById('proyectForm');

// store proyects 
let proyects = {};

// define proyect to be shown
let proyectShown = 'Home';

// create and add "Home" proyect to proyect buttons container
const Home = new Proyect('Home');
Home.createBtn();
proyectButtons.insertBefore( Home.button, proyectButtons.firstChild)
Home.createContainer();
Home.appendProyectTo(tasksContainer)
Home.container.style.display = 'flex';
proyects[Home.name] = Home;

const joaquin = new Proyect('joaquin');
joaquin.createBtn();;
joaquin.appendBtnTo(proyectButtons);
joaquin.createContainer();
joaquin.appendProyectTo(tasksContainer)
proyects[joaquin.name] = joaquin;

const clean = new Task('clean', 'gggg', '12/12', 'alta');
clean.createContainer()
Home.addTask(clean);
clean.appendTaskTo(Home.container); 
console.log(clean)
console.log(Home.container)
console.log(Home)


// tell selected proyect
proyectButtons.addEventListener('click', (event) => {
    proyectShown = event.target.id;
    let selectedProyect = proyects[proyectShown];
    Array.from(tasksContainer.children).forEach(child => {
        child.style.display = 'none'
    });
    selectedProyect.container.style.display = 'flex';
})

function getToDoFormValues(){
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

export function createTask(){
    // listens to form when submited
    toDoForm.addEventListener('submit', (event) => {
    // prevents page for refreshing
    event.preventDefault();
    // create task
    let newTask = new Task(...getToDoFormValues());
    // add created task to current selected proyect
    proyects[proyectShown].addTask(newTask);
    // create task container
    newTask.createContainer();
    // add task to home proyect
    Home.addTask(newTask);
    // append created task container to Home container
    newTask.appendTaskTo(Home.container); 
    // append created task container to current selected proyect container
    newTask.appendTaskTo(proyects[proyectShown].container);
    closeForm();
    console.log(proyects[proyectShown]);
    console.log(proyects[proyectShown].container);
   
})
} 

export function createProyect(){
    // listens to form when submited
    proyectForm.addEventListener('submit', (event) => {
    // prevents page for refreshing
    event.preventDefault();
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
    proyects[newProyect.name] = newProyect;
    closeForm();
})
} 