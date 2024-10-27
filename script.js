// script.js
// 当页面加载完成时，执行以下代码。
document.addEventListener('DOMContentLoaded', () => {
  const taskList = document.getElementById('taskList');
  const taskInput = document.getElementById('taskInput');

  // 页面加载时调用 loadTasks() 函数，从 localStorage 中获取并展示保存的任务。
  loadTasks();

  // 为添加任务按钮添加点击事件监听器，当点击按钮时调用 addTask 函数。
  document.querySelector('.input-container button').addEventListener('click', addTask);

  // 事件委托处理任务列表中的事件
  taskList.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
      deleteTask(event.target);
    } else if (event.target.type === 'checkbox') {
      toggleTask(event.target);
    }
  });

  function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(task => createTaskElement(task.text, task.priority));
  }

  function saveTasks() {
    const tasks = Array.from(taskList.querySelectorAll('li')).map(li => {
      const taskText = li.querySelector('span').textContent.trim();
      const priority = li.classList.contains('high') ? 'high' : li.classList.contains('medium') ? 'medium' : 'low';
      return { text: taskText, priority: priority };
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  function addTask() {
    const taskText = taskInput.value.trim();
    const priority = document.getElementById('prioritySelect').value;
    if (taskText === '') {
      alert('Please enter a task!');
      return;
    }
    createTaskElement(taskText, priority);
    taskInput.value = '';
    saveTasks();
  }

  function createTaskElement(taskText, priority) {
    const listItem = document.createElement('li');
    listItem.classList.add(priority); // 添加优先级作为类名
    listItem.innerHTML = `
      <input type="checkbox" aria-label="Mark task as completed">
      <span>${taskText}</span>
      <button aria-label="Delete task">Delete</button>
    `;
    taskList.appendChild(listItem);
  }

  function deleteTask(button) {
    button.parentElement.remove();
    saveTasks();
  }

  function toggleTask(checkbox) {
    const taskText = checkbox.nextElementSibling;
    taskText.style.textDecoration = checkbox.checked ? 'line-through' : 'none';
    saveTasks();
  }
});
