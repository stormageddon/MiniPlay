var music_status = {

  disabled_buttons : ['rew', 'repeat', 'shuffle', 'slider'],
  artist : '',
  album : '',
  album_art : '',
  title : '',
  current_time : '',
  total_time : '',
  current_time_s : 0,
  total_time_s: 0,
  thumb : '',
  repeat : RepeatEnum.NONE,
  shuffle : false,
  status : '',
  volume : '',
  protocol : 'pandora',

  get_time : function (time) {
    return time.split(':').map(function(num, index, arr) {
      return Math.abs(parseInt(num, 10) * Math.pow(60, arr.length - index - 1));
    }).reduce(function(a, b) { return a + b; });
  },

  get_album_art : function () {
    var array = $('.slidesForeground .art');
    for (var i = 0; i < array.length; i++) {
      var item = array[i];
      if ($(item).css('display') == 'inline') {
        return $(item).attr('src');
      }
    }
    return 'img/default_album.png';
  },

  get_thumb : function () {
    if ($('.thumbUpButton').hasClass('indicator')) {
      return ThumbEnum.UP;
    }
    else if ($('.thumbDownButton').hasClass('indicator')) {
      return ThumbEnum.DOWN;
    }
    else {
      return ThumbEnum.NONE;
    }
  },

  update : function() {
    this.title = $('.playerBarSong').text();
    this.artist = $('.playerBarArtist').text();
    this.album = $('.playerBarAlbum').text();
    this.album_art = this.get_album_art();
    this.current_time = $('.elapsedTime').text();
    this.total_time = $('.remainingTime').text();
    this.current_time_s = this.get_time(this.current_time);
    this.total_time_s = this.current_time_s + this.get_time(this.total_time);
    this.thumb = this.get_thumb();
    this.volume = (parseInt($('.volumeKnob').css('left'), 10) - 20) / 82 * 100;
    this.status = ($('.playButton').css('display') == "none") ? StatusEnum.PLAYING : StatusEnum.PAUSED;
    return this;
  }
};
