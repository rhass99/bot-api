
if (process.env.NODE_ENV === 'development') require('dotenv').config();
import apiai from 'apiai';

const apiaiToken = process.env.DF_API_TOKEN;
const apiaiClient = apiai(apiaiToken);

const sendAiMessage = (rtmClient, message) => {
  const request = apiaiClient.textRequest(message.text, {
    sessionId: message.user,
  });
  request.on('response', (data) => {
    const responseMessage = JSON.stringify(data.result.fulfillment.speech);
    const sess = JSON.stringify(data.sessionId);
    rtmClient.sendMessage(responseMessage, 'C8LB8EH8T')
    // Returns a promise that resolves when the message is sent
      .then(() => console.log(`this message was sent ${responseMessage} with ID of ${sess}`))
      .catch(console.error);
  });
  request.on('error', error => console.log(error));
  request.end();
};


export default {
  apiaiClient,
  sendAiMessage,
  name: 'api',
};
