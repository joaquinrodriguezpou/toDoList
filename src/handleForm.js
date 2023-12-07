import { closeForm, displayEditForm } from './formShowing.js';
import { Task, Proyect } from './createClasses.js';

const tasksContainer = document.querySelector('.tasks-container');
const proyectButtons = document.querySelector('.proyect-btns-container');
const taskForm = document.getElementById('taskForm');
const proyectForm = document.getElementById('proyectForm');
const editTaskForm = document.getElementById('edit-task-form');
const editProyectForm = document.getElementById('edit-proyect-form');

// store proyects 
let proyects = {};

// define proyect to be shown
let proyectShown = 'Home';

// store task that is being edited
let oldTask;

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

export function createTask(){
    // listens to form when submited
    taskForm.addEventListener('submit', (event) => {
        // prevents page for refreshing
        event.preventDefault();
        // create task
        let newTask = new Task(...getToDoFormValues());
        // select current selected proyect
        let selectedProyect = proyects[proyectShown]
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
        console.log(newTask.proyect)
        console.log(selectedProyect.name)
        closeForm();
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



export function createEditedTask(){
    // listens to edit task form when submited
    editTaskForm.addEventListener('submit', (event) => {
    // prevents page for refreshing
    event.preventDefault();
    // create edited task 
    let editedTask = new Task(...getEditTaskValues());
    // create edited task container
    editedTask.createContainer();
    // find in wich proyect is the task
    let proyectsIn = oldTask.proyect;
        // iterate through each proyect the task is in
        proyectsIn.forEach(proyect => {
            // select actual proyect
            let actualProyect = proyects[proyect];
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
            console.log(editedTask)
            console.log(actualProyect.name)
        })
    closeForm();
})
}


export function editAndRemoveBtns() {
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
            oldTask = proyects['Home'].tasks[classes[1]];
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
            displayEditForm();
        }
    });
}


