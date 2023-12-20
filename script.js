// Function to get a dynamic greeting based on the time of the day
function getGreeting() {
  const now = new Date();
  const hours = now.getHours();

  if (hours >= 5 && hours < 12) {
    return 'Good morning!';
  } else if (hours >= 12 && hours < 18) {
    return 'Good afternoon!';
  } else {
    return 'Good evening!';
  }
}

// Function to add a new task
function addTask() {
  const taskInput = document.getElementById('taskInput');
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  tasks.push({ text: taskInput.value, status: 'draft' });
  localStorage.setItem('tasks', JSON.stringify(tasks));

  renderTasks();
  taskInput.value = '';
}

// Function to toggle the status of a task (done, undone, draft)
function toggleTaskStatus(index) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  if (tasks[index].status === 'done') {
    tasks[index].status = 'undone';
  } else if (tasks[index].status === 'undone') {
    tasks[index].status = 'draft';
  } else {
    tasks[index].status = 'done';
  }

  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}

// Function to edit a task
function editTask(index) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const newText = prompt('Edit task:', tasks[index].text);

  if (newText !== null) {
    tasks[index].text = newText;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
  }
}

// Function to delete a task
function deleteTask(index) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.splice(index, 1);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}

// Function to show the detail page for a task
function showDetailPage(index) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const detailContent = document.getElementById('detailContent');

  detailContent.textContent = tasks[index].text;
  document.getElementById('detailPage').style.display = 'block';
  document.getElementById('overlay').style.display = 'block';
}

// Function to close the detail page
function closeDetailPage() {
  document.getElementById('detailPage').style.display = 'none';
  document.getElementById('overlay').style.display = 'none';
}

// Function to show the add task dialog
function showAddTaskDialog() {
  document.getElementById('addTaskDialog').style.display = 'block';
  document.getElementById('overlay').style.display = 'block';
}

// Function to handle the completion of adding a new task
function doneAddingTask() {
  const taskTitle = document.getElementById('taskTitle').value;

  if (taskTitle.trim() !== '') {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ text: taskTitle, status: 'draft' });
    localStorage.setItem('tasks', JSON.stringify(tasks));

    renderTasks();

    // Close the dialog
    document.getElementById('addTaskDialog').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';

    // Clear the input field
    document.getElementById('taskTitle').value = '';
  }
}

// Function to render the tasks on the page
function renderTasks() {
  const taskList = document.getElementById('taskList');
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  taskList.innerHTML = '';

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.textContent = task.text;

    if (task.status === 'done') {
      li.classList.add('completed');
    }

    li.onclick = () => showDetailPage(index);

    const markButton = document.createElement('button');
    markButton.textContent = 'Mark';
    markButton.onclick = () => toggleTaskStatus(index);

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.onclick = () => editTask(index);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = () => deleteTask(index);

    li.appendChild(markButton);
    li.appendChild(editButton);
    li.appendChild(deleteButton);

    taskList.appendChild(li);
  });

  // Update the greeting based on the time of the day
  const greetingElement = document.getElementById('greeting');
  greetingElement.textContent = getGreeting();
}

// Initial rendering when the page loads
renderTasks();

// Attach event listeners
document.getElementById('addTaskBtn').addEventListener('click', showAddTaskDialog);
