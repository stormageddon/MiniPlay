// Interfaces with the spotify tab

//TODO: fix
function update_slider(position, slider) {  //position is in %
  var slider;
  if (slider == 'slider') {
    slider = document.getElementById('app-player').contentWindow.document.getElementById('bar-click');
  }
  else if (slider == 'vslider') {
    var button = document.getElementById('app-player').contentWindow.document.getElementById('volume-show');
    var evt = document.createEvent('MouseEvents');
    evt.initMouseEvent('mouseover', true, false);
    button.dispatchEvent(evt);
    slider = document.getElementById('app-player').contentWindow.document.getElementById('volume-click');
  }
  var newWidth = Math.round(position * slider.offsetWidth);
  var rect = slider.getBoundingClientRect();

  slider.dispatchEvent(new MouseEvent('mousedown', {
    clientX: newWidth + rect.left + slider.clientLeft - slider.scrollLeft,
    clientY: rect.top + slider.clientTop - slider.scrollTop,
    bubbles: true
  }));

  slider.dispatchEvent(new MouseEvent('mouseup', {
    clientX: newWidth + rect.left + slider.clientLeft - slider.scrollLeft,
    clientY: rect.top + slider.clientTop - slider.scrollTop,
    bubbles: true
  }));
}

function send_command(message) {
  var iframe = document.querySelector('#app-player').contentDocument;
  var track = document.querySelector('div.track-info-name');

  chrome.notifications.create('42', {
    type: 'basic',
    title: 'test track',
    message: 'name; ' + track,
    contextMessage: 'test context',
    iconUrl: 'https://chambermaster.blob.core.windows.net/userfiles/UserFiles/chambers/2219/Image/christmas-tree-clip-art-xmas_christmas_tree_5-3333px.png'
  }, function(id) {
    console.log('id', id);
  });

  var button = null;
  switch (message.type) {
    case 'play':
      button = iframe.querySelector('#play-pause'); break;
    case 'rew':
      button = iframe.querySelector('#previous'); break;
    case 'ff':
      button = iframe.querySelector('#next'); break;
    case 'shuffle':
      button = iframe.querySelector('#shuffle'); break;
    case 'repeat':
      button = iframe.querySelector('#repeat'); break;
    case 'slider':
      update_slider(message.position, 'slider'); break;
    case 'vslider':
      update_slider(message.position, 'vslider'); break;
  }
  if (button !== null) {
    button.click();
  }
  window.setTimeout( function() {
    update();
  }, 30);
}

function init() {
  route('send_command', send_command);
}

document.addEventListener('DOMContentLoaded', init);
if (document.readyState != 'loading') {
  init();
}
