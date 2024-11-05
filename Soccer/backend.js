// script.js

// Function to handle the form submission
document.getElementById('imageForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the default form submission

    const textInput = document.getElementById('textInput').value; // Get user input
    const resultDiv = document.getElementById('result');
    const errorDiv = document.getElementById('error');
    const generatedImage = document.getElementById('generatedImage');

    // Clear previous results
    errorDiv.style.display = 'none';
    generatedImage.style.display = 'none';
    generatedImage.src = '';

    try {
        // Send POST request to the backend
        const response = await fetch('https://gobackend-2b8d.onrender.com/generate-image', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: textInput }), // Send input as JSON
        });

        // Handle response
        if (response.ok) {
            const data = await response.json();
            generatedImage.src = data.image_url; // Set the image source
            generatedImage.style.display = 'block'; // Show the image
        } else {
            throw new Error('Failed to generate image');
        }
    } catch (error) {
        errorDiv.textContent = error.message; // Show error message
        errorDiv.style.display = 'block'; // Display the error
    }
});
