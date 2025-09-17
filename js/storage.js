// Storage wrapper for Kanban Board
// Handles localStorage persistence

const STORAGE_KEY = 'kanban_tasks';

/**
 * Get all tasks from localStorage
 * @returns {Array}
 */
export function getTasks() {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
}

/**
 * Save all tasks to localStorage
 * @param {Array} tasks
 */
export function saveTasks(tasks) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

/**
 * Add a new task
 * @param {Object} task
 */
export function addTask(task) {
    const tasks = getTasks();
    tasks.push(task);
    saveTasks(tasks);
}

/**
 * Update a task's status
 * @param {string} id
 * @param {string} status
 */
export function updateTaskStatus(id, status) {
    const tasks = getTasks().map(t => t.id === id ? { ...t, status } : t);
    saveTasks(tasks);
}

/**
 * Edit a task's title, description, and priority
 * @param {string} id
 * @param {string} title
 * @param {string} description
 * @param {string} priority
 */
export function editTask(id, title, description, priority) {
    const tasks = getTasks().map(t => t.id === id ? { ...t, title, description, priority } : t);
    saveTasks(tasks);
}

/**
 * Delete a task by id
 * @param {string} id
 */
export function deleteTask(id) {
    const tasks = getTasks().filter(t => t.id !== id);
    saveTasks(tasks);
}
