$(function () {
  var socket = io();

  $('form').submit(function(e){
    e.preventDefault();
    socket.emit('chat message', $('.input-box').val());
    $('.input-box').val('');
  });

  socket.on('chat message', function(msg){
    $('#messages').prepend($('<li>').text(msg));
  });

  socket.on('connection', () => {
    $('#messages').prepend($('<li>').text(`User has connected.`));
  })

  socket.on('connection', () => {
    $('#messages').prepend($('<li>').text(`User has disconnected.`));
  })

});