
// Get references to the input and button elements
const postInput = document.getElementById('postInput');
const postBtn = document.getElementById('postBtn');

// Function to update button opacity based on input content
function updateButtonOpacity() {
    if (postInput.value.trim().length > 0) {
        // If there's text, make button fully opaque
        postBtn.classList.remove('opacity-20');
        postBtn.classList.add('opacity-100');
        postBtn.style.cursor = 'pointer';
    } else {
        // If no text, make button semi-transparent
        postBtn.classList.remove('opacity-100');
        postBtn.classList.add('opacity-20');
        postBtn.style.cursor = 'default';
    }
}

// Listen for input events (typing, pasting, etc.)
postInput.addEventListener('input', updateButtonOpacity);

// Listen for keyup events (for backspace, delete, etc.)
postInput.addEventListener('keyup', updateButtonOpacity);

// Optional: Add click handler for the button
postBtn.addEventListener('click', function () {
    if (postInput.value.trim().length > 0) {
        // Simulate posting
        console.log('Posted:', postInput.value);

        // Clear the input
        postInput.value = '';

        // Update button opacity
        updateButtonOpacity();

        // You could add more functionality here like:
        // - Show a success message
        // - Add the post to the feed
        // - Send data to a server
    }
});

// Optional: Submit on Enter key press
postInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter' && postInput.value.trim().length > 0) {
        postBtn.click();
    }
});
