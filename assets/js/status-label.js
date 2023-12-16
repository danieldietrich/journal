"use strict";

// Example usage from other parts of the site
// window.showStatusLabel('This is a status message!');
window.showStatusLabel = function(message) {
    // Reference the template and container elements
    var template = document.getElementById('statusLabelTemplate');
    var container = document.getElementById('statusLabelContainer');

    // Clone the template content
    var clone = document.importNode(template.content, true);

    // Set the message text
    var statusText = clone.querySelector('.status-text');
    statusText.textContent = message;

    // Append the new status label to the container
    container.insertBefore(clone, container.firstChild);

    // Access the newly added status label div to modify styles and add event listeners
    var statusLabel = container.firstElementChild;

    // Animate the status label's appearance
    requestAnimationFrame(() => {
        statusLabel.style.opacity = 1;
        statusLabel.style.transform = 'translateY(0) scale(1)';
    });

    // Close button functionality
    var closeButton = statusLabel.querySelector('.close-button');
    closeButton.onclick = function() {
        statusLabel.remove();
    };

    // Automatically remove the status label after 2 seconds
    setTimeout(function() {
        if (statusLabel.parentElement) { // Check if it wasn't closed manually
            statusLabel.remove();
        }
    }, 2000);
};
