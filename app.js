const Discordie = require('discordie');
const axios = require('axios');
const request = require('request');

const Events = Discordie.Events;
const client = new Discordie();

client.connect({
  token: process.env.token
});

client.Dispatcher.on(Events.GATEWAY_READY, e => {
  console.log('Connected as: ' + client.User.username);
});

client.Dispatcher.on(Events.MESSAGE_CREATE, e => {
  if (e.message.content == 'ping') e.message.channel.sendMessage('pong');

  if (e.message.content == '_neko') {
    request(
      'http://thecatapi.com/api/images/get?format=xml',
      (error, response, body) => {
        const url = body.substring(body.indexOf('http'), body.indexOf('</url>'));
        e.message.channel.sendMessage(url);
      }
    );
  }
});
