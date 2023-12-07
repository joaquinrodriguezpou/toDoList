export class Task {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.checked = false;
        this.checkBtn;
        this.taskContainer;
        this.proyect = [];
    }

    createContainer(){
        this.taskContainer = document.createElement('div');
        this.taskContainer.classList.add('task-container', this.title);
        
        const edit = document.createElement('button');
        edit.classList.add('edit-btn');
        edit.textContent = 'edit';
        
        const remove = document.createElement('button');
        remove.classList.add('remove-btn');
        remove.textContent = 'remove';

        this.checkBtn = document.createElement('button');
        this.checkBtn.classList.add('check-btn');

        const title = document.createElement('h1');
        const description = document.createElement('p');
        const dueDate = document.createElement('p');
        const priority = document.createElement('p');
    
        title.textContent = this.title;
        description.textContent = this.description;
        dueDate.textContent = this.dueDate;
        priority.textContent = this.priority;
        
        this.taskContainer.appendChild(this.checkBtn)
        this.taskContainer.appendChild(title);
        this.taskContainer.appendChild(description);
        this.taskContainer.appendChild(dueDate);
        this.taskContainer.appendChild(priority);
        this.taskContainer.appendChild(edit);
        this.taskContainer.appendChild(remove);
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
        } else if(this.checked) {
            this.checked = false;
            button.classList.add('unchecked-btn');
            button.classList.remove('checked-btn');
        }
    }

    addProyect(proyectName){
            this.proyect.push(proyectName);
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

    createContainer(){
        this.container = document.createElement('div');
        this.container.classList.add('proyect-container');
        this.container.id = this.name;
        this.container.style.display = 'none';
        const title = document.createElement('h1');
        title.textContent = this.name;   
        this.container.appendChild(title);
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
}
  
export const proyectsManager = new ProyectsManager();
  