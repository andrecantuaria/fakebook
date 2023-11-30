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
    'a_cant',
    'a_cantuaria@myemail.ca',
    ['Tech Insights', 'Travel Journals', 'Fitness Focus', 'Foodie Delights'],
    ['Tech Trends & Innovations', 'Adventure Explorers', 'Fitness Enthusiasts', 'Artistic Expressions Guild'],
    true
);

// Main Code index.js

// Modal Elements
const profile = select('.profile');
const fullName = select('.name');
const userName = select('.username');
const email = select('.email');
const pages = select('.pages');
const groups = select('.groups');
const canMonetize = select('.can-monetize');

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
    email.innerHTML = `<p><strong>Email:</strong> ${userInfo.email}</p>`;
    pages.innerHTML = `<p><strong>Pages:</strong> ${userInfo.pages.join(', ')}</p>`;
    groups.innerHTML = `<p><strong>Groups:</strong> ${userInfo.groups.join(', ')}</p>`;
    
    // Call checkCanMonetize and display the result
    const resultCanMonetize = checkCanMonetize(userInfo);
    canMonetize.innerHTML = `<p><strong>Can Monetize? </strong>${resultCanMonetize}</p>`;
}

function checkCanMonetize(userInfo) {
    return userInfo.canMonetize ? 'Yes' : 'No';
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


// DOM Elements
const input = select('.input'); // Text input
const uploadImgBtn = select('.upload-img-btn'); // Button to upload an image
const postBtn = select('.post-btn'); // Button to submit a post
const allPostsContainer = select('.all-posts'); // Container for all posts

// Event listeners
onEvent('change', document.getElementById('fileInput'), function (event) {
    const file = event.target.files[0];
    uploadImage(file);
});

onEvent('click', postBtn, function () {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    createPost(input.value, file);
});

// Posts
let postId = 1; // ID for each post

function generateUniqueId() {
    return `post${postId++}`;
}

function uploadImage(file) {
    if (file) {
        // Display the file name next to the upload button
        const fileNameDisplay = select('.file-name-display');
        fileNameDisplay.textContent = `File: ${file.name}`;
    }
}

function createPost(inputText, file) {
    if (!inputText && !file) {
        // Don't create empty posts
        return;
    }

    // Create a new post element
    const postElement = document.createElement('div');
    postElement.classList.add('post-container');

    // Create the post header
    const postHeader = document.createElement('div');
    postHeader.classList.add('post-header');

    // Create the profile container
    const profileContainer = document.createElement('div');
    profileContainer.classList.add('profile-container');

    // Create the profile element
    const profile = document.createElement('div');
    profile.classList.add('profile');

    // Create the username element
    const userName = document.createElement('div');
    userName.classList.add('user-name');
    userName.innerHTML = '<p>Andre Cantuaria</p>';

    // Create the date element
    const date = document.createElement('div');
    date.classList.add('date');
    const currentDate = new Date();
    date.innerHTML = `<p>${currentDate.toDateString()}</p>`;

    // Attach elements to their corresponding parent elements
    profileContainer.appendChild(profile);
    profileContainer.appendChild(userName);
    postHeader.appendChild(profileContainer);
    postHeader.appendChild(date);

    // Create the post text element
    const postText = document.createElement('div');
    postText.classList.add('post-text-with-img');
    postText.innerHTML = `<p>${inputText}</p>`;

    // Create the post image element only if there is a file
    const postImg = document.createElement('div');
    postImg.classList.add('post-img');

    // Display the uploaded image
    if (file) {
        const reader = new FileReader();
        reader.onload = function () {
            postImg.style.backgroundImage = `url('${reader.result}')`;
            postImg.style.height = '615px'; // or any desired height
        };
        reader.readAsDataURL(file);
    } else {
        postImg.style.height = '0'; // no image, height zero
    }

    // Attach elements to the post container
    postElement.appendChild(postHeader);
    postElement.appendChild(postText);
    postElement.appendChild(postImg);

    // Add a unique ID to the post
    postElement.dataset.postId = generateUniqueId();

    // Add the new post to the main container (at the top)
    const firstPost = allPostsContainer.firstChild;
    if (firstPost) {
        allPostsContainer.insertBefore(postElement, firstPost);
    } else {
        allPostsContainer.appendChild(postElement);
    }

    // Show the post div
    postElement.style.display = 'inline-block';

    // Clear the input and file selection
    input.value = '';
    fileInput.value = '';

    // Clear file name display
    const fileNameDisplay = select('.file-name-display');
    fileNameDisplay.textContent = '';
}