"use strict";

// Example usage from other parts of the site
// window.showStatusLabel('This is a status message!');
window.showStatusLabel = function(message) {
  const statusLabel = document.getElementById('statusLabel');
  const statusText = document.getElementById('statusText');
  statusText.textContent = message; // Set the variable text
  statusLabel.classList.add('status-label-active');
  tooltip.style.display = ''; // Reset display to use CSS for showing/hiding

  // Automatically hide the label after 2 seconds if not already closed
  setTimeout(function() {
      if (statusLabel.classList.contains('status-label-active')) {
          statusLabel.classList.remove('status-label-active');
      }
  }, 3000);
};

// Close button functionality to hide the status label immediately
document.addEventListener('DOMContentLoaded', function() {
  const closeStatus = document.getElementById('closeStatus');
  closeStatus.addEventListener('click', function() {
      const statusLabel = document.getElementById('statusLabel');
      statusLabel.classList.remove('status-label-active');
  });
});
