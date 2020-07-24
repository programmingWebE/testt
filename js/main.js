$(document).ready(function() {

  $('.mobile-wrap').on('click', function() {
    $('.line-burger').toggleClass('line-active');
    $('.main-header__list').slideToggle();
  });

  $(window).resize(function() {
    if ($(window).width() >= 820) {
      $('.main-header__list').attr('style', '');
      $('.line-burger').removeClass('line-active');
    };
  });

  $('select').each(function() {
    var $this = $(this),
      numberOfOptions = $(this).children('option').length;

    $this.addClass('select-hidden');
    $this.wrap('<div class="select"></div>');
    $this.after('<div class="select-styled"></div>');

    var $styledSelect = $this.next('div.select-styled');
    $styledSelect.text($this.children('option').eq(0).text());

    var $list = $('<ul />', {
      'class': 'select-options'
    }).insertAfter($styledSelect);

    for (var i = 0; i < numberOfOptions; i++) {
      $('<li />', {
        text: $this.children('option').eq(i).text(),
        rel: $this.children('option').eq(i).val(),
        style: $this.children('option').eq(i).data('img'),
      }).appendTo($list);
    }

    var $listItems = $list.children('li');

    $styledSelect.click(function(e) {
      e.stopPropagation();
      $('div.select-styled.active').not(this).each(function() {
        $(this).removeClass('active').next('ul.select-options').hide();
      });
      $(this).toggleClass('active').next('ul.select-options').toggle();
    });

    var bg = $this.find('option').eq(0).attr('data-img').slice(18, -1);
    console.log(bg);
    $this.parents('.exchange__select').find('.select-styled').css("backgroundImage", bg);

    $listItems.click(function(e) {
      e.stopPropagation();
      $styledSelect.text($(this).text()).removeClass('active');
      $this.val($(this).attr('rel'));
      $list.hide();
      var item = $(this).attr('style').slice(18, -1);
      $this.parents('.exchange__select').find('.select-styled').css("backgroundImage", item);

    });

    $(document).click(function() {
      $styledSelect.removeClass('active');
      $list.hide();
    });

  });


});