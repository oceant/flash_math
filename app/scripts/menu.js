"use strict";

/*--------------------------------------------------------------------------*
 * ハンバーガーメニュー
 *--------------------------------------------------------------------------*/
$(function () {
  $('[data-nav-trigger]').on('click', function () {
    $(this).toggleClass('active');
    var label = $('#menuLabel').text();

    if (label === 'MENU') {
      $('#menuLabel').text('CLOSE');
      $('[data-nav]').slideDown(300);
    } else {
      $('#menuLabel').text('MENU');
      $('[data-nav]').slideUp(300);
    }
  });

  if ($(window).width() <= 767) {
    $('[data-nav]').on('click', function () {
      $('[data-nav-trigger]').removeClass('active');
      $('#menuLabel').text('MENU');
      $('[data-nav]').slideUp(300);
    });
  }
});
//# sourceMappingURL=menu.js.map
