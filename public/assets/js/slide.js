$(document).ready(function() {
    // Clone the logo items to loop infinitely
    $('.logo-items-wrapper').children('.single-logo-item').clone().appendTo('.logo-items-wrapper');
  });