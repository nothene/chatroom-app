import Cookies from "../js.cookie.mjs"

$(function () {
  var socket = io();

  // $(window).on("load", () => {
  //     console.log(Cookies.get('username'));
  //     if(Cookies.get('username') == ""){
  //       document.getElementById('login').innerHTML = 'Logged in as ' + Cookies.get('username');
  //     } else {
  //       document.getElementById('login').innerHTML = 'Login';
  //     }
  //   }
  // );

  $('#nav').click(() => {
    if(document.getElementById('side').style.width == '0%'){
      document.getElementById('side').style.width = '10%';
    } else {
      document.getElementById('side').style.width = '0%';
    }
  });

  $('#login').click(() => {
    if(Cookies.get('username') == ""){
      document.getElementById('login_form').style.display = "block";
    } else {
      Cookies.set('username', '');
    }    
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
    $('#messages').append($('<li>').text(msg.user + ': ' + msg.message));
  });

  socket.on('connect', () => {
    //alert("welcome");
  });

  socket.on('new user', () => {
    $('#messages').append($('<li>').text('A new user has connected'));
  });

  socket.on('disconnect', () => {
    $('#messages').append($('<li>').text(`User has disconnected.`));
  });
});