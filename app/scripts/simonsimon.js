'use strict';

var Simon = function() {},
    app   = new Simon(),
    keys  = {
      49: '1',
      50: '2',
      51: '3',
      52: '4',
      53: '5',
      54: '6',
      55: '7',
      56: '8',
      57: '9'
    };

Simon.prototype.press = function(nb) {
  $('.tile[data-tile="' + nb + '"]').addClass('pressed');

  setTimeout(function() {
    $('.tile[data-tile="' + nb + '"]').removeClass('pressed');
  }, 200);
};

Simon.prototype.getNbFromKey = function(key) {
  return keys[key];
};

$(document).on('keypress', function(e) {
  var nb = app.getNbFromKey(e.keyCode ? e.keyCode : e.charCode);

  if (nb)
    app.press(nb);
});

$('.tile').on('click', function() {
  app.press($(this).data('tile'));
});
