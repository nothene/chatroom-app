$(function () {
  var socket = io();
  var first = false;

  $('form').submit(function(e){
    e.preventDefault();
    var text = $('.input-box').val();    
    $('.input-box').val('');
    socket.emit('chat message', {message: text});
  });

  socket.on('chat message', function(msg){
    $('#messages').prepend($('<li>').text(msg.message));
  });

  socket.on('connection', () => {
    $('#messages').prepend($('<li>').text(`User has connected.`));
  })

  socket.on('disconnect', () => {
    $('#messages').prepend($('<li>').text(`User has disconnected.`));
  })

  socket.on('init', (texts) => {
    if(!first){
      texts.forEach(e => {
        $('#messages').prepend($('<li>').text(e));  
      });
    }
  });
});