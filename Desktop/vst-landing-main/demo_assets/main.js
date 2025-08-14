(function($) {
  "use strict";

  // Back To Top - Start
  // --------------------------------------------------
  $(window).scroll(function() {
    if ($(this).scrollTop() > 200) {
      $('.backtotop:hidden').stop(true, true).fadeIn();
    } else {
      $('.backtotop').stop(true, true).fadeOut();
    }
  });
  $(".scroll").on('click', function() {
    $("html, body").animate({scrollTop: 0}, 0);
    return false; 
  });
  // Back To Top - End
  // --------------------------------------------------

  // Preloader and AOS Animation Load - Start
  // --------------------------------------------------
  $(window).on("load", function() {
    $("#preloader").hide();
    AOS.init({
      once: true,
    });
  });
  // Preloader and AOS Animation Load - End
  // --------------------------------------------------

  // Mobile Menu Button Class Chnage - Start
  // --------------------------------------------------
  $(".mobile_menu_btn").on('click', function(){
    $(".mobile_menu_btn > i").toggleClass("active");
  });
  // Mobile Menu Button Class Chnage - End
  // --------------------------------------------------

  // Sticky Header - Start
  // --------------------------------------------------
  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 0) {
      $('.site_header').addClass("sticky")
    } else {
      $('.site_header').removeClass("sticky")
    }
  });
  // Sticky Header - End
  // --------------------------------------------------

  // Scrollspy Effect - Start
  // --------------------------------------------------
  $('.scrollspy_btn[href^="#"]').on('click', function (event) {
    event.preventDefault();
    var targetClass = $(this).attr('href');
    var $targetElement = $(targetClass);
    if ($targetElement.length) {
      var targetPosition = $targetElement.offset().top;
      $('html, body').animate(
      {
        scrollTop: targetPosition,
      },
      0
      );
    }
  });
  // Scrollspy Effect - End
  // --------------------------------------------------

  // Hero Image Slider - Start
  // --------------------------------------------------
  const heroImageSlider = new Swiper('.hero_image_slider', {
    loop: true,
    speed: 1000,
    effect: "fade",
    slidesPerView: 1,
    grabCursor: false,
    autoplay: {
      delay: 3000,
      disableOnInteraction: true,
    },
  });
  // Hero Image Slider - End
  // --------------------------------------------------

  // Review Carousel - Start
  // --------------------------------------------------
  const reviewCarousel = new Swiper('.review_carousel', {
    loop: true,
    speed: 1000,
    slidesPerView: 1,
    spaceBetween: 10,
    grabCursor: false,
    autoplay: {
      delay: 5000,
      disableOnInteraction: true,
    },
    navigation: {
      nextEl: ".rc-button-next",
      prevEl: ".rc-button-prev",
    },
  });
  // Review Carousel - End
  // --------------------------------------------------

})(jQuery);