let tasks = []; // arr basico para armazenar as tarefas

// Elementos do DOM
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addTaskBtn');
const tasksList = document.getElementById('tasksList');

/**
 * @returns {void}
 * Adiciona uma nova tarefa à lista de tarefas.
 * Verifica se o campo de entrada não está vazio antes de adicionar.
 */
function addTask() {
    const text = taskInput.value.trim();

    if (text.length === 0) {
        alert('Digite uma tarefa!');
        return;
    }
    
    const task = {
        id: Date.now(),
        text: text,
        completed: false
    };
    
    tasks.push(task);
    taskInput.value = '';
    showTasks();
}

/**
 * Exibe a lista de tarefas no DOM.
 * Se não houver tarefas, exibe uma mensagem informando.
 */
function showTasks() {
    tasksList.innerHTML = '';
    
    if (tasks.length === 0) {
        tasksList.innerHTML = '<p>Nenhuma tarefa ainda. Adicione uma!</p>';
        return;
    }
    
    tasks.forEach(task => {
        const taskDiv = document.createElement('div'); 
        taskDiv.innerHTML = `
            <input type="checkbox" ${task.completed ? 'checked' : ''} 
                   onchange="toggleTask(${task.id})">
            <span style="${task.completed ? 'text-decoration: line-through' : ''}">${task.text}</span>
            <button onclick="deleteTask(${task.id})">Excluir</button>
        `;
        tasksList.appendChild(taskDiv);
    });
}

/**
 * Alterna o estado de conclusão de uma tarefa.
 * @param {Number} id 
 */
function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        showTasks();
    }
}

/**
 * Exclui uma tarefa da lista.
 * @param {Number} id 
 */
function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    showTasks();
}
/**
 * Adiciona eventos ao botão de adicionar tarefa e ao campo de entrada.
 * Permite adicionar tarefas ao pressionar Enter.
 * @returns {void}
 */
addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Exibe as tarefas ao carregar a página
showTasks();