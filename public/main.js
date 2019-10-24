$(function () {
  var socket = io();

  $('form').submit(function(e){
    e.preventDefault();
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
  });

  socket.on('chat message', function(msg){
    $('#messages').prepend($('<li>').text(msg));
  });

  socket.on('connection', () => {
    $('#messages').prepend($('<li>').text("A user has connected."));
  })

});