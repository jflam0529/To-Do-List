const { JSDOM } = require('jsdom');

// 创建一个虚拟的 HTML 文档
const dom = new JSDOM(`
<!DOCTYPE html>
<html>
<body>
    <ul id="taskList">
        <li><span>Task 1</span></li>
        <li><span>Task 2</span></li>
    </ul>
    <input id="taskInput" />
</body>
</html>
`);

// 获取 document 对象
const document = dom.window.document;

// 进行 DOM 操作
const taskList = document.getElementById('taskList');
const taskInput = document.getElementById('taskInput');

const tasks = Array.from(taskList.querySelectorAll('ul'));
console.log(tasks);
