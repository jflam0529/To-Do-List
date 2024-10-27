    import { loadTasks, saveTasks } from './storage.js';
    import { createTaskElement } from './dom.js';

    // 从HTML里面取各种元素ID进行操作，初始化
    document.addEventListener('DOMContentLoaded', () => {
    const taskList = document.getElementById('taskList');
    const taskInput = document.getElementById('taskInput');
    const prioritySelect = document.getElementById('prioritySelect');
    const addTaskButton = document.getElementById('addTaskButton');
    const deleteAllButton = document.getElementById('deleteAll');

    // 加载浏览器临时存储的tasks
    loadTasks(taskList);

    // 排序任务列表
    sortTasks(taskList);

    // 监听添加任务的click，并且将内容保存到浏览器临时存储，然后更新页面
    addTaskButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        const priority = prioritySelect.value;
        if (taskText === '') {
            alert('Please enter a task!');
            return;
        }
        const currentTime = new Date().toLocaleDateString();
        createTaskElement(taskList, taskText, priority, false, currentTime);
        sortTasks(taskList);
        taskInput.value = '';
        saveTasks(taskList);
    });

    // 监听任务列表的点击事件，删除任务或者标记任务完成。因为tasklist里面有两种button，所以要判断event.target
    taskList.addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON') {
            if (event.target.classList.contains('edit-button')) {
                // 编辑按钮的功能
                const taskContent = event.target.parentElement.querySelector('.task-text');
                const timeSpan = event.target.parentElement.querySelector('.create-date');
                const newTaskText = prompt('Edit your task:', taskContent.textContent);
                if (newTaskText !== null) {
                    taskContent.textContent = newTaskText;
                    const currentTime = new Date().toLocaleDateString(); // 获取当前时间
                    timeSpan.textContent = `Updated on: ${currentTime}`; // 更新时间显示
                    saveTasks(taskList); // 保存更新后的任务列表
                }
            } else {
                // 删除按钮的功能
                event.target.parentElement.remove();
                saveTasks(taskList);
            }
        } else if (event.target.type === 'checkbox') {
            const listItem = event.target.parentElement;
            listItem.classList.toggle('completed', event.target.checked);
            sortTasks(taskList);
            saveTasks(taskList);
        }
    });
    
    // 监听删除所有任务的click，删除所有任务，并且更新浏览器临时存储
    deleteAllButton.addEventListener('click', () => {
        taskList.innerHTML = '';
        saveTasks(taskList);
    });

    // 初始化 select 标签颜色
    prioritySelect.style.background = 'linear-gradient(135deg, #d4edda, #c3e6cb)';
    
    // 改变 select 标签的颜色
    prioritySelect.addEventListener('change', () => {
    const colorMap = {
        low: 'linear-gradient(135deg, #d4edda, #c3e6cb)',
        medium: 'linear-gradient(135deg, #fff3cd, #ffeeba)',
        high: 'linear-gradient(135deg, #f8d7da, #f5c6cb)'
    };
    prioritySelect.style.background = colorMap[prioritySelect.value];
    });

});

// 排序任务列表
function sortTasks(taskList) {
    const tasks = Array.from(taskList.children);
    tasks.sort((a, b) => {
        const aCompleted = a.classList.contains('completed') ? 1 : 0;
        const bCompleted = b.classList.contains('completed') ? 1 : 0;

        // 先按完成状态排序，未完成的在前
        if (aCompleted !== bCompleted) {
            return aCompleted - bCompleted;
        }

        // 如果都是未完成的任务，按优先级排序
        if (aCompleted === 0 && bCompleted === 0) {
            const priorityOrder = { high: 1, medium: 2, low: 3 };
            return priorityOrder[a.classList[0]] - priorityOrder[b.classList[0]];
        }

        // 如果都是已完成的任务，按它们在列表中的顺序排列
        return 0; // 保持原有顺序
    });
    tasks.forEach(task => taskList.appendChild(task));
}
