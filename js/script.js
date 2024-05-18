function sendMessage() {
    const userInputElement = document.getElementById('user-input');
    const userInput = userInputElement.value.trim();
    if (userInput === '') return;

    const chatBox = document.getElementById('chat-box');

    // Add user message to chat box
    const userMessage = document.createElement('div');
    userMessage.classList.add('flex', 'justify-end');
    userMessage.innerHTML = `
        <div class="bg-gray-600 text-gray-200 text-lg rounded-lg px-4 py-2 max-w-xl">
            <p>${userInput}</p>
        </div>
    `;
    chatBox.appendChild(userMessage);

    // Clear input field and scroll to bottom
    userInputElement.value = '';
    chatBox.scrollTop = chatBox.scrollHeight;

    // Send user message to server
    fetch('/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: userInput })
    })
    .then(response => response.json())
    .then(data => {
        // Add bot response to chat box
        const botMessage = document.createElement('div');
        botMessage.classList.add('flex', 'justify-start');
        botMessage.innerHTML = `
            <div class="bg-gray-700 text-gray-200 text-lg rounded-lg px-4 py-2 max-w-4xl">
                <p>${data.response}</p>
            </div>
        `;
        chatBox.appendChild(botMessage);

        // Scroll to bottom
        chatBox.scrollTop = chatBox.scrollHeight;
    })
    .catch(error => {
        console.error('Error:', error);

        // Optional: Display error message in chat box
        const errorMessage = document.createElement('div');
        errorMessage.classList.add('flex', 'justify-start');
        errorMessage.innerHTML = `
            <div class="bg-red-600 text-gray-200 text-lg rounded-lg px-4 py-2 max-w-xl">
                <p>Sorry, there was an error processing your request. Please try again later.</p>
            </div>
        `;
        chatBox.appendChild(errorMessage);

        // Scroll to bottom
        chatBox.scrollTop = chatBox.scrollHeight;
    });
}
