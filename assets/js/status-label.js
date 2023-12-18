"use strict";

// window.showStatusLabel('This is a status message!');
window.showStatusLabel = function(message) {
    // Reference the template and container elements
    const template = document.getElementById('statusLabelTemplate');
    const container = document.getElementById('statusLabelContainer');

    // Clone the template content
    const clone = document.importNode(template.content, true);

    // Set the message text
    const statusText = clone.querySelector('.status-text');
    statusText.textContent = message;

    // Append the new status label to the container
    container.insertBefore(clone, container.firstChild);

    // Access the newly added status label div to modify styles and add event listeners
    const statusLabel = container.firstElementChild;

    // Animate the status label's appearance
    requestAnimationFrame(() => {
        statusLabel.style.opacity = 1;
        statusLabel.style.transform = 'translateY(0) scale(1)';
    });

    // Function to start the transition and remove element from the DOM.
    let isRemovalStarted = false;
    const removeStatusLabel = function() {
        if (isRemovalStarted) return; // Exit if removal has already started
        isRemovalStarted = true; // Set the flag to prevent duplicated removal

        // Apply the CSS transition effect
        statusLabel.style.opacity = 0;
        statusLabel.style.transform = 'translateY(10px) scale(0.5)';

        // Set a timeout to remove the element from the DOM after the transition
        setTimeout(function() {
            if (statusLabel.parentElement) { // Check if it's still part of the DOM
                statusLabel.remove();
            }
        }, 100); // The 100 ms duration should match the CSS transition-duration property
    };

    // Close button functionality
    const closeButton = statusLabel.querySelector('.close-button');
    closeButton.onclick = function() {
        removeStatusLabel();
    };

    // Automatically remove the status label after 2 seconds
    setTimeout(function() {
        if (!isRemovalStarted && statusLabel.parentElement) {
            removeStatusLabel();
        }
    }, 3000);
};
