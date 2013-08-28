$(function() {


  var game = $('#game');
  var board = $('#board')
  var status_indicators = $('#teams li');

  var tiles = [];


  var player1 = [];
  var player2 = [];

  var players = [
    {
      name:      'Ernie',
      marker:    '&times;',
      img_url:  'img/ernie.jpg',
      indicator: $(status_indicators[0])
    },
    {
      name:      'Bert',
      marker:    '&oslash;',
      img_url:  'img/bert.jpg',
      indicator: $(status_indicators[1])
    }
  ];

  var current_player;
  var turns  = 1;


  var win_combos = [
    [0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]
  ];

  var initialize = function() {


    _(9).times(function(i){
      var tile = board.append("<div class='tile' id=tile" + i + " </div>");
    });

    current_player = players[0];
    current_player.indicator.addClass('current');

    handle_click();

    game.fadeIn(1000);
  };

  var handle_click = function() {
    $('.tile').click(function(){
      activate_tile($(this));
      toggle_player();
      var value = $(this)[0].id
      id = parseInt(value.replace('tile', ''))

      if(current_player == players[1]){
        player1.push(id);
      }else if(current_player == players[0]){
        player2.push(id);
      }

      is_win();

    })

  }

  var is_active = function(tile) {


  };

  var activate_tile = function(tile) {

    if(tile.hasClass('active')){
      return;
    }else{
      $(tile).append(current_player.marker);
      tile.addClass('active');
      tiles.push(tile);
      turns++;
    }


  };

  var toggle_player = function() {
    if(turns % 2 == 0){
      current_player.indicator.removeClass("current");
      current_player = players[1];
      current_player.indicator.addClass("current");
    }else{
      current_player.indicator.removeClass("current");
      current_player = players[0];
      current_player.indicator.addClass("current");
    }
  };

  var is_win = function() {
    for(var counter = 0; counter < win_combos.length; counter++){
        var win = _.intersection(win_combos[counter], player1)

        if(win.length == 3){
          handle_win();
        }
      }

      for(var counter = 0; counter < win_combos.length; counter++){
        var win = _.intersection(win_combos[counter], player2)

        if(win.length == 3){
          handle_win();
        }
      }
  };

  var is_tie = function() {
    if (turns ===9){
      return true;
    }else{
      return false;
    }

  };

  var handle_win = function() {
    $('#results h1').text(current_player.name);
    $('span.image').append("<img src ='" + current_player.img_url + "'>");
    $('#results').show()

    $('button').click(function(){
      new_game();
    })

  };

  var handle_tie = function() {
    //### update the UI to reflect that a tie game has occurred.
    //### - show results panel
    //### - display tie and rubber ducky image
    //### - show new_game button
    update_results({
      img_src: 'img/rubberduckie.jpg',
      img_alt: 'Rubber Duckie',
      message: 'Tie Game!'
    });
  }

  var hide_indicators = function() {
    //### optional: call this to hide the "status" container after detecting a win or a tie
  };

  var show_combo = function(combo) {
    //### optional: call this to highlight the combination of tiles that resulted in a win
    //### e.g. colors winning XXX or OOO red.
  }

  var new_game = function() {
    // see http://stackoverflow.com/questions/2405117/difference-between-window-location-href-window-location-h...
    // nothing to add here

      window.location.href = window.location.href
  };

  // call initialize() to get the party started
  initialize();

});