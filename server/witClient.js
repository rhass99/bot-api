if (process.env.NODE_ENV === 'development') require('dotenv').config();
import { Wit } from 'node-wit';

const witToken = process.env.WIT_SERVER_ACCESS_TOKEN;

const witClient = new Wit({
  accessToken: witToken,
});

const sendMessage = (rtmClient, message) => {
  witClient.message(message.text, {})
    .then((data) => {
      rtmClient.sendMessage(JSON.stringify(data), 'C8LB8EH8T')
      // Returns a promise that resolves when the message is sent
        .then(() => console.log(`this message was sent ${JSON.stringify(message)}`))
        .catch(console.error);
    })
    .catch(console.error);
};

export default {
  witClient,
  sendMessage,
  name: 'wit',
};
