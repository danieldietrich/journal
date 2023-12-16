"use strict";

document.addEventListener('DOMContentLoaded', () => {
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints;

  if (!isTouchDevice) {
    const tooltip = document.getElementById('tooltip');

    // Function to position and show the tooltip with text
    const showTooltip = (element, message) => {
      tooltip.textContent = message;
      tooltip.style.display = 'block'; // Temporarily display to calculate dimensions
      const elementRect = element.getBoundingClientRect();
      tooltip.style.left = `${elementRect.left + (elementRect.width / 2) - (tooltip.offsetWidth / 2)}px`;
      tooltip.style.top = `${elementRect.bottom + window.scrollY + 10}px`; // Position below with 10px gap
      tooltip.classList.add('is-active');
      tooltip.style.display = ''; // Reset display to use CSS for showing/hiding
    };

    // Function to hide the tooltip
    const hideTooltip = () => {
      tooltip.removeAttribute('style');
      tooltip.classList.remove('is-active');
      tooltip.textContent = '';
    };

    // Attach event listeners to elements with a 'data-tooltip' attribute
    document.querySelectorAll('[data-tooltip]').forEach((element) => {
      element.addEventListener('mouseenter', (event) => {
          const message = event.target.getAttribute('data-tooltip');
          showTooltip(element, message);
      });
      element.addEventListener('mouseleave', hideTooltip);
      element.addEventListener('click', hideTooltip);
    });
  }
});
