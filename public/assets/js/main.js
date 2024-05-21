(function ($) {
    "use strict";

    $(document).ready(function($){
        
        // testimonial sliders
        $(".testimonial-sliders").owlCarousel({
            items: 1,
            loop: true,
            autoplay: true,
            responsive:{
                0:{
                    items:1,
                    nav:false
                },
                600:{
                    items:1,
                    nav:false
                },
                1000:{
                    items:1,
                    nav:false,
                    loop:true
                }
            }
        });

        // homepage slider
        $(".homepage-slider").owlCarousel({
            items: 1,
            loop: true,
            autoplay: true,
            nav: true,
            dots: false,
            navText: ['<i class="fas fa-angle-left"></i>', '<i class="fas fa-angle-right"></i>'],
            responsive:{
                0:{
                    items:1,
                    nav:false,
                    loop:true
                },
                600:{
                    items:1,
                    nav:true,
                    loop:true
                },
                1000:{
                    items:1,
                    nav:true,
                    loop:true
                }
            }
        });

        // logo carousel
        $(".logo-carousel-inner").owlCarousel({
            items: 4,
            loop: true,
            autoplay: true,
            margin: 30,
            responsive:{
                0:{
                    items:1,
                    nav:false
                },
                600:{
                    items:3,
                    nav:false
                },
                1000:{
                    items:4,
                    nav:false,
                    loop:true
                }
            }
        });

        // count down
        if($('.time-countdown').length){  
            $('.time-countdown').each(function() {
            var $this = $(this), finalDate = $(this).data('countdown');
            $this.countdown(finalDate, function(event) {
                var $this = $(this).html(event.strftime('' + '<div class="counter-column"><div class="inner"><span class="count">%D</span>Days</div></div> ' + '<div class="counter-column"><div class="inner"><span class="count">%H</span>Hours</div></div>  ' + '<div class="counter-column"><div class="inner"><span class="count">%M</span>Mins</div></div>  ' + '<div class="counter-column"><div class="inner"><span class="count">%S</span>Secs</div></div>'));
            });
         });
        }

        // projects filters isotop
        $(".product-filters li").on('click', function () {
            
            $(".product-filters li").removeClass("active");
            $(this).addClass("active");

            var selector = $(this).attr('data-filter');

            $(".product-lists").isotope({
                filter: selector,
            });
            
        });
        
        // isotop inner
        $(".product-lists").isotope();

        // magnific popup
        $('.popup-youtube').magnificPopup({
            disableOn: 700,
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false
        });

        // light box
        $('.image-popup-vertical-fit').magnificPopup({
            type: 'image',
            closeOnContentClick: true,
            mainClass: 'mfp-img-mobile',
            image: {
                verticalFit: true
            }
        });

        // homepage slides animations
        $(".homepage-slider").on("translate.owl.carousel", function(){
            $(".hero-text-tablecell .subtitle").removeClass("animated fadeInUp").css({'opacity': '0'});
            $(".hero-text-tablecell h1").removeClass("animated fadeInUp").css({'opacity': '0', 'animation-delay' : '0.3s'});
            $(".hero-btns").removeClass("animated fadeInUp").css({'opacity': '0', 'animation-delay' : '0.5s'});
        });

        $(".homepage-slider").on("translated.owl.carousel", function(){
            $(".hero-text-tablecell .subtitle").addClass("animated fadeInUp").css({'opacity': '0'});
            $(".hero-text-tablecell h1").addClass("animated fadeInUp").css({'opacity': '0', 'animation-delay' : '0.3s'});
            $(".hero-btns").addClass("animated fadeInUp").css({'opacity': '0', 'animation-delay' : '0.5s'});
        });

       

        // stikcy js
        $("#sticker").sticky({
            topSpacing: 0
        });

        //mean menu
        $('.main-menu').meanmenu({
            meanMenuContainer: '.mobile-menu',
            meanScreenWidth: "992"
        });
        
         // search form
        $(".search-bar-icon").on("click", function(){
            $(".search-area").addClass("search-active");
        });

        $(".close-btn").on("click", function() {
            $(".search-area").removeClass("search-active");
        });
    
    });


    jQuery(window).on("load",function(){
        jQuery(".loader").fadeOut(1000);
    });


}(jQuery));
document.getElementById('chatToggleButton').addEventListener('click', function() {
    var container = document.querySelector('.container1');
    if (container.style.display === 'none' || container.style.display === '') {
      container.style.display = 'block';
    } else {
      container.style.display = 'none';
    }
  });
  function showForm() {
    document.getElementById('overlay1').style.display = 'block';
    document.getElementById('form-container1').style.display = 'block';
}

// Function to hide overlay and form
function hideForm() {
    document.getElementById('overlay1').style.display = 'none';
    document.getElementById('form-container1').style.display = 'none';
    
}
function checkFormSubmitted() {
    return localStorage.getItem('formSubmitted') === 'true';
}

// Function to mark form as submitted
function markFormSubmitted() {
    localStorage.setItem('formSubmitted', 'true');
}
// Show form when the page loads (you may adjust this as needed)
window.onload = function () {
    if (!checkFormSubmitted()) {
        showForm();
    }
};

// Handle form submission
document.getElementById('detailsForm1').addEventListener('submit', function(event) {
    const formData = new FormData(this);
    var email = formData.get('emailInput');
    var mobile = formData.get('mobileInput');
    console.log(email);
    
    // Validation
    let emailError = document.getElementById('emailError');
    let mobileError = document.getElementById('mobileError');
    let valid = true;
    
    if (email === 'lakshmithacorp@gmail.com' && mobile === '9965599005') {
        localStorage.setItem('email', "lakshmithacorp@gmail.com");
        localStorage.setItem('phone', "9965599005");
    } else {
        localStorage.setItem('email', email);
        localStorage.setItem('phone', mobile);
    }
    
    // Email validation
    if (!isValidEmail(email)) {
        emailError.style.display = 'block';
        valid = false;
    } else {
        emailError.style.display = 'none';
    }

    // Mobile validation (assuming a simple 10-digit number)
    const mobileRegex = /^\d{10}$/;
    if (!mobileRegex.test(mobile)) {
        mobileError.style.display = 'block';
        valid = false;
    } else {
        mobileError.style.display = 'none';
    }

    if (valid) {
        markFormSubmitted();
        hideForm();
    }
});

function isValidEmail(email) {
    // Regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
// Check for admin status in local storage
$(document).ready(function(){
    var email = localStorage.getItem("email");
    var phone = localStorage.getItem("phone");
    
    // Check if email and phone match the desired values
    if (email === "lakshmithacorp@gmail.com" && phone === "9965599005") {
        var iconTag = '<a href="admin.html"><i class="fas fa-user-cog"></i></a>';
        $(".header-icons").append(iconTag);
    }
});

  


// Function to send product details to server and add to cart
// Function to send product details to server and add to cart






