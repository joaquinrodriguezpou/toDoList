import { entireForm, displayJustEntireForm, closeForm } from "./formShowing";
import { storeProyect } from "./localStorage";

export class Task {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.checked = false;
        this.checkBtn;
        this.taskContainer;
        this.proyectsIn = [];
        // create details container
        this.detailsBtn = document.createElement('button');
        this.detailsContainer = document.createElement('div');
        this.detailsContainer.classList.add('details-container');
        this.closeDetailsBtn = document.createElement('button');
        entireForm.appendChild(this.detailsContainer);
        
    }

    getValues(){
        return {
            title: this.title,
            description: this.description,
            dueDate: this.dueDate,
            priority: this.priority,
            proyectsIn: this.proyectsIn,
            checked: this.checked,
        };
    }

    createContainer(){
        this.taskContainer = document.createElement('div');
        this.taskContainer.classList.add('task-container', `${this.title}`);
        // this.taskContainer.id = this.title;

        this.checkBtn = document.createElement('button');
        const completed = document.createElement('p');
        const title = document.createElement('h1');
        const dueDate = document.createElement('p');
        const edit = document.createElement('button');
        const remove = document.createElement('button');
    
        this.checkBtn.classList.add('check-btn', 'unchecked-btn');
        completed.textContent = 'Completed';
        completed.classList.add('completed');
        title.textContent = this.title;
        dueDate.textContent = this.dueDate;
        edit.classList.add('edit-btn');
        remove.classList.add('remove-btn');
       
        this.taskContainer.appendChild(this.checkBtn);
        this.taskContainer.appendChild(title);
        this.taskContainer.appendChild(completed);
        this.taskContainer.appendChild(this.detailsBtn);
        this.taskContainer.appendChild(dueDate);
        this.taskContainer.appendChild(edit);
        this.taskContainer.appendChild(remove);

        // create details elements
        const titleDetail = document.createElement('h1');
        const proyectName = document.createElement('p');
        const priorityDetail = document.createElement('p');
        const dueDateDetail = document.createElement('p');
        const descriptionDetail = document.createElement('p');
        
        this.detailsBtn.textContent = 'DETAILS';
        this.detailsBtn.classList.add('details-btn')
        this.closeDetailsBtn.textContent = 'x';
        this.closeDetailsBtn.classList.add('close-details-btn');
        titleDetail.textContent = this.title;
        proyectName.textContent = `Proyect: ${this.proyectsIn[0]}`;
        priorityDetail.textContent = `Priority: ${this.priority}`;
        dueDateDetail.textContent = `Due Date: ${this.dueDate}`;
        descriptionDetail.textContent = `Description: ${this.description}`;

        this.detailsContainer.appendChild(this.closeDetailsBtn);
        this.detailsContainer.appendChild(titleDetail);
        this.detailsContainer.appendChild(proyectName);
        this.detailsContainer.appendChild(priorityDetail);
        this.detailsContainer.appendChild(dueDateDetail);
        this.detailsContainer.appendChild(descriptionDetail);

        if(this.checked) {
            this.checkBtn.classList.remove('unchecked-btn');
            this.checkBtn.classList.add('checked-btn');
            this.checkBtn.parentNode.querySelector('.completed').style.display = 'flex';
            this.checkBtn.parentNode.classList.add('task-completed');
        }
    }

    showDetails(){
        displayJustEntireForm();
        this.detailsContainer.style.display = 'flex';
        this.closeDetailsBtn.addEventListener('click', () => {
            this.detailsContainer.style.display = 'none';
            closeForm();
        })
    }

    appendTaskTo(container){
        container.appendChild(this.makeContainerCopy());
    }

    makeContainerCopy(){
        const taskContainerCopy = this.taskContainer.cloneNode(true);
        return taskContainerCopy;
    } 

    check(button) {
        if (this.checked === false) {
            this.checked = true;
            button.classList.remove('unchecked-btn');
            button.classList.add('checked-btn');
            button.parentNode.querySelector('.completed').style.display = 'flex';
            button.parentNode.classList.add('task-completed');
        } 
        else if(this.checked) {
            this.checked = false;
            button.classList.add('unchecked-btn');
            button.classList.remove('checked-btn');
            button.parentNode.querySelector('.completed').style.display = 'none';
            button.parentNode.classList.remove('task-completed');
        }
    }

    addProyect(proyectName){
            this.proyectsIn.push(proyectName);
        }
}

export class Proyect {
    constructor(name){
        this.name = name;
        this.buttonid = `${this.name}Btn`;
        this.tasks = {};
        this.button;
        this.container;
    }

    createBtn(){
        this.button = document.createElement('button');
        this.button.classList.add('proyect-btn');
        this.button.id = this.buttonid ;
        this.button.textContent = this.name;
    }

    createContainer() {
        // Crear el contenedor principal
        this.container = document.createElement('div');
        this.container.classList.add('proyect-container');
        this.container.id = this.name;
        this.container.style.display = 'none';

        // Crear el título del proyecto
        const title = document.createElement('h1');
        title.textContent = this.name;
        this.container.appendChild(title);

        // Crear el contenido dinámico utilizando const y let
        const emptyProjectSign = document.createElement('div');
        emptyProjectSign.classList.add('empty-proyect-sign');

        const heading = document.createElement('h3');
        heading.textContent = 'Empty Project';

        const paragraph = document.createElement('p');
        paragraph.textContent = 'Create a new to-do item or delete project.';

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-proyect-btn');
        deleteButton.textContent = 'DELETE PROJECT';

        // Agregar los elementos al contenedor principal
        emptyProjectSign.appendChild(heading);
        emptyProjectSign.appendChild(paragraph);
        emptyProjectSign.appendChild(deleteButton);

        // Agregar el contenido dinámico al contenedor principal
        this.container.appendChild(emptyProjectSign);
    }

    appendProyectTo(container){
        container.appendChild(this.container);
    }

    appendBtnTo(container){
        container.appendChild(this.button);
    }

    addTask(task) {
        this.tasks[task.title] = task;
    }

    removeTask(task) {
        delete this.tasks[task.title]
    } 

    logTasks(){
        console.log(this.tasks)
    }
}

class ProyectsManager {
    constructor() {
      this.proyects = {};
    }
  
    addProyect(name, proyect) {
      this.proyects[name] = proyect;
    }

    getProjects() {
        return Object.values(this.projects);
    }
}
  
export const proyectsManager = new ProyectsManager();
  