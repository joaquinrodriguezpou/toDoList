export class Task {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.checked = undefined;
        this.taskContainer;
        this.edit;
        this.remove;
        this.proyect = [];
    }

    createContainer(){
        this.taskContainer = document.createElement('div');
        this.taskContainer.classList.add('task-container', this.title);
        
        this.edit = document.createElement('button');
        this.edit.classList.add('edit-btn');
        this.edit.textContent = 'edit';
        
        this.remove = document.createElement('button');
        this.remove.classList.add('remove-btn');
        this.remove.textContent = 'remove';
        
        // doesnt work
        // this.remove.addEventListener('click', () => this.removeTask());
        // this.remove.addEventListener = () => {
        //     this.removeTask();
        // };

        const title = document.createElement('h1');
        const description = document.createElement('p');
        const dueDate = document.createElement('p');
        const priority = document.createElement('p');
    
        title.textContent = this.title;
        description.textContent = this.description;
        dueDate.textContent = this.dueDate;
        priority.textContent = this.priority;
    
        this.taskContainer.appendChild(title);
        this.taskContainer.appendChild(description);
        this.taskContainer.appendChild(dueDate);
        this.taskContainer.appendChild(priority);
        this.taskContainer.appendChild(this.edit);
        this.taskContainer.appendChild(this.remove);
    }

    appendTaskTo(container){
        container.appendChild(this.makeContainerCopy());
    }

    addProyect(proyectName){
        this.proyect.push(proyectName);
    }

    makeContainerCopy(){
        const taskContainerCopy = this.taskContainer.cloneNode(true);
        return taskContainerCopy;
    }

    editProperty(property, newproperty){
        this[property] = newproperty;
    }

    removeTask() {
        if (this.taskContainer) {
            this.taskContainer.remove();
        }
    }

    getValues() {
        return {
            title: this.title,
            description: this.description,
            duedate: this.duedate,
            priority: this.priority,
        };
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
