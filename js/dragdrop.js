// Drag & Drop logic for Kanban Board
// Handles drag events for task cards

import { updateTaskStatus } from './storage.js';
import { renderBoard } from './render.js';

/**
 * Initialize drag & drop for all columns
 */
export function initDragDrop() {
    document.querySelectorAll('.kanban-task').forEach(card => {
        card.setAttribute('draggable', 'true');
        card.addEventListener('dragstart', handleDragStart);
        card.addEventListener('dragend', handleDragEnd);
    });

    document.querySelectorAll('.kanban-tasks').forEach(col => {
        col.addEventListener('dragover', handleDragOver);
        col.addEventListener('drop', handleDrop);
    });
}

let draggedId = null;

function handleDragStart(e) {
    draggedId = e.target.dataset.id;
    e.target.classList.add('dragging');
}

function handleDragEnd(e) {
    e.target.classList.remove('dragging');
    draggedId = null;
}

function handleDragOver(e) {
    e.preventDefault();
}

function handleDrop(e) {
    e.preventDefault();
    const status = e.currentTarget.id.replace('-tasks', '');
    if (draggedId) {
        updateTaskStatus(draggedId, status);
        renderBoard();
    }
}
