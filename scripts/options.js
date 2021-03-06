$(function() {
  $('#extension').click(function() {
    chrome.tabs.create({url: "chrome://chrome/extensions"});
  });

  chrome.storage.sync.get(['shortcuts-enabled', 'notifications-enabled', 'scrobbling-enabled', 'lastfm_sessionID'], function (data) {
    if (data['notifications-enabled'] == true) {
      $('#enable-notifications').prop('checked', true);
    }
    if (data['shortcuts-enabled'] == true) {
      $('#enable-shortcuts').prop('checked', true);
    }
    if (data['scrobbling-enabled'] == true) {
      $('#enable-scrobbling').prop('checked', true);
      $('#login').show();
    }
    else {
      $('#login').hide();
    }
    if (data['lastfm_sessionID'] !== undefined && data['scrobbling-enabled'] == true) {
      $('#auth').show();
    }
    else {
      $('#auth').hide();
    }
  });

  $('#version').html("MiniPlay v" + chrome.app.getDetails().version + " by <a href='https://github.com/iambald'>Jeff Chen</a>.");

  $('#enable-shortcuts').click(function() {
    chrome.storage.sync.set(
      {
        'shortcuts-enabled' : $('#enable-shortcuts').is(':checked')
      });
  });


  $('#enable-notifications').click(function() {
    chrome.storage.sync.set(
      {
        'notifications-enabled' : $('#enable-notifications').is(':checked')
      });
  });

  $('#enable-scrobbling').click(function() {
    var a = $('#enable-scrobbling').is(':checked');
    chrome.storage.sync.set(
    {
      'scrobbling-enabled' : a
    });
    if (a) {
      $('#login').show();
    }
    else {
      $('#login').hide();
      $('#auth').hide();
      chrome.storage.sync.remove(['lastfm_sessionID', 'lastfm_token']);
    }
  })

  $('#login a').click(function () {
    chrome.runtime.sendMessage({type: 'auth'}, function (response) {});
  })

  $('.menu a').click(function(ev) {
    ev.preventDefault();
    var selected = 'selected';

    $('.mainview > *').removeClass(selected);
    $('.menu li').removeClass(selected);
    setTimeout(function() {
      $('.mainview > *:not(.selected)').css('display', 'none');
    }, 100);

    $(ev.currentTarget).parent().addClass(selected);
    var currentView = $($(ev.currentTarget).attr('href'));
    currentView.css('display', 'block');
    setTimeout(function() {
      currentView.addClass(selected);
    }, 0);

    setTimeout(function() {
      $('body')[0].scrollTop = 0;
    }, 200);
  });

  $('#launch_modal').click(function(ev) {
    ev.preventDefault();
    var modal = $('.overlay').clone();
    $(modal).removeAttr('style');
    $(modal).find('button, .close-button').click(function() {
      $(modal).addClass('transparent');
      setTimeout(function() {
        $(modal).remove();
      }, 1000);
    });

    $(modal).click(function() {
      $(modal).find('.page').addClass('pulse');
      $(modal).find('.page').on('webkitAnimationEnd', function() {
        $(this).removeClass('pulse');
      });
    });
    $(modal).find('.page').click(function(ev) {
      ev.stopPropagation();
    });
    $('body').append(modal);
  });

  $('.mainview > *:not(.selected)').css('display', 'none');
});
