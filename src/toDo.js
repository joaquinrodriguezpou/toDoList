export class Task {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.checked = undefined;
    }
    editProperty(property, newproperty){
        this[property] = newproperty;
    }
}

class Proyect {
    constructor(name){
        this.name = name;
        this.tasks = {};
    }

    addTask(task) {
        this.tasks[task.title] = task;
    }

    removeTask(task) {
        delete this.tasks[task]
    }

    logTasks(){
        console.log(this.tasks)
    }
}

const task1 = new Task('clean', 'clean the bathroom', '13/10', 'low');
const proyect1 = new Proyect('proyectone');


console.log(task1);

task1.editProperty('title', 'exercise');

console.log(task1);

proyect1.addTask(task1);
proyect1.logTasks();