// Event handling for Kanban Board
// Handles form submission and board updates

import { addTask } from './storage.js';
import { renderBoard } from './render.js';

/**
 * Initialize event listeners
 */
export function initEvents() {
    document.getElementById('task-form').addEventListener('submit', e => {
        e.preventDefault();
        const title = document.getElementById('task-title').value.trim();
        const desc = document.getElementById('task-desc').value.trim();
        const priority = document.getElementById('task-priority').value;
        if (!title || !desc || !priority) return;
        addTask({
            id: Date.now().toString(),
            title,
            description: desc,
            priority,
            status: 'todo',
        });
        e.target.reset();
        renderBoard();
    });
}
