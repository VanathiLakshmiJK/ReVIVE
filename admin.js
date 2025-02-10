document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    const sidebarLinks = document.querySelectorAll('.sidebar nav ul li');
    const userModal = document.getElementById('userModal');
    const userForm = document.getElementById('userForm');
    const userTableBody = document.getElementById('userTableBody');
    const contentList = document.getElementById('contentList');

    // Navigation Logic
    sidebarLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Remove active class from all links and sections
            sidebarLinks.forEach(l => l.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));

            // Add active class to clicked link and corresponding section
            link.classList.add('active');
            const sectionId = link.dataset.section;
            document.getElementById(sectionId).classList.add('active');
        });
    });

    // User Management Functions
    const users = [
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'editor' }
    ];

    function renderUserTable() {
        userTableBody.innerHTML = users.map(user => `
            <tr>
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.role}</td>
                <td>
                    <button class="edit-user" data-id="${user.id}">Edit</button>
                    <button class="delete-user" data-id="${user.id}">Delete</button>
                </td>
            </tr>
        `).join('');

        // Add event listeners for edit and delete
        document.querySelectorAll('.edit-user').forEach(btn => {
            btn.addEventListener('click', openUserModal);
        });

        document.querySelectorAll('.delete-user').forEach(btn => {
            btn.addEventListener('click', deleteUser);
        });
    }

    function openUserModal(event) {
        const userId = event.target.dataset.id;
        const user = users.find(u => u.id === parseInt(userId));

        if (user) {
            userForm.name.value = user.name;
            userForm.email.value = user.email;
            userForm.role.value = user.role;
        }

        userModal.style.display = 'block';
    }

    function deleteUser(event) {
        const userId = parseInt(event.target.dataset.id);
        const index = users.findIndex(u => u.id === userId);

        if (index !== -1) {
            users.splice(index, 1);
            renderUserTable();
        }
    }

    userForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newUser = {
            id: users.length + 1,
            name: userForm.name.value,
            email: userForm.email.value,
            role: userForm.role.value
        };

        users.push(newUser);
        renderUserTable();
        userModal.style.display = 'none';
        userForm.reset();
    });

    // Close modal functionality
    const closeModalBtn = document.querySelector('.close-modal');
    closeModalBtn.addEventListener('click', () => {
        userModal.style.display = 'none';
    });

    // Logout functionality
    const logoutBtn = document.querySelector('.logout-btn');
    logoutBtn.addEventListener('click', () => {
        // Implement logout logic here
        alert('Logout functionality to be implemented');
    });

    // Content Management
    const contents = [
        { id: 1, title: 'First Project', description: 'Initial project details' },
        { id: 2, title: 'Second Project', description: 'Another project overview' }
    ];

    function renderContentList() {
        contentList.innerHTML = contents.map(content => `
            <div class="content-item">
                <h3>${content.title}</h3>
                <p>${content.description}</p>
                <div class="content-actions">
                    <button class="edit-content" data-id="${content.id}">Edit</button>
                    <button class="delete-content" data-id="${content.id}">Delete</button>
                </div>
            </div>
        `).join('');
    }

    // Initial renders
    renderUserTable();
    renderContentList();
});