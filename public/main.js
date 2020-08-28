import Cookies from "../js.cookie.mjs"

$(function () {
  var socket = io();

  $('#login').click(() => {
    document.getElementById('login_form').style.display = "block";
  });

  $('#check').click(() => {
    alert(document.cookie);
  });  

  $('#chat_form').submit(function(e){
    e.preventDefault();
    var text = $('.input-box').val();
    $('.input-box').val('');
    if(text.length > 0){
      socket.emit('chat message', {user: Cookies.get('username'), message: text});
    }
  });

  socket.on('chat message', function(msg){
    $('#messages').prepend($('<li>').text(msg.user + ': ' + msg.message));
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