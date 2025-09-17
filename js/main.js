// Main entry for Kanban Board
// Initializes app modules

import { renderBoard } from './render.js';
import { initEvents } from './events.js';

// Initialize app
window.addEventListener('DOMContentLoaded', () => {
    renderBoard();
    initEvents();

    // Modal edit form logic
    const editModal = document.getElementById('edit-modal');
    const editForm = document.getElementById('edit-task-form');
    const cancelEditBtn = document.getElementById('cancel-edit');

    editForm.addEventListener('submit', e => {
        e.preventDefault();
        const id = editModal.dataset.editId;
        const title = document.getElementById('edit-title').value.trim();
        const desc = document.getElementById('edit-desc').value.trim();
        const priority = document.getElementById('edit-priority').value;
        if (!title || !desc || !priority) return;
        import('./storage.js').then(({ editTask }) => {
            editTask(id, title, desc, priority);
            editModal.style.display = 'none';
            import('./render.js').then(({ renderBoard }) => renderBoard());
        });
    });

    cancelEditBtn.addEventListener('click', () => {
        editModal.style.display = 'none';
    });

    // Modal delete logic
    const deleteModal = document.getElementById('delete-modal');
    const confirmDeleteBtn = document.getElementById('confirm-delete');
    const cancelDeleteBtn = document.getElementById('cancel-delete');

    confirmDeleteBtn.addEventListener('click', () => {
        const id = deleteModal.dataset.deleteId;
        import('./storage.js').then(({ deleteTask }) => {
            deleteTask(id);
            deleteModal.style.display = 'none';
            import('./render.js').then(({ renderBoard }) => renderBoard());
        });
    });

    cancelDeleteBtn.addEventListener('click', () => {
        deleteModal.style.display = 'none';
    });
});
