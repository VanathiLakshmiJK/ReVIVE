document.querySelector('.contact-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Create a message display area if not present
    let successMessage = document.getElementById('successMessage');
    if (!successMessage) {
        successMessage = document.createElement('p');
        successMessage.id = 'successMessage';
        successMessage.style.marginTop = '10px';
        document.querySelector('.right-section').appendChild(successMessage);
    }

    // Basic validation (can be expanded for more thorough checks)
    if (name && email && message) {
        successMessage.textContent = "Thank you for contacting us, " + name + ". We will get back to you soon!";
        successMessage.style.color = "green";

        // Clear form
        document.querySelector('.contact-form').reset();
    } else {
        successMessage.textContent = "Please fill out all fields.";
        successMessage.style.color = "red";
    }
});
