// Element queries
const addNewUserBtn = document.getElementById('addNewUserBtn');
const addUserModal = document.getElementById('addUserModal');
const addUserForm = document.getElementById('addUserForm');
const userTable = document.getElementById('userTable').getElementsByTagName('tbody')[0];
const deleteModal = document.getElementById('deleteModal');
const confirmDeleteBtn = document.getElementById('confirmDelete');
const cancelDeleteBtn = document.getElementById('cancelDelete');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const roleInput = document.getElementById('role');

// Global variables
let users = [];
let currentUserId = 0;

// Functions
function showAddUserModal() {
    addUserModal.style.display = 'block';
}

function handleAddUser(e) {
    e.preventDefault();
    const name = nameInput.value;
    const email = emailInput.value;
    const role = roleInput.value;

    const newUser = {
        id: users.length + 1,
        name: name,
        email: email,
        role: role,
        profilePicture: 'placeholder.jpg'
    };

    users.push(newUser);
    addUserToTable(newUser);
    addUserModal.style.display = 'none';
    addUserForm.reset();
}

function addUserToTable(user) {
    const row = userTable.insertRow();
    row.innerHTML = `
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.role}</td>
        <td><img src="${user.profilePicture}" alt="Profile" width="50"></td>
        <td>
            <button class="btn btn-primary edit-btn">Edit</button>
            <button class="btn btn-danger delete-btn">Delete</button>
        </td>
    `;

    row.querySelector('.delete-btn').addEventListener('click', function() {
        showDeleteConfirmation(user.id);
    });
}

function showDeleteConfirmation(userId) {
    currentUserId = userId;
    deleteModal.style.display = 'block';
}

function handleDeleteUser() {
    users = users.filter(user => user.id !== currentUserId);
    const rowToDelete = Array.from(userTable.rows).find(row => row.cells[0].textContent == currentUserId);
    if (rowToDelete) {
        userTable.removeChild(rowToDelete);
    }
    deleteModal.style.display = 'none';
}

function hideDeleteModal() {
    deleteModal.style.display = 'none';
}

function handleOutsideClick(event) {
    if (event.target == addUserModal) {
        addUserModal.style.display = 'none';
    }
    if (event.target == deleteModal) {
        deleteModal.style.display = 'none';
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    addNewUserBtn.addEventListener('click', showAddUserModal);
    addUserForm.addEventListener('submit', handleAddUser);
    confirmDeleteBtn.addEventListener('click', handleDeleteUser);
    cancelDeleteBtn.addEventListener('click', hideDeleteModal);
    window.addEventListener('click', handleOutsideClick);
});