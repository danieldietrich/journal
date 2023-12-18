"use strict";

(function () {

  function filter_posts() {
    const tag = decodeURIComponent(window.location.hash);
    const filter = tag.replace('#', '').toLocaleLowerCase();
    const filterNotification = document.querySelector('.filter-notification');
    const filterTag = document.querySelector('.filter-tag');

    if (filter) {
      // Display the filter notification with the current filter tag
      filterNotification.style.display = 'block';
      filterTag.textContent = tag;

      document.querySelectorAll('ul.post-list > li').forEach((post) => {
        post.hidden = !post.classList.contains(filter);
      });
    } else {
      // Hide the filter notification if there is no filter
      filterNotification.style.display = 'none';
      document.querySelectorAll('ul.post-list > li').forEach((post) => {
        post.removeAttribute('hidden');
      });
    }
  }

  // When the document is ready
  document.addEventListener('DOMContentLoaded', function () {
    filter_posts();
    // Add click event listener to the remove filter button to clear the filter
    const removeFilterButton = document.querySelector('.remove-filter');
    removeFilterButton.addEventListener('click', function () {
      window.history.pushState('', document.title, window.location.pathname + window.location.search);
      filter_posts(); // Call filter_posts to reset the UI
    });
  });

  // Listen to hash changes to filter posts accordingly
  window.addEventListener('hashchange', filter_posts);

})();
