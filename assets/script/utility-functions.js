// Utility functions 
export function onEvent(event, selector, callback) {
    return selector.addEventListener(event, callback);
}

export function getElement(selector, parent = document) {
    return parent.getElementById(selector);
}

export function select(selector, parent = document) {
    return parent.querySelector(selector);
}

export function selectAll(selector, parent = document) {
    return [...parent.querySelectorAll(selector)];
}