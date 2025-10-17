
      const form = document.getElementById('todoForm');
    const taskInput = document.getElementById('taskInput');
    const todoList = document.getElementById('todoList');
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    form.addEventListener('submit', e => {
      e.preventDefault();
      const task = taskInput.value.trim();
      if (!task) return;
      tasks.push({ id: Date.now(), task, completed: false });
      localStorage.setItem('tasks', JSON.stringify(tasks));
      renderTasks();
      form.reset();
    });

    function renderTasks() {
      todoList.innerHTML = '';
      tasks.forEach(t => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
  const span = document.createElement('span');
        span.textContent = t.task;
        if (t.completed) span.classList.add('task-completed');
  const controls = document.createElement('div');
        controls.className = 'task-controls';

        const completeBtn = document.createElement('button');
        completeBtn.className = 'btn btn-sm btn-success';
        completeBtn.type = 'button';
        completeBtn.title = 'Toggle complete';
        completeBtn.innerHTML = t.completed ? '✔️' : '✅';
        completeBtn.onclick = () => toggleComplete(t.id);

        const editBtn = document.createElement('button');
        editBtn.className = 'btn btn-sm btn-secondary';
        editBtn.type = 'button';
        editBtn.title = 'Edit task';
        editBtn.innerHTML = '✏️';
        editBtn.onclick = () => editTask(t.id);

        const delBtn = document.createElement('button');
        delBtn.className = 'btn btn-sm btn-danger';
        delBtn.type = 'button';
        delBtn.title = 'Delete task';
        delBtn.innerHTML = '❌';
        delBtn.onclick = () => deleteTask(t.id);

        controls.appendChild(completeBtn);
        controls.appendChild(editBtn);
        controls.appendChild(delBtn);

        li.appendChild(span);
        li.appendChild(controls);
        todoList.appendChild(li);
      });
    }

    function deleteTask(id) {
      tasks = tasks.filter(t => t.id !== id);
      localStorage.setItem('tasks', JSON.stringify(tasks));
      renderTasks();
    }

    function toggleComplete(id) {
      tasks = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
      localStorage.setItem('tasks', JSON.stringify(tasks));
      renderTasks();
    }

    function editTask(id) {
      const t = tasks.find(x => x.id === id);
      if (!t) return;
      const newText = prompt('Edit task', t.task);
  if (newText === null) return;
      const trimmed = newText.trim();
      if (!trimmed) return alert('Task cannot be empty');
      tasks = tasks.map(x => x.id === id ? { ...x, task: trimmed } : x);
      localStorage.setItem('tasks', JSON.stringify(tasks));
      renderTasks();
    }

    renderTasks();
  