'use strict';

// utility functions utility-functions.js
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

// parent
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
        return `${this.#id} ${this.#name} ${this.#userName} ${this.#email}`;
    }
}

// child
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
        return `${this.#pages} ${this.#groups} ${this.#canMonetize}`;
    }
}

const user = new Subscriber(
    '1',
    'Joe Doe',
    'jdoe',
    'jdoe@email.com',
    ['Page1', 'Page 2', 'Page 3'], 
    ['Group 1', 'Group 2', 'Group 3'], 
    true
  );

// Main Code index.js

console.log(user.id)

const userInfo = select('.user-info');
userInfo.innerHTML = user.getInfo();


// DOM Elements
const profile = select('.profile');
const input = select('.input');
const uploadImgBtn = select('.upload-img-btn');
const uploadInfo = select('.upload-info');
const postBtn = select('post-btn');
const username = select('username');
const date = select('date');
const postTextWithImg = select('.post-text-with-img');
const postTextWithoutImg = select('.post-text-without-img');
const postImg = select('.post-img');


// Modal

onEvent('DOMContentLoaded', document, function () {
    const profileButton = select('.profile');
    onEvent('click', profileButton, openModal);
  });
  
  // open the modal
  function openModal() {
    const modal = getElement('myModal');
    modal.style.display = 'flex';
  }
  
  // close the modal
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


