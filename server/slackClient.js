import { RtmClient, CLIENT_EVENTS, RTM_EVENTS } from '@slack/client';

const token = process.env.SLACK_TOKEN;
let rtms = null;
let nlp = null;
const appData = {};

// Handle incoming message functions.
const handleIncoming = (message) => {
  nlp.message(message.text, {})
    .then((data) => {
      rtms.sendMessage(JSON.stringify(data), 'C8LB8EH8T')
      // Returns a promise that resolves when the message is sent
        .then(() => console.log('Message sent to channel D8LEG4S76'))
        .catch(console.error);
    })
    .catch(console.error);
};

// Function used to show that we are properly connected.
const addAuthenticatedHandler = (rtm) => {
  // The client will emit an RTM.AUTHENTICATED event on when the connection data is avaiable
  rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, (connectData) => {
  // Cache the data necessary for this app in memory
    appData.selfId = connectData.self.id;
    appData.name = connectData.self.name;
    console.log(`Logged in as ${appData.name}, with ID of ${appData.selfId}`);
  });
  rtm.on(RTM_EVENTS.MESSAGE, handleIncoming);
};

// Initialize the RTM client with the recommended settings. Using the defaults.
const slackClient = (nlpClient, callback) => {
  rtms = new RtmClient(token, {
    dataStore: false,
    useRtmConnect: true,
    logLevel: 'verbose',
  });
  nlp = nlpClient;
  callback(rtms);
  addAuthenticatedHandler(rtms);
  return rtms;
};

export default slackClient;
