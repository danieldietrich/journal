"use strict";

document.addEventListener("DOMContentLoaded", function(event) {
  var timeagoElements = document.querySelectorAll('time.date-published');
  timeagoElements.forEach(function(el) {
    var postDate = new Date(el.getAttribute('datetime'));
    el.textContent = timeAgo(postDate);
  });

  function timeAgo(date) {
    var seconds = Math.floor((new Date() - date) / 1000);

    // Less than 60 seconds ago
    if (seconds < 60) {
      return "just now";
    }

    var days = Math.floor(seconds / 86400);
    var weeks = Math.floor(days / 7);

    // Special cases for "today" and "yesterday"
    if (days === 0) {
      return "today";
    }
    if (days === 1) {
      return "yesterday";
    }

    // Less than 7 days ago
    if (days < 7) {
      return days + " days ago";
    }

    // Less than 30 days ago
    if (days < 30) {
      return weeks + " week" + (weeks !== 1 ? "s" : "") + " ago";
    }

    // More than 30 days ago, display the date in 'MMM DD, YYYY' format
    return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
  }
});
