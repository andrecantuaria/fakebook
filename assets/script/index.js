'use strict';

// Utility functions utility-functions.js
function onEvent(event, selector, callback) {
    return selector.addEventListener(event, callback);
}

function getElement(selector, parent = document) {
    return parent.getElementById(selector);
}

function select(selector, parent = document) {
    return parent.querySelector(selector);
}

function selectAll(selector, parent = document) {
    return [...parent.querySelectorAll(selector)];
}

// Classes user.js

// Parent
class User {
    #id;
    #name;
    #userName;
    #email;

    constructor(id, name, userName, email) {
        this.#id = id;
        this.#name = name;
        this.#userName = userName;
        this.#email = email;
    }

    get id() { return this.#id; }
    get name() { return this.#name; }
    get userName() { return this.#userName; }
    get email() { return this.#email; }

    getInfo() {
        return {
            id: this.#id,
            name: this.#name,
            userName: this.#userName,
            email: this.#email
        };
    }
}

// Child
class Subscriber extends User {
    #pages;
    #groups;
    #canMonetize;

    constructor(id, name, userName, email, pages, groups, canMonetize) {
        super(id, name, userName, email);
        this.#pages = pages;
        this.#groups = groups;
        this.#canMonetize = canMonetize;
    }

    get pages() { return this.#pages; }
    get groups() { return this.#groups; }
    get canMonetize() { return this.#canMonetize; }

    getInfo() {
        return {
            ...super.getInfo(),
            pages: this.#pages,
            groups: this.#groups,
            canMonetize: this.#canMonetize
        };
    }
}

const user = new Subscriber(
    '1001',
    'Andre Cantuaria',
    'aplusc',
    'acantuaria@email.com',
    ['Tech Insights', 'Travel Journals', 'Fitness Focus', 'Foodie Delights'],
    ['Tech Trends & Innovations', 'Adventure Explorers', 'Fitness Enthusiasts', 'Artistic Expressions Guild'],
    true
);

// Main Code index.js

// DOM Elements
const profile = select('.profile');
const fullName = select('.name');
const userName = select('.username');
const pages = select('.pages');
const groups = select('.groups');

// Modal

onEvent('DOMContentLoaded', document, function () {
    const profileButton = select('.profile');
    onEvent('click', profileButton, openModal);
});

// Open the modal
function openModal() {
    const modal = getElement('myModal');
    modal.style.display = 'flex';

// Display user info
    const userInfo = user.getInfo();
    fullName.innerHTML = `<p><strong>Name:</strong> ${userInfo.name}</p>`;
    userName.innerHTML = `<p><strong>Username:</strong> ${userInfo.userName}</p>`;
    pages.innerHTML = `<p><strong>Pages:</strong> ${userInfo.pages.join(', ')}</p>`;
    groups.innerHTML = `<p><strong>Groups:</strong>${userInfo.groups.join(', ')}`;
}

// Close the modal
function closeModal() {
    const modal = getElement('myModal');
    modal.style.display = 'none';
}

// Close the modal if the overlay is clicked
onEvent('click', window, function (event) {
    const modal = getElement('myModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});
