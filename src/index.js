import { Task } from './toDo.js'

const tasksContainer = document.querySelector('.tasks-container');

function createTaskContainer(task){
    console.log('it works 2');
    const taskContainer = document.createElement('div');
    taskContainer.classList.add('task-container');
    taskContainer.id = task.title;

    const title = document.createElement('h1');
    const description = document.createElement('p');
    const dueDate = document.createElement('p');
    const priority = document.createElement('p');

    title.textContent = task.title;
    description.textContent = task.description;
    dueDate.textContent = task.dueDate;
    priority.textContent = task.priority;

    taskContainer.appendChild(title);
    taskContainer.appendChild(description);
    taskContainer.appendChild(dueDate);
    taskContainer.appendChild(priority);

    return taskContainer;
}

document.getElementById('todoForm').addEventListener('submit', (event) => {
    console.log('it works 1');
    event.preventDefault();
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    let dueDate = document.getElementById('duedate').value;
    let priority = document.getElementById('priority').value;
    let newTask = new Task(title, description, dueDate, priority);
    tasksContainer.appendChild(createTaskContainer(newTask));
    console.log(newTask) 
    newTask.editProperty('title', 'newtitle');
})

