import { createTaskElement } from './dom.js';

export function loadTasks(taskList) {
  const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  savedTasks.forEach(task => createTaskElement(taskList, task.text, task.priority, task.completed, task.dueDate));
}

export function saveTasks(taskList) {
  const tasks = Array.from(taskList.querySelectorAll('li')).map(li => {
    const taskText = li.querySelector('span').textContent.trim();
    const priority = li.classList.contains('high') ? 'high' : li.classList.contains('medium') ? 'medium' : 'low';
    const completed = li.classList.contains('completed');
    const dueDate = li.querySelector('.due-date').textContent;
    return { text: taskText, priority: priority, completed: completed, dueDate: dueDate };
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
