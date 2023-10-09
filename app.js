// Define UL Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
  // DOM load event
   document.addEventListener('DOMContentLoaded', getTasks);
  // Add task event
  form.addEventListener('submit', addTask);
  //Remove task event
taskList.addEventListener('click', removeTask);
// Clear task event
clearBtn.addEventListener('click', clearTasks);
// Filter tasks event
filter.addEventListener('keyup', filterTasks);
}

// Get Tasks from LS
function getTasks() {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
//console.log(tasks);
  tasks.forEach(function(task){
    console.log(task);
    // Create li element
    const li = document.createElement('li');
  // Add class
  li.className = 'collection-item';
  // Create text node and append to li
  li.appendChild(document.createTextNode(task));
  // Create new link element
  const link = document.createElement('a');
  // Add class
  link.className = 'delete-item-secondary-content';
  // Add icon html
   link.innerHTML = '<i class="fa fa-remove" style="position: absolute; right: 0; padding-right: 5px; padding-top: 3px></i>';
  // Append the link to li
  li.appendChild(link);

  //Append the li to the UL
  taskList.appendChild(li);
  });
}

// Add Task
function addTask(e) {
  if(taskInput.value === '') {
    alert('Add a task');
  }

  // Create li element
  const li = document.createElement('li');
  // Add class
  li.className = 'collection-item';
  // Create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  // Create new link element
  const link = document.createElement('a');
  // Add class
  link.className = 'delete-item-secondary-content';
  // Add icon html
   link.innerHTML = '<i class="fa fa-remove" style="position: absolute; right: 0; padding-right: 5px; padding-top: 3px"></i>';
  // Append the link to li
  li.appendChild(link);

  //Append the li to the UL
  taskList.appendChild(li);

  // Store in LS
  storeTaskInLocalStorage(taskInput.value);


  // //Clear input
   taskInput.value = '';
 
   e.preventDefault();
}

// Store Task
function storeTaskInLocalStorage(task) {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Remove Task
function removeTask(e) {
   if(e.target.parentElement.classList.contains('delete-item-secondary-content')) { 
    if(confirm('Are you sure?')) {
      e.target.parentElement.parentElement.remove();

      //Remove from LS
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
   }
  }

  //Remove from LS
  function removeTaskFromLocalStorage(taskItem) {
    let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
      tasks.splice(index, 1);
    }
   });

   localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // Clear task
  function clearTasks() {
      //taskList.innerHTML = '';

    //faster

     while(taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
     }

     // Clear from LS
     clearTasksFromLocalStorage();

     // Clear tasks from LS
     function clearTasksFromLocalStorage() {
      localStorage.clear();
     }
  }

  //Filter tasks
  function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function(task) {
      const item = task.firstChild.textContent;
      if(item.toLowerCase().indexOf(text) != -1){
        task.style.display = 'block';
      } else {
        task.style.display = 'none';
      }
    });
  }

//  card.addEventListener(`mousemove`, runEvent);
//    function runEvent(e) {
//      console.log(`EVENT TYPE: ${e.type}`);

//      heading.textContent = `MouseX: ${e.offsetX} MouseY: ${e.offsetY}`;
//      document.body.style.backgroundColor = `rgb(${e.offsetX}, ${e.offsetY}, 40)`;
   