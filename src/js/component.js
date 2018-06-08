$(document).ready(function () {
  var myDate = new Date();

  function returnEndDate(d, h, m) {
    myDate.setDate(myDate.getDate() + d);
    myDate.setHours(myDate.getHours() + h);
    myDate.setMinutes(myDate.getMinutes() + m);
    return myDate;
  }
  if ($.cookie("timer")) {
    var dateEnd = $.cookie("timer");
  } else {
    var dateEnd = returnEndDate(4, 0, 0);
    $.cookie("timer", dateEnd, {
      expires: 4
    });
  }


  var note = $('#note'),
    ts = new Date(dateEnd),
    newYear = true;

  if ((new Date()) > ts) {
    ts = (new Date()).getTime() + 10 * 24 * 60 * 60 * 1000;
    newYear = false;
  }

  $('#countdown').countdown({
    timestamp: ts,
    callback: function (days, hours, minutes, seconds) {

    }
  });

  $('#countdown_1').countdown({
    timestamp: ts,
    callback: function (days, hours, minutes, seconds) {

    }
  });
  $('.countDays').append('<span class="title">дня</span>');
  $('.countHours').append('<span class="title">часов</span>');
  $('.countMinutes').append('<span class="title">минуты</span>');
  $('.countSeconds').append('<span class="title">секунды</span>');


  $('.modal-btn').fancybox();

  $('.play-btn').click(function () {
    var iframe_url = "https://www.youtube.com/embed/" + $(this).parent().data('id') + "?autoplay=1&autohide=1&rel=0&amp;showinfo=0";
    var iframe_height = $(this).parent().find('.preview').height();
    var iframe_width = $(this).parent().find('.preview').width();
    $(this).hide();
    $(this).parent().find('.preview').hide();
    $(this).parent().append('<iframe src="' + iframe_url + '?rel=0&amp;controls=0&amp;showinfo=0"  width="' + iframe_width + '" height="' + iframe_height + '"  frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>')
  });

  $('.scroll').click(function (e) {
    event.preventDefault();
    var id = $(this).attr('href'),
      top = $(id).offset().top;

    $('body,html').animate({
      scrollTop: top - 60
    }, 1500);

  });

  /*    $('.ytb-video').each(function () {
        $(this).find('img.preview').attr('src', 'http://i.ytimg.com/vi/' + $(this).data('id') + '/hqdefault.jpg');
      });*/
  $(window).resize(function () {
    if ($(window).width() > 1200) {
      var steps = 30;
      var paralaxContainer = '.parallax_section';
      var parallaxElements = $('.scroll-parallax').closest(paralaxContainer).find('.scroll-parallax');
      var parallaxQuantity = parallaxElements.length;


      $(window).on('scroll', function () {
        window.requestAnimationFrame(function () {

          for (var i = 0; i < parallaxQuantity; i++) {

            var currentElement = parallaxElements.eq(i);
            var scrolled = $(window).scrollTop();
            var currentElementStep = currentElement.data('step') ? currentElement.data('step') : steps;
            var containerPosition = currentElement.closest('.parallax_section').offset()['top'];
            currentElement.css({
              'transform': 'translate3d(0,' + (scrolled - containerPosition) * -(1 / currentElementStep) + 'px, 0)'
            });
          }
        });
      });
      $('.stop-parallax').addClass('scroll-parallax');
      $('.scroll-parallax').each(function () {
        $(this).parents('.parallax_section').css({
          'width': $(this).find('img').width(),
          'height': $(this).find('img').height(),
        })
        $(this).css({
          "position": "absolute",
          "transition": "all .5s"
        })
      })

    } else {

      $('.scroll-parallax').each(function () {
        $(this).addClass('stop-parallax');

      
        $(this).css({
          "position": "static",
          "transition": "all .5s"
        })
      })
      $('.stop-parallax').removeClass('scroll-parallax');

    }
  })

  if ($(window).width() > 1200) {
    var steps = 30;
    var paralaxContainer = '.parallax_section';
    var parallaxElements = $('.scroll-parallax').closest(paralaxContainer).find('.scroll-parallax');
    var parallaxQuantity = parallaxElements.length;


    $(window).on('scroll', function () {
      window.requestAnimationFrame(function () {

        for (var i = 0; i < parallaxQuantity; i++) {

          var currentElement = parallaxElements.eq(i);
          var scrolled = $(window).scrollTop();
          var currentElementStep = currentElement.data('step') ? currentElement.data('step') : steps;
          var containerPosition = currentElement.closest('.parallax_section').offset()['top'];
          currentElement.css({
            'transform': 'translate3d(0,' + (scrolled - containerPosition) * -(1 / currentElementStep) + 'px, 0)'
          });
        }
      });
    });

    $('.scroll-parallax').each(function () {
      $(this).parents('.parallax_section').css({
        'width': $(this).find('img').width(),
        'height': $(this).find('img').height(),
      })
      $(this).css({
        "position": "absolute",
        "transition": "all .5s"
      })
    })

  } else {
    $('.scroll-parallax').each(function () {

      $(this).addClass('stop-parallax');
    })
    $('.stop-parallax').removeClass('scroll-parallax');
  }






  $("input[type='tel']").mask("+38 (999) 999-9999");

  function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
      vars[key] = value;
    });
    return vars;
  }
  $('input[name="utm_source"]').val(getUrlVars()["utm_source"]);
  $('input[name="utm_campaign"]').val(getUrlVars()["utm_campaign"]);
  $('input[name="utm_medium"]').val(getUrlVars()["utm_medium"]);
  $('input[name="utm_term"]').val(getUrlVars()["utm_term"]);
  $('input[name="utm_content"]').val(getUrlVars()["utm_content"]);
  $('input[name="click_id"]').val(getUrlVars()["aff_sub"]);
  $('input[name="affiliate_id"]').val(getUrlVars()["aff_id"]);
  $('input[name="user_agent"]').val(navigator.userAgent);
  $('input[name="page_url"]').val(window.location.hostname);

  $('input[name="ref"]').val(document.referrer);
  $.get("https://ipinfo.io", function (response) {
    $('input[name="ip_address"]').val(response.ip);
    $('input[name="city"]').val(response.city + ' | ' + response.region + ' | ' + response.country);
    $('input[name="country"]').val();
    $('input[name="region"]').val();
  }, "jsonp");

  function readCookie(name) {
    var n = name + "=";
    var cookie = document.cookie.split(';');
    for (var i = 0; i < cookie.length; i++) {
      var c = cookie[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1, c.length);
      }
      if (c.indexOf(n) == 0) {
        return c.substring(n.length, c.length);
      }
    }
    return null;
  }
  setTimeout(function () {
    $('.gclid_field').val(readCookie('gclid'));
    if ($('.gclid_field').val() == '') {
      $('.gclid_field').val(readCookie('_gid'));
    }
  }, 2000);

  /*db/registration.php*/

  /* form valid*/
  var alertImage = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 286.1 286.1"><path d="M143 0C64 0 0 64 0 143c0 79 64 143 143 143 79 0 143-64 143-143C286.1 64 222 0 143 0zM143 259.2c-64.2 0-116.2-52-116.2-116.2S78.8 26.8 143 26.8s116.2 52 116.2 116.2S207.2 259.2 143 259.2zM143 62.7c-10.2 0-18 5.3-18 14v79.2c0 8.6 7.8 14 18 14 10 0 18-5.6 18-14V76.7C161 68.3 153 62.7 143 62.7zM143 187.7c-9.8 0-17.9 8-17.9 17.9 0 9.8 8 17.8 17.9 17.8s17.8-8 17.8-17.8C160.9 195.7 152.9 187.7 143 187.7z" fill="#E2574C"/></svg>';
  var error;
  $('.submit').click(function (e) {
    e.preventDefault();
    var ref = $(this).closest('form').find('[required]');
    $(ref).each(function () {
      if ($(this).val() == '') {
        var errorfield = $(this);
        if ($(this).attr("type") == 'email') {
          var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
          if (!pattern.test($(this).val())) {
            $("input[name=email]").val('');
            $(this).addClass('error').parent('span').append('<div class="allert"><p>Укажите коректный e-mail</p>' + alertImage + '</div>');
            error = 1;
            $(":input.error:first").focus();
          }
        } else if ($(this).attr("type") == 'tel') {
          var patterntel = /^()[- +()0-9]{9,18}/i;
          if (!patterntel.test($(this).val())) {
            $("input[name=phone]").val('');
            $(this).addClass('error').parent('span').append('<div class="allert"><p>Укажите номер телефона в формате +3809999999</p>' + alertImage + '</div>');
            error = 1;
            $(":input.error:first").focus();
          }
        } else {
          $(this).addClass('error').parent('span').append('<div class="allert"><p>Заполните это поле</p>' + alertImage + '</div>');
          error = 1;
          $(":input.error:first").focus();
        }
        return;
      } else {
        error = 0;
        $(this).addClass('error').parent('span').find('.allert').remove();
      }
    });
    if (error !== 1) {
      $(this).unbind('submit').submit();
    }
  });

  /*end form valid*/

  $('form').on('submit', function (e) {
    e.preventDefault();
    $('.submit').addClass('inactive');
    $('.submit').prop('disabled', true);
    var $form = $(this);

    $form.find('input[name="name"]').val($(this).find('input[name="entry.68528353"]').val());
    $form.find('input[name="custom_phone"]').val($(this).find('input[name="entry.244111333"]').val());
    $form.find('input[name="email"]').val($(this).find('input[name="entry.1864185794"]').val());


    var $data = $form.find('input, textarea, select');



    $.ajax({
      type: 'POST',
      url: 'db/registration.php',
      dataType: 'json',
      data: $form.serialize(),
      success: function (response) {}
    });

    $.ajax({
      type: 'POST',
      url: 'https://docs.google.com/forms/d/e/1FAIpQLSeUIwSRIYe5y7i6a1AWhRO36kERWLDZ3OgmAgx_MD0xVpGwpw/formResponse',
      dataType: 'json',
      data: $form.serialize(),
      success: function (response) {}
    });

    $.ajax({
      type: 'POST',
      url: 'https://app.getresponse.com/add_subscriber.html',
      dataType: 'json',
      data: $data,
      success: function (response) {}
    });

    setTimeout(function () {
      window.location.href = "success.html";
    }, 1000);

  });


});