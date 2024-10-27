export function createTaskElement(taskList, taskText, priority, completed, time) {
  const taskItem = document.createElement('li');
  taskItem.className = priority;
  if (completed) {
    taskItem.classList.add('completed');
  }

  taskItem.innerHTML = `
    <div class="task-content">
      <input type="checkbox" aria-label="标记任务为完成" ${completed ? 'checked' : ''}>
      <span class="task-text">${taskText}</span>
      <span class="create-date">Added on: ${time}</span>
    </div>
    <div class="task-buttons">
      <button class="edit-button" aria-label="Edit">Edit</button>
      <button aria-label="Delete">Delete</button>
    </div>
  `;
  taskList.appendChild(taskItem);
}
