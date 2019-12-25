$(document).ready(function() {
  // Get started!
  var _this = this;

  /*
   * Smooth scroll
   */

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();

      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth',
      });
    });
  });

  /*
   * To up button
   */

  $('.UpButton').on('click', function() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  });

  const convertImages = function() {
    /*
     * Replace all SVG images with inline SVG
     */

    $('img.svg').each(function() {
      var $img = $(this);
      var imgID = $img.attr('id');
      var imgClass = $img.attr('class');
      var imgURL = $img.attr('src');

      $.get(
        imgURL,
        function(data) {
          // Get the SVG tag, ignore the rest
          var $svg = $(data).find('svg');

          // Add replaced image's ID to the new SVG
          if (typeof imgID !== 'undefined') {
            $svg = $svg.attr('id', imgID);
          }
          // Add replaced image's classes to the new SVG
          if (typeof imgClass !== 'undefined') {
            $svg = $svg.attr('class', imgClass + ' replaced-svg');
          }

          // Remove any invalid XML tags as per http://validator.w3.org
          $svg = $svg.removeAttr('xmlns:a');

          // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
          if (
            !$svg.attr('viewBox') &&
            $svg.attr('height') &&
            $svg.attr('width')
          ) {
            $svg.attr(
              'viewBox',
              '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width')
            );
          }

          // Replace image with new SVG
          $img.replaceWith($svg);
        },
        'xml'
      );
    });
  };

  convertImages();
  /*
   * Menu background
   */

  $(window).scroll(function() {
    if ($(window).scrollTop() > 50) {
    } else {
    }
  });

  /*
   * Call slick carousel
   */

  $('.slick-carousel-portafolio').slick({
    centerMode: true,
    centerPadding: '0px',
    slidesToShow: 3,
    slidesToScroll: 1,
    touchMove: false,
    arrows: true,
    prevArrow:
      '<div class="prevArrow slick-arrow"><img src="../assets/img/carousel-arrow.svg" class="img-fluid"/></div>',
    nextArrow:
      '<div class="nextArrow slick-arrow"><img src="../assets/img/carousel-arrow.svg" class="img-fluid"/></div>',
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '0px',
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '0px',
          slidesToShow: 1,
        },
      },
    ],
  });

  $('.slick-carousel-trayectoria').slick({
    centerMode: true,
    centerPadding: '0px',
    slidesToShow: 1,
    slidesToScroll: 1,
    touchMove: false,
    arrows: true,
    prevArrow:
      '<div class="prevArrow slick-arrow"><img src="../assets/img/carousel-arrow.svg" class="img-fluid"/></div>',
    nextArrow:
      '<div class="nextArrow slick-arrow"><img src="../assets/img/carousel-arrow.svg" class="img-fluid"/></div>',
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '0px',
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '0px',
          slidesToShow: 1,
        },
      },
    ],
  });

  /*
   * Carousel indicator
   */

  $('.carousel-lenght').html(
    $('.slick-carousel-trayectoria .slick-slide:not(.slick-cloned)').length
  );

  $('.slick-arrow').on('click', function() {
    $('.first-number').html(
      Number(
        $('.slick-carousel-trayectoria  .slick-slide.slick-active').data(
          'slick-index'
        )
      ) + 1
    );
  });

  /*
   * Send Mail
   */

  $('#contacto button').click(function(e) {
    e.preventDefault();
    var data = {
      name: $('#name').val(),
      email: $('#email').val(),
      phone: $('#phone').val(),
      service: $('#service').val(),
      message: $('#message').val(),
    };

    $.ajax({
      type: 'POST',
      url: '../email.php',
      data,
      success: function() {
        $('#contacto button').attr('disabled', true);
        $('#contacto')
          .find('input, select, textarea')
          .val('');
        $('.Message-successful').fadeIn(1000);
      },
    });

    return false;
  });

  // End Script
});
