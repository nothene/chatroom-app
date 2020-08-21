$(function () {
  var socket = io();

  $('form').submit(function(e){
    e.preventDefault();
    var text = $('.input-box').val();
    $('.input-box').val('');
    socket.emit('chat message', {message: text});
  });

  socket.on('chat message', function(msg){
    $('#messages').prepend($('<li>').text(msg.message));
  });

  socket.on('connect', () => {
    //alert("welcome");
  });

  socket.on('new user', () => {
    $('#messages').prepend($('<li>').text('A new user has connected'));
  });

  socket.on('disconnect', () => {
    $('#messages').prepend($('<li>').text(`User has disconnected.`));
  });
});