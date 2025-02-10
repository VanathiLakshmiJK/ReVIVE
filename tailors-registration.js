document.getElementById('tailorRegistrationForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent actual form submission

    // Gather form data
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const address = document.getElementById('address').value.trim();
    const sizes = Array.from(document.querySelectorAll('input[name="sizes"]:checked'))
        .map(input => input.value);

    // Basic validation
    if (name === "" || phone === "" || address === "" || sizes.length === 0) {
        document.getElementById('errorMessage').style.display = 'block';
        document.getElementById('successMessage').style.display = 'none';
        return;
    }

    // Prepare the data to send
    const formData = { name, phone, address, sizes };

    try {
        const response = await fetch('http://localhost:5001/api/tailors/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        const result = await response.json();
        if (response.ok) {
            document.getElementById('successMessage').style.display = 'block';
            document.getElementById('errorMessage').style.display = 'none';
            document.getElementById('tailorRegistrationForm').reset(); // Clear the form
        } else {
            alert(`Error: ${result.message}`);
        }
    } catch (error) {
        console.error('Error submitting form:', error);
        alert('Error submitting form');
    }
});
