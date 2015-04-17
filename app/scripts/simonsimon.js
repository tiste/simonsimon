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

Simon.prototype.init = function() {
  var that = this;

  $('.new-game').on('click', function() {
    that.newGame();
  });
};

Simon.prototype.newGame = function() {
  this.sequence = [];
  this.current = [];
  this.round = 0;
  this.continue = true;
  this.preventPlaying();
  this.nextRound();
};

Simon.prototype.nextRound = function() {
  this.sequence.push(this.randomNumber());
  this.current = this.sequence.slice(0);
  this.animate();
};

Simon.prototype.randomNumber = function() {
  return Math.floor((Math.random() * 9) + 1);
};

Simon.prototype.press = function(tileNb) {
  var nb = this.current.shift();

  this.highlight(tileNb);
  this.continue = (nb == tileNb);
  this.canContinue();
};

Simon.prototype.canContinue = function() {
  if (this.current.length === 0 && this.continue) {
    this.preventPlaying();
    this.nextRound();
  } else if (!this.continue) {
    this.preventPlaying();
    alert('YOU LOSE');
  }
};

Simon.prototype.letsPlay = function() {
  var that = this;

  $('.container').on('click', '.tile[data-tile]', function() {
    that.press($(this).data('tile'));
  });

  $(document).on('keypress', function(e) {
    var key = e.which ? e.which : e.keyCode;

    that.press(keys[key]);
  });
};

Simon.prototype.preventPlaying = function() {
  $('.container').off('click', '.tile[data-tile]');
  $(document).off('keypress');
};

Simon.prototype.animate = function() {
  var i = 0,
      that = this,
      sequence = this.sequence;

  var interval = setInterval(function() {
    that.highlight(sequence[i]);
    i++;

    if (i >= sequence.length) {
      clearInterval(interval);
      that.letsPlay();
    }
  }, 600);
};

Simon.prototype.highlight = function(tile) {
  var $tile = $('.tile[data-tile=' + tile + ']').addClass('pressed');

  setTimeout(function() {
    $tile.removeClass('pressed');
  }, 300);
};

app.init();
