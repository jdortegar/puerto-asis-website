$(document).ready(function() {
  // Get started!
  var _this = this;
  /*
   * Include function
   */

  $(function() {
    var includes = $('[data-include]');
    jQuery.each(includes, function() {
      var file = $(this).data('include') + '.html';
      $(this).load(file, function() {
        /*
         * To up button
         */

        $('.UpButton').on('click', function() {
          document.body.scrollTop = 0; // For Safari
          document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
        });

        // get current URL path and assign 'active' class
        var pathname = window.location.pathname;
        $('.navbar-nav a[href="' + pathname + '"]').addClass('active');

        convertImages();
      });
    });
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
  /*
   * Menu background
   */

  $(window).scroll(function() {
    if ($(window).scrollTop() > 50) {
      $('.Pinatedo-menu').addClass('Pinatedo-menu-dark');
      $('.Footer-sticky-menu').addClass('fadeInFx');
    } else {
      $('.Pinatedo-menu').removeClass('Pinatedo-menu-dark');
      $('.Footer-sticky-menu').removeClass('fadeInFx');
    }
  });

  /*
   * Servicios elements
   */

  $('.servicios-container a').each(function() {
    $(this).on('click', function() {
      var element = $(this);
      var imageSrc = element.data('image');
      $('.service-image').fadeOut(100, function() {
        $(this).attr('src', `assets/img/${imageSrc}.jpg`);
        $(this).fadeIn(300);
      });

      // Scroll to element

      if ($(window).width() < 768) {
        $('html, body').animate(
          {
            scrollTop:
              $('.Section-3').offset().top - $('.Pinatedo-menu').height(),
          },
          500
        );
      }
    });
  });

  /*
   * Content for modals
   */

  $('.openPopup').on('click', function() {
    var dataURL = $(this).data('content');
    $('.modal-body').load(dataURL, function() {
      $('#TallerModal').modal({ show: true });
      // Load images for Palmira
      $('#carouselPalmira').on('slide.bs.carousel', function() {
        $('.videoElement').each(function() {
          $(this)
            .get(0)
            .pause();
        });
      });

      $('#TallerModal').on('hidden.bs.modal', function(e) {
        // do something...
        $('.videoElement').each(function() {
          $(this)
            .get(0)
            .pause();
        });
      });
    });
  });

  /*
   * Hide Images on Desktop
   */

  const removeImages = () => {
    if ($(window).width() > 768) {
      $('#carousel-thumb .hide-on-desktop')
        .removeClass('carousel-item active')
        .addClass('d-none');

      $('#carousel-thumb .carousel-item').removeClass('active');
      $('#carousel-thumb .carousel-item:first').addClass('active');
    } else {
      $('#carousel-thumb .hide-on-desktop')
        .removeClass('d-none')
        .addClass('carousel-item');
    }

    var height = $('#carousel-thumb .carousel-item').height();
    $('#carousel-thumb .carousel-item').css({ minHeight: height });
  };

  removeImages();

  $(window).resize(function() {
    removeImages();
  });
  /*
   * Call owl carousel
   */

  $('.owl-carousel').owlCarousel({
    loop: true,
    center: true,
    dots: false,
    nav: true,
    margin: 40,
    navText: [
      '<i class="fa fa-angle-left" aria-hidden="true"></i>',
      '<i class="fa fa-angle-right" aria-hidden="true"></i>',
    ],

    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 3,
      },
      1000: {
        items: 5,
      },
    },
  });

  /*
   * Fade on scroll
   */

  $(window).scroll(function() {
    // onScroll functions

    var scroll = $(window).scrollTop();

    /* Check the location of each desired element */
    $('.animation-scroll').each(function() {
      var bottom_of_object = $(this).position().top;
      var bottom_of_window = $(window).scrollTop() + $(window).height();

      /* If the object is completely visible in the window, fade it it */
      if (bottom_of_window > bottom_of_object) {
        $(this).animate({ opacity: '1' }, 1500);
        $(this).addClass('come-in');
      }
    });
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
