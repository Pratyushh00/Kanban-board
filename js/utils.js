// Utility functions for Kanban Board
// Reusable DOM and storage helpers

/**
 * Create an element with classes and attributes
 * @param {string} tag
 * @param {object} options
 * @returns {HTMLElement}
 */
export function createElement(tag, options = {}) {
    const el = document.createElement(tag);
    if (options.className) el.className = options.className;
    if (options.attrs) {
        Object.entries(options.attrs).forEach(([key, val]) => {
            el.setAttribute(key, val);
        });
    }
    if (options.text) el.textContent = options.text;
    return el;
}

/**
 * Simple debounce utility
 * @param {Function} fn
 * @param {number} delay
 */
export function debounce(fn, delay) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
}
