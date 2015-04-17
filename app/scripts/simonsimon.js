'use strict';

var Simon = function() {
  this.daftpunk = false;
},
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

  this.setScore();

  $('.new-game').on('click', function() {
    that.newGame();
  });

  $('.go-daftpunk').on('click', function() {
    $('body').addClass('daftpunk');
    that.daftpunk = true;
  });
};

Simon.prototype.newGame = function() {
  this.setScore();
  this.sequence = [];
  this.current = [];
  this.round = 0;
  this.continue = true;
  this.preventPlaying();
  this.nextRound();
};

Simon.prototype.nextRound = function() {
  $('.score').text(this.sequence.length);
  this.sequence.push(this.randomNumber());
  this.current = this.sequence.slice(0);
  this.animate();
};

Simon.prototype.randomNumber = function() {
  return Math.floor((Math.random() * 9) + 1);
};

Simon.prototype.setScore = function() {
  var max = localStorage.getItem('max');

  if (!max) {
    max = 0;
    localStorage.setItem('max', 0);
  }

  $('.max').text(max);
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

    if (parseInt(localStorage.getItem('max')) < this.sequence.length - 1) {
      localStorage.setItem('max', this.sequence.length - 1);
      this.setScore();
    }
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

  if (this.daftpunk) {
    var $song = $('[data-song=' + tile + ']')[0];

    $song.pause()
    $song.currentTime = 0;
    $song.play();
  }

  setTimeout(function() {
    $tile.removeClass('pressed');
  }, 300);
};

app.init();
