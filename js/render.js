// Rendering logic for Kanban Board
// Renders tasks into columns

import { getTasks } from './storage.js';
import { createElement } from './utils.js';
import { initDragDrop } from './dragdrop.js';

/**
 * Render all tasks into their columns
 */
export function renderBoard() {
    const tasks = getTasks();
    ['todo', 'inprogress', 'done'].forEach(status => {
        const col = document.getElementById(`${status}-tasks`);
        col.innerHTML = '';
        tasks.filter(t => t.status === status).forEach(task => {
            col.appendChild(renderTaskCard(task));
        });
    });
    initDragDrop();
}

/**
 * Render a single task card
 * @param {Object} task
 */
function renderTaskCard(task) {
    const card = createElement('div', {
        className: 'kanban-task',
        attrs: { 'data-id': task.id },
    });
    // Priority label
    const priorityLabel = createElement('span', {
        className: `priority-label priority-${task.priority || 'medium'}`,
        text: (task.priority || 'Medium').charAt(0).toUpperCase() + (task.priority || 'Medium').slice(1)
    });
    card.appendChild(priorityLabel);
    card.appendChild(createElement('strong', { text: task.title }));
    card.appendChild(createElement('div', { text: task.description }));

    // Edit & Delete buttons
    const actions = createElement('div', { className: 'task-actions' });

    const editBtn = createElement('button', {
        className: 'edit-btn',
        attrs: { type: 'button', title: 'Edit Task' },
        text: '✏️',
    });
    editBtn.addEventListener('click', () => {
        // Show custom modal for editing
        const modal = document.getElementById('edit-modal');
        modal.style.display = 'flex';
        document.getElementById('edit-title').value = task.title;
        document.getElementById('edit-desc').value = task.description;
        document.getElementById('edit-priority').value = task.priority || 'medium';
        modal.dataset.editId = task.id;
    });

    const deleteBtn = createElement('button', {
        className: 'delete-btn',
        attrs: { type: 'button', title: 'Delete Task' },
        text: '🗑️',
    });
    deleteBtn.addEventListener('click', () => {
        // Show custom modal for delete confirmation
        const modal = document.getElementById('delete-modal');
        modal.style.display = 'flex';
        document.getElementById('delete-task-title').textContent = `Are you sure you want to delete "${task.title}"?`;
        modal.dataset.deleteId = task.id;
    });

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);
    card.appendChild(actions);
    return card;
}
