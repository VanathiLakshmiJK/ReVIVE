document.getElementById("uploadForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const bagData = {
        type: document.getElementById("type").value,
        size: document.getElementById("size").value,
        quantity: document.getElementById("quantity").value,
        price: document.getElementById("price").value,
    };

    fetch("http://localhost:5001/api/tailors/upload", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(bagData)
    })
        .then(response => {
            if (response.ok) {
                alert("Bag uploaded successfully!");
                document.getElementById("uploadForm").reset();
            } else {
                alert("Failed to upload bag. Please try again.");
            }
        })
        .catch(error => {
            console.error("Error uploading bag:", error);
            alert("Error uploading bag.");
        });
});
