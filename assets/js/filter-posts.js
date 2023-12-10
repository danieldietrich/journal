(function () {

  function filter_posts() {
    const filter = window.location.hash.replace('#', '');
    if (filter) {
      document.querySelectorAll(`ul.post-list > li:not(.${filter})`).forEach((post) => {
        post.hidden = true;
      });
      document.querySelectorAll(`ul.post-list > li.${filter}`).forEach((post) => {
        post.removeAttribute('hidden');
      });
    } else {
      document.querySelectorAll('ul.post-list > li').forEach((post) => {
        post.removeAttribute('hidden');
      });
    }
  }

  document.addEventListener('DOMContentLoaded', () => { filter_posts() });

  window.addEventListener('hashchange', () => { filter_posts() });

})();
